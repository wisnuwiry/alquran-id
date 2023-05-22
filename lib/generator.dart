import 'dart:io';

import 'package:alquran_book/config.dart';
import 'package:alquran_book/data_repository.dart';
import 'package:alquran_book/models/chapter_surah.dart';
import 'package:dio/dio.dart';

class AlquranBookGenerator {
  Future generate() async {
    final chapters = await _repo.getCapters(Config.fallbackLang);
    _writeTableOfContents(chapters);

    for (final item in chapters.take(1)) {
      _writeSurah(item);
    }
  }

  Future _writeTableOfContents(List<Chapter> chapters) async {
    final tocFile = File('data/SUMMARY.md');
    final buffer = StringBuffer();
    buffer.write('# Summary');
    buffer.writeln();

    // Write Summary
    for (final item in chapters) {
      buffer.writeln('* [${item.name}](/surah/${item.id}/README.md)');
    }

    tocFile.writeAsString(buffer.toString());
  }

  Future _writeSurah(Chapter chapter) async {
    final buffer = StringBuffer();
    final dir = Directory('data/surah/${chapter.id}');
    dir.create(recursive: true);
    final file = File('${dir.path}/README.md');
    final result = await _repo.getByChapter(chapter: chapter);
    buffer.write(await _getHeading(chapter));

    for (final ayah in result) {
      buffer.writeln();
      buffer.writeln(
          '<div style="background: #f6f6f6; border-radius: 10px; margin-bottom: 10px; padding: 6px">');
      buffer.writeln(
        '<h4 style="direction: rtl; font-family: IndoPak;">'
        '${ayah.value}'
        ' ${_getVerseEndSymbol(ayah.verseNumber)} '
        '</h4>',
      );
      buffer.writeln('<p>${_formatTranslateValue(ayah.translateValue)}</p>');
      buffer.writeln('</div>');
    }

    await file.writeAsString(buffer.toString());
  }

  Future<String> _getHeading(Chapter chapter) async {
    final buffer = StringBuffer();
    buffer
        .writeln('<h2 style="text-align: center;">${chapter.nameArabic}</h2>');
    buffer.writeln();
    buffer.writeln('| Lokasi | Surah | Ayat |');
    buffer.writeln('|---|---|---|');
    buffer.writeln(
      '| ${_capitalize(chapter.revelationPlace)} '
      '|  ${chapter.translateName} '
      '|  ${chapter.versesCount} Ayat |',
    );
    buffer.writeln();
    buffer.writeln('---');

    if (chapter.bismillahPre) {
      buffer.writeln(
          '<h3 style="text-align: center; font-family: IndoPak;">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h3>');
    }

    return buffer.toString();
  }

  String _formatTranslateValue(String value) {
    final exp = RegExp(r"<[^>]*>", multiLine: true, caseSensitive: true);

    return value.replaceAll('1</sup>', '').replaceAll(exp, '');
  }

  String _capitalize(String value) {
    return value[0].toUpperCase() + value.substring(1);
  }

  String _getVerseEndSymbol(int verseNumber) {
    const Map arabicNumbers = {
      "0": "٠",
      "1": "۱",
      "2": "۲",
      "3": "۳",
      "4": "٤",
      "5": "٥",
      "6": "٦",
      "7": "۷",
      "8": "۸",
      "9": "۹"
    };

    String arabicNumeric = '';
    for (final e in verseNumber.toString().split('')) {
      arabicNumeric += arabicNumbers[e];
    }

    return '<span>&#xFD3F;$arabicNumeric&#xFD3E;</span>';
  }
}

final _repo = DataRepository(
  dio: Dio(
    BaseOptions(baseUrl: Config.apiURL),
  )..interceptors.add(LogInterceptor()),
);

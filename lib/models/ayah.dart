import 'package:alquran_book/models/models.dart';

class Ayah {
  final int id;
  final int verseNumber;
  final String verseKey;
  final String value;
  final String translateValue;
  final List<Word> words;

  const Ayah({
    required this.id,
    required this.verseNumber,
    required this.verseKey,
    required this.value,
    required this.translateValue,
    required this.words,
  });

  factory Ayah.fromJson(Map<String, dynamic> json) => Ayah(
        id: json['id'],
        verseNumber: json['verse_number'],
        verseKey: json['verse_key'],
        value: json['text_uthmani'],
        translateValue: json['translations'].first['text'],
        words: List<Word>.from(json['words'].map((e) => Word.fromJson(e)))
            .toList(),
      );
}

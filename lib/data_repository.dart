import 'package:dio/dio.dart';

import 'models/models.dart';

class DataRepository {
  final Dio dio;

  const DataRepository({required this.dio});

  Future<List<Chapter>> getCapters(String language) async {
    final result = await dio.get(
      'chapters',
      queryParameters: {'language': language},
    );

    return List<Chapter>.from(
        result.data['chapters'].map((e) => Chapter.fromJson(e)));
  }

  Future<List<Ayah>> getByChapter({required Chapter chapter}) async {
    final result = await dio.get(
      'verses/by_chapter/${chapter.id}',
      queryParameters: {
        'words': true,
        'per_page': chapter.versesCount,
        'fields': 'text_uthmani',
        'translations': 33,
      },
    );
    return List<Ayah>.from(result.data['verses'].map((e) => Ayah.fromJson(e)));
  }
}

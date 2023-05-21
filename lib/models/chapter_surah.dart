class Chapter {
  final int id;
  final String revelationPlace;
  final int versesCount;
  final String name;
  final String nameArabic;
  final String translateName;
  final bool bismillahPre;

  const Chapter({
    required this.id,
    required this.revelationPlace,
    required this.versesCount,
    required this.name,
    required this.nameArabic,
    required this.translateName,
    required this.bismillahPre,
  });

  factory Chapter.fromJson(Map<String, dynamic> json) => Chapter(
        id: json['id'],
        revelationPlace: json['revelation_place'],
        versesCount: json['verses_count'],
        name: json['name_complex'],
        nameArabic: json['name_arabic'],
        translateName: json['translated_name']['name'],
        bismillahPre: json['bismillah_pre'],
      );
}

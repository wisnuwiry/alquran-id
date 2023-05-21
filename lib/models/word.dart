class Word {
  final int id;
  final String charTypeName;
  final String text;
  final String translationValue;

  const Word({
    required this.id,
    required this.charTypeName,
    required this.text,
    required this.translationValue,
  });

  factory Word.fromJson(Map<String, dynamic> json) => Word(
        id: json['id'],
        charTypeName: json['char_type_name'],
        text: json['text'],
        translationValue: json['translation']['text'],
      );
}

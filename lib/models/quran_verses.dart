enum QuranVerses {
  indopak,
  uthmani,
  imlaei;

  String get path {
    switch (this) {
      case indopak:
        return 'indopak';
      case uthmani:
        return 'uthmani';
      case imlaei:
        return 'imlaei';
    }
  }
}

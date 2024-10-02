export interface Surah {
    id: number;
    revelation_place: string;
    verses_count: number;
    name_simple: string;
    name_complex: string;
    name_arabic: string;
    translate_name: string;
    bismillah_pre: boolean;
    slug: {
        slug: string;
    };
    translated_name: {
        language_name: string;
        name: string;
    };
    verses: Verse[]
}

export interface SurahListResponse {
    chapters: Surah[]
}

export interface Verse {
    id: number;
    verse_number: number;
    verse_key: string;
    translations: Translation[];
    text_uthmani: string;
}

export interface Translation {
    text: string
}
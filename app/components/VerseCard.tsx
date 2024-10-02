import type { Verse } from "@/types";
import { convertToArabicNumber } from "@/utils/utils";
import IcCopy from "./icons/IcCopy";
import Link from "next/link";

interface VerseCardProps {
    verse: Verse
    surahNumber: number
}

export default function VerseCard({ verse, surahNumber }: VerseCardProps) {
    return <>
        <div className="p-4 my-2 overflow-hidden border-b flex flex-row gap-4" id={`${surahNumber}-${verse.verse_number}`}>
            <div className="flex flex-col gap-2">
                <Link className="cursor-pointer font-medium opacity-40 hover:opacity-100" href={`#${surahNumber}-${verse.verse_number}`}>
                    {surahNumber}:{verse.verse_number}
                </Link>
                <IcCopy className="cursor-pointer opacity-40 hover:opacity-100 size-5" onClick={() => navigator.clipboard.writeText(verse.text_uthmani)} />
            </div>
            <div className="flex flex-col gap-6 flex-1">
                <p className="text-right text-5xl leading-[4.5rem] font-surah">{verse.text_uthmani} {`۝${convertToArabicNumber(verse.verse_number)}`}</p>
                <div dangerouslySetInnerHTML={{ __html: verse.translations[0].text }} />
            </div>
        </div>
    </>
}
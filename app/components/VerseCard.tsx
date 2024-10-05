import type { FootNote, Verse } from "@/types";
import { convertToArabicNumber } from "@/utils/utils";
import IcCopy from "./icons/IcCopy";
import Link from "next/link";
import { useState } from "react";
import IcClose from "./icons/IcClose";

interface VerseCardProps {
    verse: Verse
    surahNumber: number
}

export default function VerseCard({ verse, surahNumber }: VerseCardProps) {
    const [footNote, setFootNote] = useState<FootNote | undefined>();

    const renderTranslation = () => {
        // Regular expression to match the foot_note attribute
        const footnoteRegex = /<sup foot_note=(\d+)>(.*?)<\/sup>/g;
        const text = verse.translations[0].text;

        // Split the text based on the footnote regex
        const parts = text.split(footnoteRegex);
        const components = [];

        // Iterate over the split parts
        for (let i = 0; i < parts.length; i++) {
            // If the current part is a footnote reference (every second part after the first)
            if (i % 3 === 2) {
                const footnoteId = Number.parseInt(parts[i - 1]); // The ID is captured in the first capturing group
                const footnoteText = parts[i]; // The text for the sup tag

                // Push the footnote component
                components.push(
                    <sup
                        key={i}
                        onClick={() => {
                            const selectedFootNote = verse.foot_notes.filter((e) => e.foot_note.id === footnoteId)[0].foot_note

                            setFootNote(footNote?.id === selectedFootNote.id ? undefined : selectedFootNote);
                        }}
                        className="cursor-pointer text-blue-500"
                    >
                        {footnoteText.replaceAll('</sup>', '')}
                    </sup>
                );
            } else if (i % 3 === 0) {
                components.push(parts[i]);
            }
        }

        return <div>{components}</div>;
    }

    return <>
        <div className="p-4 my-2 overflow-hidden border-b flex flex-row gap-4 scroll-mt-20" id={`${surahNumber}-${verse.verse_number}`}>
            <div className="flex flex-col gap-2">
                <Link className="cursor-pointer font-medium opacity-40 hover:opacity-100" href={`#${surahNumber}-${verse.verse_number}`}>
                    {surahNumber}:{verse.verse_number}
                </Link>
                <IcCopy className="cursor-pointer opacity-40 hover:opacity-100 size-5" onClick={() => navigator.clipboard.writeText(verse.text_uthmani)} />
            </div>
            <div className="flex flex-col gap-6 flex-1">
                <p className="text-right text-5xl leading-[4.5rem] font-surah">{verse.text_uthmani} {`۝${convertToArabicNumber(verse.verse_number)}`}</p>
                {renderTranslation()}
                <div className={`bg-gray-50 rounded-lg px-4 py-6 flex flex-row gap-2 ${footNote !== undefined ? 'block' : 'hidden'}`}>
                    <IcClose className="cursor-pointer size-5 opacity-40 hover:opacity-100" onClick={() => setFootNote(undefined)} />
                    <p className="flex-1">{footNote?.text?.replace('*', '')}</p>
                </div>
            </div>
        </div>
    </>
}
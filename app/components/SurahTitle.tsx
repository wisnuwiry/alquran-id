import React from "react";
import { Surah } from "@/types";

interface SurahTitleProps {
    surah: Surah;
    className?: string;
}

const SurahTitle: React.FC<SurahTitleProps> = ({ surah, className }) => {
    return (
        <div className={`max-w-screen-lg m-auto w-full ${className ?? ''}`}>
            <div className="flex flex-col bg-gray-50 rounded-lg w-full p-4 items-center">
                <h2 className="font-surah text-5xl">{surah.name_arabic}</h2>
                <p className="text-xl font-medium">{surah.name_simple} <span className="text-neutral-500 font-normal">({surah.verses_count} ayat)</span></p>
            </div>
        </div>
    );
};

export default SurahTitle;

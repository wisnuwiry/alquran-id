import React from "react";
import Link from "next/link";
import { Surah } from "@/types";
import { convertToArabicNumber } from "@/utils/utils";

interface SurahCardProps {
  surah: Surah;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah }) => {
  return (
    <Link href={`/surah/${surah.slug.slug}`}>
      <div className="group p-4 border rounded-lg border-gray-200 bg-white hover:border-blue-500 hover:bg-blue-50 duration-100 ease-in-out">
        <div className="flex flex-row items-center gap-2">
          <p className="text-lg size-8 rounded-full bg-gray-50 flex items-center justify-center font-semibold font-surah group-hover:bg-blue-100 group-hover:text-blue-500">{convertToArabicNumber(surah.id)}</p>
          <h3 className="text-lg font-semibold flex-1 group-hover:text-blue-500">{surah.name_complex}</h3>
        </div>
        <p className="mt-2 text-gray-400 text-sm group-hover:text-blue-500">{surah.translated_name.name} - {surah.verses_count} Ayat</p>
      </div>
    </Link>
  );
};

export default SurahCard;

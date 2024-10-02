import React from "react";
import Link from "next/link";
import { Surah } from "@/types";

interface SurahCardProps {
  surah: Surah;
}

const SurahCard: React.FC<SurahCardProps> = ({ surah }) => {
  return (
    <Link href={`/surah/${surah.slug.slug}`}>
      <div className="p-4 border rounded-lg shadow-md hover:bg-gray-100">
        <h3 className="text-lg font-bold">{surah.name_complex}</h3>
        <p className="font-surah text-2xl">{surah.name_arabic}</p>
        <p className="mt-2 text-gray-400">{surah.translated_name.name}</p>
      </div>
    </Link>
  );
};

export default SurahCard;

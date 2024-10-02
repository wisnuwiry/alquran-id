import React from "react";
import { Surah } from "@/types";
import Link from "next/link";
import IcPrev from "./icons/IcPrev";
import IcNext from "./icons/IcNext";

interface NavbarControllProps {
    surah: Surah;
    prevSurah?: Surah
    nextSurah?: Surah
}

const NavbarControll: React.FC<NavbarControllProps> = ({ surah, prevSurah, nextSurah }) => {
    return (
        <div className="w-full p-4 bg-gray-50 top-0 sticky">
            <div className="max-w-screen-lg w-full m-auto flex flex-row justify-between">
                {prevSurah !== undefined ? <Link href={`/surah/${prevSurah?.slug.slug}`} className="flex-1 flex flex-row items-center"><IcPrev className="size-6"/> {prevSurah?.name_simple}</Link> : <div className="flex-1" />}
                <p className="flex-1 text-center">{surah.name_simple}</p>
                {nextSurah !== undefined ? <Link href={`/surah/${nextSurah?.slug.slug}`} className="flex-1 text-right flex flex-row items-center justify-end">{nextSurah?.name_simple} <IcNext className="size-6"/></Link> : <div className="flex-1" />}
            </div>
        </div>
    );
};

export default NavbarControll;

import React from "react";
import { Surah } from "@/types";
import Link from "next/link";
import IcPrev from "./icons/IcPrev";
import IcNext from "./icons/IcNext";

interface NavbarControlProps {
    surah: Surah;
    prevSurah?: Surah
    nextSurah?: Surah
}

const NavbarControl: React.FC<NavbarControlProps> = ({ surah, prevSurah, nextSurah }) => {
    return (
        <div className="w-full p-4 top-0 sticky z-50 backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-100/10 dark:border-gray-100[0.06] bg-white supports-backdrop-blur:bg-white/95 dark:bg-gray-100/75">
            <div className="max-w-screen-lg w-full m-auto flex flex-row justify-between items-center justify-center">
                {
                    prevSurah !== undefined ?
                        <div className="flex-1">
                            <Link href={`/surah/${prevSurah?.slug.slug}`} className="flex flex-row items-center text-blue-400 w-fit px-2 pr-4 py-1 rounded-lg hover:text-blue-500 hover:bg-blue-50">
                                <IcPrev className="size-6" /> {prevSurah?.name_simple}
                            </Link>
                        </div>
                        :
                        <div className="flex-1" />
                }
                <p className="flex-1 text-center font-medium">
                    {surah.name_simple}
                </p>
                {
                    nextSurah !== undefined ?
                        <div className="flex-1 flex justify-end">
                            <Link href={`/surah/${nextSurah?.slug.slug}`} className="flex flex-row items-center text-blue-400 w-fit px-2 pl-4 py-1 rounded-lg hover:text-blue-500 hover:bg-blue-50">
                                {nextSurah?.name_simple}
                                <IcNext className="size-6" />
                            </Link>
                        </div>
                        :
                        <div className="flex-1" />
                }
            </div>
        </div>
    );
};

export default NavbarControl;

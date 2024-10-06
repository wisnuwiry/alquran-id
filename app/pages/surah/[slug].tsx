import { GetStaticPaths, GetStaticProps, Metadata } from "next";
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from "../../components/Navbar";
import { Surah, SurahListResponse } from "@/types";
import Basmallah from "@/components/Basmallah";
import VerseCard from "@/components/VerseCard";
import NavbarControl from "@/components/NavbarControl";
import SurahTitle from "@/components/SurahTitle";
import Footer from "@/components/Footer";
import { openDataJson } from "@/utils/file-utils";

const inter = Inter({ subsets: ['latin'] })
const surahFont = localFont({ src: '../fonts/surah.woff2', variable: '--font-surah' })

interface SurahDetailProps {
  surah: Surah;
  prevSurah: Surah | null;
  nextSurah: Surah | null;
}

const SurahDetail: React.FC<SurahDetailProps> = ({ surah, prevSurah, nextSurah }) => {
  return (
    <div className={`${inter.className} ${surahFont.variable}`}>
      <Navbar />
      <NavbarControl surah={surah} nextSurah={nextSurah ?? undefined} prevSurah={prevSurah ?? undefined} />
      <div className="container mx-auto p-4">
        <div className="flex flex-col items-center">
          <SurahTitle surah={surah} className="my-6" />

          {surah.bismillah_pre && <Basmallah className="h-16 mb-12 mt-6" />}
        </div>

        <div className="max-w-screen-lg m-auto flex flex-col gap-4">
          {surah.verses.map((verse) => (
            <VerseCard verse={verse} surahNumber={surah.id} key={verse.id} />
          ))}
        </div>
        <div className="h-20" />
      </div>
      <Footer />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Read the chapters.json from the local data folder
  const response: SurahListResponse = await openDataJson('chapters.json');

  const paths = response.chapters.map((surah) => ({
    params: { slug: surah.slug.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Read the specific surah json file from the local data folder
  const surah = await openDataJson(`${params?.slug}.json`);

  // Read the chapters.json to get previous and next surah information
  const surahs:SurahListResponse = await openDataJson('chapters.json');

  const prevSurah = surahs.chapters.filter((e: Surah) => e.id === surah.id - 1)[0];
  const nextSurah = surahs.chapters.filter((e: Surah) => e.id === surah.id + 1)[0];

  return {
    props: { surah, prevSurah: prevSurah ?? null, nextSurah: nextSurah ?? null },
  };
};

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const surah: Surah = await openDataJson(`${params?.slug}.json`);

  return {
    title: `${surah.name_simple} | Al-Quran App`,
  };
}

export default SurahDetail;

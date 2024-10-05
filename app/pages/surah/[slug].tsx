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
import fs from 'fs';
import path from 'path';

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

// Dynamic import of 'fs' and 'path' in getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  // Read the chapters.json from the local data folder
  const filePath = path.join(process.cwd(), 'data', 'chapters.json');
  const jsonData = await fs.promises.readFile(filePath, 'utf-8');
  const response: SurahListResponse = JSON.parse(jsonData);

  const paths = response.chapters.map((surah) => ({
    params: { slug: surah.slug.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

// Dynamic import of 'fs' and 'path' in getStaticProps
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // Read the specific surah json file from the local data folder
  const surahFilePath = path.join(process.cwd(), 'data', `${params?.slug}.json`);
  const surahData = await fs.promises.readFile(surahFilePath, 'utf-8');
  const surah = JSON.parse(surahData);

  // Read the chapters.json to get previous and next surah information
  const chaptersFilePath = path.join(process.cwd(), 'data', 'chapters.json');
  const chaptersData = await fs.promises.readFile(chaptersFilePath, 'utf-8');
  const surahs = JSON.parse(chaptersData);

  const prevSurah = surahs.chapters.filter((e: Surah) => e.id === surah.id - 1)[0];
  const nextSurah = surahs.chapters.filter((e: Surah) => e.id === surah.id + 1)[0];

  return {
    props: { surah, prevSurah: prevSurah ?? null, nextSurah: nextSurah ?? null },
  };
};

// Dynamic import of 'fs' and 'path' in generateMetadata
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  // Read the surah json file from the local data folder for metadata
  const surahFilePath = path.join(process.cwd(), 'data', `${params?.slug}.json`);
  const surahData = await fs.promises.readFile(surahFilePath, 'utf-8');
  const surah: Surah = JSON.parse(surahData);

  return {
    title: `${surah.name_simple} | Al-Quran App`,
  };
}

export default SurahDetail;

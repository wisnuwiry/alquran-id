import { GetStaticProps, Metadata } from "next";
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from "../components/Navbar";
import { Surah, SurahListResponse } from "@/types";
import SurahCard from "@/components/SurahCard";
import Footer from "@/components/Footer";
import path from "path";
import fs from 'fs';

const inter = Inter({ subsets: ['latin'] })
const surahFont = localFont({ src: './fonts/surah.woff2', variable: '--font-surah' })

export const metadata: Metadata = {
  title: 'Al-Quran App',
  description: 'Aplikasi Al-Quran untuk membaca dan mengamalkan kitab suci Al-Quran',
}

interface HomeProps {
  surahs: Surah[];
}

const Home: React.FC<HomeProps> = ({ surahs }) => {
  return (
    <div className={`${inter.className} ${surahFont.variable}`}>
      <Navbar />
      <div className="max-w-screen-lg mx-auto p-4 my-12">
        <h2 className="text-2xl font-bold mb-4">Daftar Surat</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {surahs.map((surah) => (
            <SurahCard key={surah.id} surah={surah} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const chaptersFilePath = path.join(process.cwd(), 'data', 'chapters.json');
  const chaptersData = await fs.promises.readFile(chaptersFilePath, 'utf-8');
  const chapterRaw: SurahListResponse = JSON.parse(chaptersData);
  const surahs = chapterRaw.chapters

  return {
    props: { surahs },
  };
};

export default Home;

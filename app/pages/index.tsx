import { GetStaticProps } from "next";
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import Navbar from "../components/Navbar";
import { Surah, SurahListResponse } from "@/types";
import SurahCard from "@/components/SurahCard";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'] })
const surahFont = localFont({ src: './fonts/surah.woff2', variable: '--font-surah' })

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/data/chapters.json`
  );
  const response: SurahListResponse = await res.json();

  const surahs = response.chapters;

  return {
    props: { surahs },
  };
};

export default Home;

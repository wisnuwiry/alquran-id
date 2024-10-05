import Link from "next/link";
import Alert from "./Alert";

const Footer = () => {
  return (
    <footer className="bg-gray-50 p-4 border-t">
      <div className="max-w-screen-xl mx-auto">
        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-10 py-10 px-4 justify-between w-full">
          <Link href="/"><h3 className="font-semibold text-xl">Quran App</h3></Link>
          <Alert className="flex-1 max-w-2xl" title="Perhatian">
            <p className="text-sm text-neutral-600">Surah dan ayat yang kami tampilkan di laman ini berasal dari <a href="http://quran.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">Quran.com</a>. Jika terjadi kesalahan atau menemukan kesalahan penampilan bisa menghubungi <a href="mailto:wisnuwiry@gmail.com" className="text-blue-700">saya</a>.</p>
          </Alert>
        </div>

        {/* Copyright */}
        <hr className="my-4" />
        <p className="text-center text-neutral-500 text-sm">&copy; Quran App</p>
      </div>
    </footer>
  );
};

export default Footer;

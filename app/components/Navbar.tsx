import { CONFIG } from "@/utils/config";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image src="/logo.png" alt="Logo" width={40} height={40}/>
          <h1 className="text-xl font-semibold">{CONFIG.APP_NAME}</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

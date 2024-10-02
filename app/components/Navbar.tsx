import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-xl font-semibold">Quran App</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

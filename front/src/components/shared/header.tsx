import Link from "next/link";
import { RiSearchFill, RiUserFill } from "react-icons/ri";

const Header = () => {
  return (
    <header className="w-full h-[4rem]">
      <div className="flex items-center justify-between h-full w-full px-12">
        <h1>Blog title</h1>
        <nav className="h-full">
          <ul className="flex items-center h-full">
            <li className="px-4 h-full flex items-center hover:bg-red-500 cursor-pointer">
              <Link href="/">Home</Link>
            </li>
            <li className="px-4 h-full flex items-center hover:bg-red-500 cursor-pointer">
              <Link href="/about">Sobre</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center justify-center gap-4">
          <label htmlFor="search-input" className="cursor-pointer">
            <RiSearchFill className="w-4 h-4" />
          </label>
          <input
            id="search-input"
            className="border-0 border-b-2 border-b-black focus:outline-none p-1 bg-transparent"
          />
        </div>
        <div>
          <RiUserFill className="w-6 h-6" />
        </div>
      </div>
    </header>
  );
};

export default Header;

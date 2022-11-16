import Link from "next/link";
import { useEffect, useState } from "react";
import { HiSearch, HiBell } from "react-icons/hi";
import useAuth from "../hooks/useAuth";
import BasicMenu from "./Menu";

const Header = () => {
  const [scroll, setScroll] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${scroll && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          alt="logo"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <HiSearch className="hidden h-6 w-6 cursor-pointer sm:inline" />
        <p className="hidden lg:inline">Kids</p>
        <HiBell className="h-6 w-6" />
        {/* <Link href="/login"> */}
        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt="account"
          className="cursor-pointer rounded"
        />
        {/* </Link> */}
      </div>
    </header>
  );
};
export default Header;

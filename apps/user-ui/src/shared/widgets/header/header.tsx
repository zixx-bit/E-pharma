import Link from "next/link";
import React from "react";
import { Search } from "lucide-react";
const Header = () => {
  return (
    <div className=" shadow-md w-full">
      <div className="w-[80%] py-5 m-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <span className="text-2xl font-[500]">Afyanova Pharma</span>
          </Link>
        </div>
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full font-Poppins font-medium border-[2px] border-[#34ffcc] outline-none h-[55px] rounded-full px-4 py-2"
          ></input>
          <div className="w-[60px] cursor-pointer flex items-center justify-center h-[55px] rounded-full bg-[#34ffccaf] absolute top-0 right-0">
            <Search color="#fff" />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Header;

import Link from "next/link";
import React from "react";
import { Search } from "lucide-react";
import { ProfileIcon } from "apps/user-ui/src/assets/svgs/profile-icon";
import { HeartIcon } from "apps/user-ui/src/assets/svgs/heart-icon";
import { CartIcon } from "apps/user-ui/src/assets/svgs/cart-icon";
import HeaderBottom from "./header-bottom";
const Header = () => {
  return (
    <div className=" shadow-md w-full">
      <div className="w-[80%] py-5 m-auto flex items-center justify-between">
        <div>
          <Link href="/">
            <span className="text-2xl font-[500] text-[#29d4aa]">
              Afyanova Pharma
            </span>
          </Link>
        </div>
        <div className="w-[50%] relative">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full font-Poppins font-medium border-[2px] border-[#29d4aa] outline-none h-[55px] rounded-full px-4 py-2"
          ></input>
          <div className="w-[48px] cursor-pointer flex items-center justify-center h-[47px] rounded-full bg-[#29d4aa] absolute top-1 bottom-1 right-1 p">
            <Search color="#fff" />
          </div>
        </div>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <Link
              href={"/login"}
              className="border-2 w-[40px] h-[40px] flex items-center justify-center rounded-full border-[#010f0c0a]"
            >
              <ProfileIcon />
            </Link>

            <Link href={"/login"}>
              <span className="block font-medium">Hello</span>
              <span className=" font-semibold">Sign In</span>
            </Link>
          </div>
          <div className="flex items-center gap-5">
            <Link href={"/wishlist"} className="relative">
              <HeartIcon />
              <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-12px]">
                <span className="text-white font-medium text-sm">0</span>
              </div>
            </Link>
            <Link href={"/cart"} className="relative">
              <CartIcon />
              <div className="w-6 h-6 border-2 border-white bg-red-500 rounded-full flex items-center justify-center absolute top-[-10px] right-[-10px]">
                <span className="text-white font-medium text-sm">3</span>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="">
        <HeaderBottom/>
      </div>
    </div>
  );
};

export default Header;

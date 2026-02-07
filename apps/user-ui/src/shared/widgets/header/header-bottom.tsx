"use client";
import { CartIcon } from "apps/user-ui/src/assets/svgs/cart-icon";
import { ProfileIcon } from "apps/user-ui/src/assets/svgs/profile-icon";
import { navItems } from "apps/user-ui/src/configs/contansts";
import { AlignLeft, ChevronDown, HeartIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const HeaderBottom = () => {
  const [show, setShow] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // ?track scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div
      className={`w-full transition-all duration-300 ${isSticky ? "fixed top-0 left-0 z-[100] bg-white shadow-lg" : "relative"
        }`}
    >
      <div
        className={`w-[80%] relative m-auto flex items-center justify-between ${isSticky ? "pt-3" : "py-0"
          }`}
      >
        {/* All dropdowns */}
        <div className={`w-[260px] ${isSticky && 'mb-2'} cursor-pointer flex items-center justify-between px-5 h-[50px] bg-[#2489ff] `
        }
          onClick={() => setShow(!show)}>
          <div className="flex items-center gap-2">
            <AlignLeft color="white" />
            <span className="text-white font-medium">All Categories</span>
          </div>
          <ChevronDown color="white" />
        </div>
        <div>
          {/* Dropdown menu */}
          {show && (
            <div className={`absolute left-0 ${isSticky ? "top-[70px]" : "top-[50px]"} 
            w-[260px] h-[400px] bg-[#f5f5f5] shadow-md rounded-lg p-4`}
            
            
            >
            </div>

          )}

          {/* Navigation links */}
          <div className="flex items-center ">
            {navItems.map((i: NavItemsTypes, index: number) => (
              <Link className="px-4 py-2 rounded-md hover:bg-gray-100 transition-all duration-300"
               href={i.href} key={index}>
                <span className="text-gray-500">{i.title}</span>
              </Link>
            ))}
                      <div>

          </div>
            { isSticky && (
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
            )}
          </div>
        </div>
      </div>
      {/* HeaderBottom */}
    </div>
  );
};

export default HeaderBottom;

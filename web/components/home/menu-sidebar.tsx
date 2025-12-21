// File: components/home/menu-sidebar.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const MenuSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const isMobile = useIsMobile();

  return (
    <>
      <button
        onClick={toggleMenu}
        className="absolute top-6 right-6 z-40 flex items-center justify-items-center gap-2 2xl:gap-3 text-white md:px-4 py-2 rounded-md "
      >
        <span className="text-lg md:text-2xl font-semibold">Menu</span>
        <Menu className="w-6 h-6 lg:w-7 lg:h-7 2xl:h-8 2xl:w-8" />
      </button>

      <div
        className={`fixed top-0 right-0 overflow-hidden h-full bg-secondary text-text z-40 p-8 flex justify-center flex-col gap-8 transition-transform ease-in-out
          ${
            isMobile
              ? "w-full duration-500"
              : "w-[150px] lg:w-[225px] xl:w-[350px] 2xl:w-[500px] duration-300"
          }
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <img
          src="/assets/sidebar/cake.webp"
          alt="Blurry cake background"
          className="absolute inset-0 w-full h-full object-cover object-[25%] filter blur-sm opacity-30 z-[-1]"
        />
        <button onClick={toggleMenu} className="absolute top-6 right-6 z-50">
          <X className="w-8 h-8 2xl:w-10 2xl:h-10" />
        </button>
        <div className="self-center justify-center">
          <nav className="flex flex-col gap-6 text-5xl md:text-4xl 2xl:text-6xl font-bold">
            <hr className="border-secondary border-t-2" />
            <Link href="/" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/experience" onClick={toggleMenu}>
              Experience
            </Link>
            <Link href="/portfolio" onClick={toggleMenu}>
              Portfolio
            </Link>
            <Link href="/blog" onClick={toggleMenu}>
              Blog
            </Link>
            <Link href="/contact" onClick={toggleMenu}>
              Contact
            </Link>
            <hr className="border-secondary border-t-2" />
          </nav>
        </div>
      </div>
    </>
  );
};

export default MenuSidebar;

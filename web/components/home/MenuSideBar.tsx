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
        className="absolute top-6 right-6 z-40 flex items-center gap-2 text-white px-4 py-2 rounded-md "
      >
        <span className="text-lg font-semibold">Menu</span>
        <Menu className="w-6 h-6" />
      </button>

      <div
        className={`fixed top-0 right-0 h-full bg-secondary text-white z-40 p-8 flex flex-col gap-8 transition-transform ease-in-out
          ${isMobile ? "w-full duration-500" : "w-64 duration-300"}
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <button onClick={toggleMenu} className="self-end">
          <X className="w-8 h-8" />
        </button>

        <nav className="flex flex-col gap-6 text-2xl font-bold">
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link href="/about" onClick={toggleMenu}>
            About
          </Link>
          <Link href="/portfolio" onClick={toggleMenu}>
            Portfolio
          </Link>
          <Link href="/experience" onClick={toggleMenu}>
            Experience
          </Link>
          <Link href="/blog" onClick={toggleMenu}>
            Blog
          </Link>
          <Link href="/contact" onClick={toggleMenu}>
            Contact
          </Link>
        </nav>
      </div>
    </>
  );
};

export default MenuSidebar;

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const magicHour = "/assets/magicHour.png";

const NavBarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full bg-secondary text-text flex items-center justify-between px-4 py-3 z-40 shadow">
        {/* Logo */}
        <div className="flex items-center gap-2">
        <Image
                src={magicHour}
                alt={`Logo`}
                width={80}
                height={40}
                className="object-cover object-top"
                priority
              />
          <span className="text-lg font-bold">Robert Bonsall</span>
        </div>

        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center gap-2 text-text"
        >
          <span className="text-base font-semibold">Menu</span>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Slide-Out Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-full bg-secondary text-text transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-50 p-8 flex flex-col gap-8`}
      >
        {/* Close Button */}
        <button onClick={toggleMenu} className="self-end">
          <X className="w-8 h-8" />
        </button>

        {/* Links */}
        <nav className="flex flex-col gap-6 text-2xl font-bold mt-8">
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

export default NavBarMobile;

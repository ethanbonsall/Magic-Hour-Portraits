/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const magicHour = "/assets/MagicHour.png";

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
        className={`fixed top-0 right-0 h-full w-full justify-center bg-secondary text-text transform overflow-hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-500 ease-in-out z-50 p-8 flex flex-col gap-8`}
      >
        <img
          src="/assets/sidebar/cake.jpg"
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

export default NavBarMobile;

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react"; 

const MenuSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

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
        className={`fixed top-0 right-0 h-full w-64 bg-secondary text-white transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40 p-8 flex flex-col gap-8`}
      >

        <button onClick={toggleMenu} className="self-end">
          <X className="w-8 h-8" />
        </button>

        <nav className="flex flex-col gap-6 text-2xl font-bold">
          <a href="/" onClick={toggleMenu}>Home</a>
          <a href="/about" onClick={toggleMenu}>About</a>
          <a href="/portfolio" onClick={toggleMenu}>Portfolio</a>
          <a href="/experience" onClick={toggleMenu}>Experience</a>
          <a href="/blog" onClick={toggleMenu}>Blog</a>
          <a href="/contact" onClick={toggleMenu}>Contact</a>
        </nav>
      </div>
    </>
  );
};

export default MenuSidebar;

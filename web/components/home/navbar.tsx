import Image from "next/image"; 

import { SiInstagram, SiFacebook } from "react-icons/si";
import { Mail } from "lucide-react";
import magicHour from "@/assets/magicHour.png"; 

const NavBar = () => {
  return (
    <nav className="fixed top-0 z-40 w-full bg-secondary text-white shadow">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto w-full">
       
        <div className="flex items-center gap-4">
          <Image
            src={magicHour}
            alt="Magic Hour Logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-semibold tracking-wide">
            Robert Bonsall
          </span>
        </div>

        <div className="flex items-center gap-12">
          <div className="hidden md:flex gap-6 text-lg font-medium">
            <a href="/" className="hover:text-gray-300 transition">HOME</a>
            <a href="/about" className="hover:text-gray-300 transition">ABOUT</a>
            <a href="/portfolio" className="hover:text-gray-300 transition">PORTFOLIO</a>
            <a href="/experience" className="hover:text-gray-300 transition">EXPERIENCE</a>
            <a href="/blog" className="hover:text-gray-300 transition">BLOG</a>
            <a href="/contact" className="hover:text-gray-300 transition">CONTACT</a>
          </div>

          <div className="flex gap-4">
            <a
              href="https://www.instagram.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <SiInstagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.facebook.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <SiFacebook className="w-5 h-5" />
            </a>
            <a
              href="mailto:you@example.com"
              className="hover:text-gray-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

"use client";

import { SiInstagram, SiFacebook } from "react-icons/si";
import { Mail } from "lucide-react";
import Link from "next/link";

const SocialIcons = () => {
  return (
    <div className="absolute top-6 left-6 z-50 flex gap-4 text-white">
      <Link
        href="https://www.instagram.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300"
      >
        <SiInstagram className="w-6 h-6" />
      </Link>
      <Link
        href="https://www.facebook.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-300"
      >
        <SiFacebook className="w-6 h-6" />
      </Link>
      <Link href="mailto:you@example.com" className="hover:text-gray-300">
        <Mail className="w-6 h-6" />
      </Link>
    </div>
  );
};

export default SocialIcons;

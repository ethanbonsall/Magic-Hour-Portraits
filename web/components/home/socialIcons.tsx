"use client";

import { SiInstagram, SiFacebook } from "react-icons/si";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";

const SocialIcons = () => {
  const isMobile = useIsMobile();
  if (isMobile) {
    return null;
  }
  return (
    <div className="absolute top-6 left-6 z-50 flex gap-4 text-white">
      <Link
        href="https://www.instagram.com/magichourportrait"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-300"
      >
        <SiInstagram className="w-3 h-3 md:w-4 md:h-4 lg:h-5 lg:w-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
      </Link>
      <Link
        href="https://www.facebook.com/profile.php?id=61554124045860"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-primary-300"
      >
        <SiFacebook className="w-3 h-3 md:w-4 md:h-4 lg:h-5 lg:w-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
      </Link>
      <Link
        href="https://mail.google.com/mail/?view=cm&fs=1&to=robertbonsall@magichourportraits.com"
        className="hover:text-primary-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Mail className="w-3 h-3 md:w-4 md:h-4 lg:h-5 lg:w-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
      </Link>
    </div>
  );
};

export default SocialIcons;

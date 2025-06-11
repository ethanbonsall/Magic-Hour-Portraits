/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuSidebar from "./menu-sidebar";
import SocialIcons from "./socialIcons";
import { useIsMobile } from "@/hooks/useIsMobile";

const localPhotos = [
  "/assets/header/header1.jpg",
  "/assets/header/header2.jpg",
  "/assets/header/header3.jpg",
  "/assets/header/header4.jpg",
  "/assets/header/header5.jpg",
];

const mobilePhotos = [
  "/assets/header/mobile1.jpg",
  "/assets/header/mobile2.jpg",
  "/assets/header/mobile3.jpg",
  "/assets/header/mobile4.jpg",
];

const magicHourLogo = "/assets/MagicHour.png";

const Header = () => {
  const [index, setIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % localPhotos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex-col z-40 w-full h-screen top-0">
      <div className="relative flex-col z-50 bg-secondary w-full h-full text-home transition-opacity duration-1000 overflow-hidden">
        {/* Background Images */}
        {(isMobile ? mobilePhotos : localPhotos).map((src, i) => (
          <Image
            key={i}
            src={src}
            alt={`Header Image ${i}`}
            fill
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            priority={i === 0}
          />
        ))}

        {/* Centered Text Overlay */}

        <div className="absolute flex flex-row justify-end items-end px-1 py-1 md:px-4 md:py-2 inset-0 text-secondary text-center">
          <img
            src={magicHourLogo}
            alt={"Magic Hour Portraits"}
            className="w-[100px] h-auto md:w-[120px] md:h-auto lg:w-[140px] lg:h-auto xl:w-[160px] xl:h-auto 2xl:w-[200px] 2xl:h-auto"
          ></img>
        </div>

        {/* Top Right and Left Items */}
        <SocialIcons />
        <MenuSidebar />
      </div>
    </div>
  );
};

export default Header;

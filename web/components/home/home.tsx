"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import MenuSidebar from "./MenuSideBar";
import SocialIcons from "./socialIcons";
import { useIsMobile } from "@/hooks/useIsMobile";



const localPhotos = [
  "/assets/header/header1.jpg",
  "/assets/header/header2.jpg",
  "/assets/header/header3.jpg",
];

const mobilePhotos = [
  "/assets/header/mobile1.jpg",
  "/assets/header/mobile2.jpg",
  "/assets/header/mobile3.jpg",
];

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
      <div className="relative flex-col z-50 bg-secondary w-full h-full text-text transition-opacity duration-1000 overflow-hidden">
        {/* Background Images */}
        {(isMobile ? mobilePhotos :localPhotos).map((src, i) => (
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl">
            Robert Bonsall
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
            Pennsylvania Photographer
          </p>
        </div>

        {/* Top Right and Left Items */}
        <SocialIcons />
        <MenuSidebar />
      </div>
    </div>
  );
};

export default Header;

// File: components/experience/landing.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";

const Landing = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;

    const handleScroll = () => {
      if (!sectionRef.current || !bgRef.current) return;

      const sectionTop = sectionRef.current.offsetTop;
      const scrollTop = window.scrollY;
      const relativeY = scrollTop - sectionTop;

      animationFrameId = requestAnimationFrame(() => {
        bgRef.current!.style.transform = `translateY(${relativeY * 0.3}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative h-screen bg-background-500 flex items-center overflow-hidden justify-center text-start"
    >
      {/* Smooth parallax background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-background-500 bg-center"
        style={{
          backgroundImage: "url('/assets/wedding/signature-event2.webp')",
          filter: "blur(6px)",
          opacity: 0.5,
          willChange: "transform",
        }}
      ></div>

      {/* Foreground content */}
      <div className="flex flex-row z-30">
        <div className="flex flex-col text-white text-center md:text-start justify-center md:justify-end mb-0 md:mb-[6lvh] lg:mb-[8lvh] xl:mb-[10lvh] 2xl:mb-[20lvh] gap-8 lg:gap-12 xl:gap-16 mr-0 md:mr-[10dvw]">
          <div>
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-thin">
              STORY
            </h1>
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-thin">
              TELLING
            </h1>
            <p className="text-4xl lg:text-5xl xl:text-6xl">
              for the modern couple
            </p>
          </div>
          <hr className="mx-2 md:mx-0" />
          <div>
            <p className="text-2xl xl:text-3xl">
              Wedding Photographer serving Pennsylvania, New Jersey,
            </p>
            <p className="text-2xl xl:text-3xl">
              New York, Maryland, Delaware, and Destinations
            </p>
          </div>
        </div>

        <img
          src="/assets/home/right.jpg"
          alt="Wedding"
          className="h-[80lvh] hidden md:inline-block w-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Landing;

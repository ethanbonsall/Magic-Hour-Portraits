// File: components/home/consultation.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const ConsultationSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        // Amount of section visible from top of screen
        const visibleY =
          Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
        const totalHeight = rect.height;
        const percentVisible = visibleY / totalHeight;
        setOffsetY(-percentVisible * 100); // Tweak this factor for faster/slower movement
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // call once to initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden w-full py-24 px-6 text-black bg-background-400"
    >
      {/* Simulated Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/home/consultation.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${offsetY}px)`,
          transition: "transform 0.1s linear",
          filter: "blur(6px)",
          opacity: 0.5,
          height: "150%", // Make the background larger than the div
          width: "120%", // Make the background larger than the div
          left: "-10%", // Adjust positioning to center the larger background
        }}
      ></div>

      {/* Foreground content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white ">
          Cheers to your forever
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-8 text-white font-semibold">
          I can&apos;t wait to meet you and your forever person. Fill out my
          inquiry form to tell me more about your day, and we&apos;ll set up a
          call to get to know each other and decide if we are a good fit!
        </p>
        <Link
          href="/contact"
          className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-md text-sm md:text-base hover:bg-primary-400 transition"
        >
          SCHEDULE A CONSULTATION
        </Link>
      </div>
    </section>
  );
};

export default ConsultationSection;

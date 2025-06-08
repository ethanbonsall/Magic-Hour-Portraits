/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-html-link-for-pages */
"use client";

import { useEffect, useRef, useState } from "react";
import { MoveLeft, MoveRight } from "lucide-react";

const carouselImages = [
  "/assets/carousel/img1.jpg",
  "/assets/carousel/img2.jpg",
  "/assets/carousel/img3.jpg",
  "/assets/carousel/img4.jpg",
];

const LegacySection = () => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex(
      (prev) => (prev - 1 + carouselImages.length) % carouselImages.length
    );
  };

  const next = () => {
    setIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const getRelativeIndex = (offset: number) => {
    return (index + offset + carouselImages.length) % carouselImages.length;
  };
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
    <section
      ref={sectionRef}
      className="w-full bg-background text-black overflow-hidden"
    >
      {/* Top Parallax Header */}
      <div className="hidden md:flex relative h-[80vh] items-center justify-center text-center mb-20 px-6">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/assets/wedding/signature-event2.jpg')",
            filter: "blur(4px)",
            opacity: 0.5,
          }}
        ></div>
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold mb-4">
            Images that tell your story
            <br />
            while reflecting its joy and charm
          </h2>
        </div>
      </div>
      <div className="relative h-screen flex items-center justify-center text-center mb-20 px-6">
        {/* Parallax Background */}
        <div
          ref={bgRef}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/assets/wedding/signature-event2.jpg')",
            filter: "blur(4px)",
            opacity: 0.5,
            willChange: "transform",
          }}
        ></div>

        {/* Foreground Text */}
        <div className="relative z-10 max-w-4xl">
          <h2 className="text-4xl lg:text-5xl 2xl:text-6xl font-semibold mb-4">
            Images that tell your story
            <br />
            while reflecting its joy and charm
          </h2>
        </div>
      </div>

      {/* Overlapping Carousel (absolute center) */}
      <div className="relative z-20 -mt-[250px] mb-[-250px]">
        <div className="relative flex justify-center items-center">
          {/* Arrow Left */}
          <button
            onClick={prev}
            className=" z-30 p-2 rounded-full  hover:scale-105 transition"
          >
            <MoveLeft className="w-12 h-12 text-black" />
          </button>

          <div className="flex gap-4 items-start justify-center w-full max-w-6xl px-4">
            {/* Previous Image */}
            <img
              src={carouselImages[getRelativeIndex(-1)]}
              alt="Previous"
              className="w-1/4 max-h-[500px] object-cover rounded-lg opacity-100 blur-sm scale-90 hidden md:block transition-all duration-500"
            />
            {/* Current Image */}
            <img
              src={carouselImages[getRelativeIndex(0)]}
              alt="Current"
              className=" w-full pt-20 md:pt-0 md:w-1/3 md:max-h-[600px] object-cover rounded-lg shadow-none md:shadow-lg z-20 transition-all duration-500"
            />
            {/* Next Image */}
            <img
              src={carouselImages[getRelativeIndex(1)]}
              alt="Next"
              className="w-1/4 max-h-[500px] object-cover rounded-lg opacity-100 blur-sm scale-90 hidden md:block transition-all duration-500"
            />
          </div>

          {/* Arrow Right */}
          <button
            onClick={next}
            className="z-30 p-2 rounded-full hover:scale-105 transition"
          >
            <MoveRight className="w-12 h-12 text-black" />
          </button>
        </div>
      </div>

      {/* Bottom Content */}
      <div className="pt-[300px] pb-20 px-6 text-center max-w-3xl mx-auto">
        <p className="text-lg md:text-xl 2xl:text-2xl leading-relaxed mb-8">
          There&apos;s nothing quite like the butterflies of your wedding day.
          And while you&apos;re sharing a nervous giggle or adoring gaze with
          your soon-to-be-spouse, I&apos;ll be imagining how this exact moment
          might look someday to your children and grandchildren. Long after the
          butterflies are gone, a legacy of love and joy remains in its place.
        </p>
        <a
          href="/portfolio"
          className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-md text-sm md:text-base font-medium transition hover:bg-primary/90"
        >
          View Galleries →
        </a>
      </div>
    </section>
  );
};

export default LegacySection;

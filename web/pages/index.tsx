// File: pages/index.tsx
"use client";
import { useEffect, useState } from "react";

import Home from "../components/home/home-carousel";
import NavBar from "../components/home/navbar";
import Experience from "@/components/home/experience-section";
import BottomBar from "@/components/home/bottom-description-bar";
import Head from "next/head";
import AboutSection from "@/components/home/about-section";
import ConsultationSection from "@/components/home/consultation";
import LegacySection from "@/components/home/portrait-section";
// import Rating from "@/components/rating";

const Portfolio = () => {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("#hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNav(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-screen overflow-x-hidden bg-background flex flex-col items-center font-roboto min-h-screen">
      <Head>
        <title>Magic Hour Portraits</title>
        <meta name="description" content="Magic Hour Portraits Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section id="hero" className="w-full">
        <Home />
      </section>

      {showNav && <NavBar />}
      <Experience />
      <LegacySection />
      <AboutSection />
      {/* <Rating /> */}
      <ConsultationSection />
      <BottomBar />
    </div>
  );
};

export default Portfolio;

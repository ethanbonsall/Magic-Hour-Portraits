"use client";

import Image from "next/image";
const magicHour = "/assets/magicHour.png";

const Footer = () => {
  return (
    <footer className="w-full bg-secondary justify-between text-text py-6 px-4 flex flex-col md:flex-row items-center gap-4 mt-16">
      {/* Logo */}
      <div className="flex flex-row items-center gap-3">
        <Image
          src={magicHour}
          alt={`Logo`}
          width={80}
          height={40}
          className="object-cover object-top"
          priority
        />
        <span className="text-lg font-semibold">Magic Hour Portraits</span>
      </div>

      {/* Description */}
      <div className="flex-col justify-items-center justify-center md:justify-items-end">
        <p className="text-center">Robert Bonsall</p>
        <p className="text-center text-sm md:text-base flex-wrap">
          Pennsylvania Photographer serving couples in PA, NY, NJ, MD, DE, and
          destinations.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

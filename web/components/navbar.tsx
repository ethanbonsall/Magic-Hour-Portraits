import Image from "next/image";

import { SiInstagram, SiFacebook } from "react-icons/si";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import NavBarMobile from "@/components/navbar-mobile";
const magicHour = "/assets/magicHour.png";

const NavBar = () => {
  const isMobile = useIsMobile();

  return (
    <nav className="sticky top-0 z-40 w-full bg-secondary text-text-700 shadow">
      {isMobile ? (
        <NavBarMobile />
      ) : (
        <div className="flex items-center justify-between py-4 px-8 w-full">
          <div className="flex items-center gap-4">
            <Image
              src={magicHour}
              alt={`Logo`}
              width={80}
              height={40}
              className="object-cover object-top"
              priority
            />
            <span className="text-xl font-semibold tracking-wide">
              Robert Bonsall
            </span>
          </div>

          <div className="flex items-center gap-12">
            <div className="hidden md:flex gap-6 text-lg font-medium">
              <Link href="/" className="hover:text-text-900 transition">
                HOME
              </Link>
              <Link href="/about" className="hover:text-text-900 transition">
                ABOUT
              </Link>
              <Link
                href="/portfolio"
                className="hover:text-text-900 transition"
              >
                PORTFOLIO
              </Link>
              <Link
                href="/experience"
                className="hover:text-text-900 transition"
              >
                EXPERIENCE
              </Link>
              <Link href="/blog" className="hover:text-text-900 transition">
                BLOG
              </Link>
              <Link href="/contact" className="hover:text-text-900 transition">
                CONTACT
              </Link>
            </div>

            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/magichourportrait"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-900"
              >
                <SiInstagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/profile.php?id=61554124045860"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-900"
              >
                <SiFacebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://mail.google.com/mail/?view=cm&fs=1&to=robertbonsall@magichourportraits.com"
                className="hover:text-text-900"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

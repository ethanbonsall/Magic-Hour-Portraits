/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import linkedinLogo from "@/assets/linkedin-logo.jpeg";
import githubLogo from "@/assets/github-logo.png";
import ThemeToggle from "@/components/toggle";
import Logo from "@/components/nameLogo";
import clsx from "clsx";
import { GraduationCap, FolderKanban, Briefcase } from "lucide-react";

const sections = ["education", "projects", "experience"];

const NavBar = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const offset = el.offsetTop - 300;
          if (window.scrollY >= offset) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="flex-col sticky top-0 z-50 shadow w-full">
      <div className="flex-row justify-between items-between text-text">
        <div className="flex bg-secondary w-full max-w-full overflow-hidden justify-between items-center px-[5%]">
          <div className="flex  items-center gap-4 sm:gap-x-12 md:gap-x-16">
            <Logo />
            {sections.map((section) => (
              <a key={section} href={`#${section}`}>
                <div className="flex items-center justify-center">
                  <span className="md:hidden">
                    {section === "education" && (
                      <GraduationCap className="w-6 h-6" />
                    )}
                    {section === "projects" && (
                      <FolderKanban className="w-6 h-6" />
                    )}
                    {section === "experience" && (
                      <Briefcase className="w-6 h-6" />
                    )}
                  </span>

                  <span
                    className={clsx(
                      "hidden md:inline md:text-4xl nav-link relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:bg-primary after:transition-transform after:duration-300",
                      activeSection === section
                        ? "after:scale-x-100"
                        : "after:scale-x-0 hover:after:scale-x-100"
                    )}
                  >
                    <div className="hidden md:inline">{section}</div>
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1 md:gap-4">
            <ThemeToggle />
            <a
              href="https://www.linkedin.com/in/ethanbonsall/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedinLogo.src}
                alt="LinkedIn"
                className="image-hover w-16 md:w-24 h-auto"
              />
            </a>
            <a
              href="https://github.com/ethanbonsall"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubLogo.src}
                alt="GitHub"
                className="image-hover w-8 md:w-14 h-auto rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

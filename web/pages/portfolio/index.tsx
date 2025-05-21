"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import NavBar from "@/components/navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchWedding, WeddingEntry } from "@/lib/fetchWeddings";
import { EngagementEntry, fetchEngagement } from "@/lib/fetchEngagements";
import { fetchFamilies, FamilyEntry } from "@/lib/fetchFamilies";
import { MoveRight } from "lucide-react";

const signature1 = "/assets/wedding/signature-event.jpg";
const signature2 = "/assets/wedding/signature-event2.jpg";
const inquire = "/assets/inquire.jpg";

const PortfolioPage = () => {
  const [weddings, setWeddings] = useState<WeddingEntry[]>([]);
  const [engagements, setEngagements] = useState<EngagementEntry[]>([]);
  const [families, setFamilies] = useState<FamilyEntry[]>([]);

  useEffect(() => {
    fetchWedding().then(setWeddings);
    fetchEngagement().then(setEngagements);
    fetchFamilies().then(setFamilies);
  }, []);

  return (
    <div>
      <Head>
        <title>Portfolio</title>
      </Head>
      <NavBar />
      <div className="">
        <div className="h-screen bg-dark flex flex-row justify-items-center justify-center align-center">
          <img
            src={signature1}
            className=" w-full md:w-[50vw] object-cover filter blur-sm opacity-30"
          />
          <img
            src={signature2}
            className=" hidden md:block md:w-[50vw] object-cover filter blur-sm opacity-30"
          />
          <div className="absolute flex flex-col gap-6 top-1/2 mx-4 w-3/4 md:w-[40rem]">
            <h1 className="text-white text-6xl md:text-8xl 2xl:text-9xl z-30 text-center self-center break-words whitespace-normal leading-tight font-thin ">
              SIGNATURE GALLERIES
            </h1>
            <hr className="border-1 rounded-md"></hr>
            <h2 className="text-white z-30 text-center italic text-4xl 2xl:text-5xl font-thin">
              A selection of couples, families and elegant events
            </h2>
          </div>
        </div>
        <div className="flex flex-col bg-background md:items-center md:justify-center py-16 px-4 md:p-16">
          <div className="flex flex-row md:w-3/4 gap-4 md:px-4">
            <h2 className="text-text 2xl:text-6xl md:whitespace-nowrap text-start md:text-center">
              Featured Weddings
            </h2>
            <hr className="hidden md:block flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-16 px-4 md:w-3/4 justify-items-center">
            {weddings.map((wedding, idx) => (
              <div key={idx} className="text-start space-y-2">
                {wedding.previewUrl ? (
                  <a
                    href={`/portfolio/weddings/${encodeURIComponent(
                      wedding.Title
                    )}`}
                  >
                    <img
                      src={wedding.previewUrl}
                      alt={wedding.Title}
                      className="object-cover rounded-md"
                    />
                  </a>
                ) : (
                  <div className="bg-background rounded-md flex items-center justify-center">
                    <span>No image</span>
                  </div>
                )}
                <h3 className="text-xl text-text pt-4 font-light">
                  {wedding.Location}
                </h3>
                <h2 className="font-light text-text">{wedding.Title}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-background md:items-center md:justify-center py-16 px-4 md:p-16">
          <div className="flex flex-row md:w-3/4 gap-4 md:px-4">
            <h2 className="text-text 2xl:text-6xl md:whitespace-nowrap text-start md:text-center">
              Featured Engagements
            </h2>
            <hr className="hidden md:block flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-16 px-4 md:w-3/4 justify-items-center">
            {engagements.map((item, idx) => (
              <div key={idx} className="text-start space-y-2">
                {item.previewUrl ? (
                  <a
                    href={`/portfolio/engagements/${encodeURIComponent(
                      item.Title
                    )}`}
                  >
                    <img
                      src={item.previewUrl}
                      alt={item.Title}
                      className="object-cover rounded-md"
                    />
                  </a>
                ) : (
                  <div className="bg-background rounded-md flex items-center justify-center">
                    <span>No image</span>
                  </div>
                )}
                <h3 className="text-xl text-text pt-4 font-light">
                  {item.Location}
                </h3>
                <h2 className="font-light text-text">{item.Title}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-background md:items-center md:justify-center py-16 px-4 md:p-16">
          <div className="flex flex-row md:w-3/4 gap-4 md:px-4">
            <h2 className="text-text 2xl:text-6xl md:whitespace-nowrap text-start md:text-center">
              Featured Families
            </h2>
            <hr className="hidden md:block flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-16 px-4 md:w-3/4 justify-items-center">
            {families.map((item, idx) => (
              <div key={idx} className="text-start space-y-2">
                {item.previewUrl ? (
                  <a
                    href={`/portfolio/families/${encodeURIComponent(
                      item.Title
                    )}`}
                  >
                    <img
                      src={item.previewUrl}
                      alt={item.Title}
                      className=" object-cover rounded-md"
                    />
                  </a>
                ) : (
                  <div className="bg-background rounded-md flex items-center justify-center">
                    <span>No image</span>
                  </div>
                )}
                <h3 className="text-xl text-text pt-4 font-light">
                  {item.Location}
                </h3>
                <h2 className="font-light text-text">{item.Title}</h2>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden sm:flex h-screen justify-start items-center pl-80 bg-primary-100">
          <div className="relative h-3/4">
            <img src={inquire} className="h-full" />

            <h1
              className="absolute text-text-800 text-8xl font-light"
              style={{ top: "5%", right: "-50%" }}
            >
              Inquire
            </h1>

            <h2
              className="absolute text-text-800 text-4xl"
              style={{ top: "23%", right: "-70%" }}
            >
              to work together
            </h2>

            <p
              className="absolute text-text-800 text-2xl w-[40ch]"
              style={{ top: "40%", left: "113%" }}
            >
              You’ve swiped through my website and have fallen in love with my
              experience and style. Now it’s time to chat about your wedding day
              and how I can best support you, photography included! Fill out my
              quick inquiry form and let’s get started!
            </p>

            <button
              className="absolute text-text-800 text-2xl flex justify-center items-center gap-2 w-[15ch] text-center bg-secondary-200 h-12"
              style={{ top: "80%", left: "113%" }}
              onClick={() => (window.location.href = "/contact")}
            >
              Contact me <MoveRight />
            </button>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="flex sm:hidden flex-col items-center gap-6 p-4 bg-primary-100">
          <img src={inquire} className="w-full rounded-md" />

          <div className="text-center space-y-4">
            <h1 className="text-5xl text-text-800 font-light">Inquire</h1>
            <h2 className="text-2xl text-text-800">to work together</h2>
            <p className="text-lg text-text-800 max-w-md mx-auto">
              You’ve swiped through my website and have fallen in love with my
              experience and style. Now it’s time to chat about your wedding day
              and how I can best support you, photography included! Fill out my
              quick inquiry form and let’s get started!
            </p>
          </div>

          <button
            className="text-text-800 text-lg flex justify-center items-center gap-2 px-6 py-3 bg-secondary-200 rounded-md"
            onClick={() => (window.location.href = "/contact")}
          >
            Contact me <MoveRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;

"use client";
/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import NavBar from "@/components/navbar";
import Head from "next/head";
import { useEffect, useState } from "react";
import { fetchWedding, WeddingEntry } from "@/lib/fetchWeddings";
import { EngagementEntry, fetchEngagement } from "@/lib/fetchEngagements";
import { fetchFamilies, FamilyEntry } from "@/lib/fetchFamilies";

/*On the portfolio page I want it to say at the top 
Signature Galleries with a faded image or two as an underlay.  Use the wording. 

A selection of couples , families and elegant events. 

Then. 
Featured weddings with six panels of six different weddings. When you click on the image it takes you to a separate page of 20 30 images in a three across block style. 

Then. 
Featured engagements
With six panels etc. again when you select the image of the event it takes you to a separate page. 

Then. 
Featured Families 
Same thing. 

Make sure there is an inquiry  button with an image and a paragraph of information. */
const signature1 = "/assets/wedding/signature-event.jpg";
const signature2 = "/assets/wedding/signature-event2.jpg";

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
            className=" w-full md:w-[50vw]  object-cover filter blur-sm opacity-30"
          />
          <img
            src={signature2}
            className=" hidden md:block md:w-[50vw] object-cover filter blur-sm opacity-30"
          />
          <div className="absolute flex flex-col gap-6 top-1/2 mx-4 w-3/4 md:w-[40rem]">
            <h1 className="text-white text-6xl md:text-8xl 2xl:text-9xl z-30 text-center font-thin ">
              SIGNATURE GALLERIES
            </h1>
            <hr className="border-1 rounded-md"></hr>
            <h2 className="text-white z-30 text-center italic text-4xl 2xl:text-5xl font-thin">
              A selection of couples, families and elegant events
            </h2>
          </div>
        </div>
        <div className="flex flex-col bg-background md:items-center md:justify-center py-16 px-4 md:p-16">
          <div className="flex flex-row md:w-1/2 gap-4 md:px-4">
            <h2 className="text-text 2xl:text-6xl md:whitespace-nowrap text-start md:text-center">
              Featured Weddings
            </h2>
            <hr className="hidden md:block flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-16 px-4 md:w-1/2 justify-items-center">
            {weddings.map((wedding, idx) => (
              <div key={idx} className="text-center space-y-2">
                {wedding.previewUrl ? (
                  <img
                    src={wedding.previewUrl}
                    alt={wedding.Title}
                    className="w-64  object-cover rounded-md"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-300 rounded-md flex items-center justify-center">
                    <span>No image</span>
                  </div>
                )}
                <p className="text-sm text-text/80">{wedding.Location}</p>
                <h3 className="text-lg font-semibold">{wedding.Title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-background md:items-center md:justify-center py-16 px-4 md:p-16">
          <div className="flex flex-row md:w-1/2 gap-4 md:px-4">
            <h2 className="text-text 2xl:text-6xl md:whitespace-nowrap text-start md:text-center">
              Featured Engagements
            </h2>
            <hr className="hidden md:block flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-16 px-4 md:w-1/2 justify-items-center">
            {engagements.map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.Title}
                    className="w-64 h-64 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-300 rounded-md flex items-center justify-center">
                    <span>No image</span>
                  </div>
                )}
                <p className="text-sm text-text/80">{item.Location}</p>
                <h3 className="text-lg font-semibold">{item.Title}</h3>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col bg-background md:items-center md:justify-center py-16 px-4 md:p-16">
          <div className="flex flex-row md:w-1/2 gap-4 md:px-4">
            <h2 className="text-text 2xl:text-6xl md:whitespace-nowrap text-start md:text-center">
              Featured Families
            </h2>
            <hr className="hidden md:block flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16 gap-16 px-4 md:w-1/2 justify-items-center">
            {families.map((item, idx) => (
              <div key={idx} className="text-center space-y-2">
                {item.previewUrl ? (
                  <img
                    src={item.previewUrl}
                    alt={item.Title}
                    className="w-64 h-64 object-cover rounded-md"
                  />
                ) : (
                  <div className="w-64 h-64 bg-gray-300 rounded-md flex items-center justify-center">
                    <span>No image</span>
                  </div>
                )}
                <p className="text-sm text-text/80">{item.Location}</p>
                <h3 className="text-lg font-semibold">{item.Title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;

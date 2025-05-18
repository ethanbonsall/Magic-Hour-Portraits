/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import NavBar from "@/components/navbar";
import Head from "next/head";

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
  return (
    <div>
      <Head>
        <title>Portfolio</title>
      </Head>
      <NavBar />
      <div className="">
        <div className="h-screen bg-background flex flex-row justify-items-center justify-center align-center">
          <img
            src={signature1}
            className="w-[50vw] object-cover filter blur-sm opacity-30"
          />
          <img
            src={signature2}
            className="w-[50vw] object-cover filter blur-sm opacity-30"
          />
          <div className="absolute flex flex-col gap-6 top-1/2 w-[34rem]">
            <h1 className="text-white text-8xl z-50 text-center font-thin ">
              SIGNATURE GALLERIES
            </h1>
            <hr className="border-1 rounded-md"></hr>
            <h2 className="text-white z-50 text-center italic font-thin">
              A selection of couples, families and elegant events
            </h2>
          </div>
        </div>
        <div className="flex flex-col bg-background items-center justify-center p-16">
          <div className="flex flex-row w-3/4 gap-4 px-4">
            <h2 className="text-text whitespace-nowrap text-center">
              Featured Weddings
            </h2>
            <hr className="flex-grow border-1 rounded-md self-center border-text"></hr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;

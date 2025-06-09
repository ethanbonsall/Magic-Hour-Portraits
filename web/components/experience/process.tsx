/* eslint-disable @next/next/no-img-element */
import { useState } from "react";

const Process = () => {
  const title = [
    "Learn more on our discovery call",
    'Say "yes" to the proposal and book your date',
    "Complimentary engagement session",
    "Preparation for your wedding day",
    "Your wedding day is officially here!",
    "Your gallery, beautifully delivered",
  ];
  const paragraph = [
    "Every great experience begins with a conversation. During our discovery call, we'll get to know each other, talk through your love story, and explore what you're envisioning for your wedding day. It's a chance to connect, ask questions, and ensure we're aligned in creating something meaningful together.",
    "Once you're ready, I'll send over a personalized proposal and agreement tailored to your celebration. When everything is signed and your retainer is in place, your date is officially secured—and we begin planning your photography experience with intention and care.",
    "Your engagement session is a relaxed, joyful opportunity for us to work together before the big day. It's a time to slow down, focus on just the two of you, and create beautiful, natural images that reflect your connection. These portraits often become favorite keepsakes—or even the perfect addition to your invitations.",
    "As your wedding day approaches, we'll talk through the timeline, important moments, and the people you want most to be remembered in your photos. Every detail is thoughtfully planned so that your day feels effortless and you can stay present, knowing everything is taken care of.",
    "When your day arrives, my focus is on telling your story honestly and artfully. I'll be there for the quiet in-between moments, the joyful celebration, and everything in between—so you can soak in the day knowing your memories are being beautifully preserved.",
    "Just a short time after your celebration, your full gallery will arrive—filled with images that reflect the emotion, beauty, and story of your day. From there, I'm here to help you turn your favorites into heirloom albums and fine art prints you'll treasure for a lifetime.",
  ];

  const [x, setX] = useState(0);
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background pt-8 md:pt-0">
      <div className="w-full md:w-[60dvw] bg-background flex flex-col justify-center align-middle">
        <div className="flex flex-col mx-[8dvw] text-text gap-8 pb-8 md:pb-0 min-h-[692px] md:min-h-0">
          <div>
            <p className=" text-4xl font-thin mb-4 ">Explore The Process</p>
            <hr className="border-text"></hr>
          </div>
          <p className="text-5xl w-[85%] font-thin">{title[x]}</p>
          <p className="text-2xl font-thin">{paragraph[x]}</p>
          <button
            className="w-fit bg-lime-800 py-2 px-8 text-white text-lg hover:bg-lime-700 transition-colors duration-300"
            onClick={() => setX((prevX) => (prevX + 1) % title.length)}
          >
            NEXT →
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col md:w-[40dvw] bg-background-700 justify-evenly py-8 md:py-0 gap-4 md:gap-0">
        <img
          src="/assets/wedding/signature-event.jpg"
          alt="wedding image 1"
          className="mx-4"
        ></img>
        <img
          src="/assets/wedding/signature-event2.jpg"
          alt="wedding image 2"
          className="mx-4"
        ></img>
      </div>
    </div>
  );
};

export default Process;

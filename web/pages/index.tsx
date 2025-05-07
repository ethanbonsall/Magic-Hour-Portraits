import Home from "../components/home/home-carousel";
import NavBar from "../components/home/navbar";
import Experience from "@/components/home/experience-section";
import BottomBar from "@/components/home/bottom-description-bar";
import Head from "next/head";

const Portfolio = () => {
  return (
    <div className="bg-background flex flex-col items-center font-roboto min-h-screen">
      <Head>
        <title>Magic Hour Portraits</title>
        <meta name="description" content="Magic Hour Portraits Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Home />
      <Experience />
      <BottomBar />
    </div>
  );
};

export default Portfolio;

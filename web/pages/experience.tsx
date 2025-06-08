import Description from "@/components/experience/description";
import Landing from "@/components/experience/landing";
import Process from "@/components/experience/process";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import Head from "next/head";
const ExperiencePage = () => {
  return (
    <div>
      <Head>
        <title>Experience</title>
      </Head>
      <div className="flex flex-col">
        <NavBar />
        <Landing />
        <Description />
        <Process />
        <div className="h-screen bg-background flex justify-items-center justify-center align-center">
          <h1 className="text-5xl md:text-6xl font-bold self-center text-center text-text">
            UNDER CONSTRUCTION
          </h1>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ExperiencePage;

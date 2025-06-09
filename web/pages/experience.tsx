import Description from "@/components/experience/description";
import Investment from "@/components/experience/investment";
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
      <div className="flex flex-col mt-4 md:mt-0">
        <NavBar />
        <Landing />
        <Description />
        <Process />
        <Investment />
        <Footer />
      </div>
    </div>
  );
};

export default ExperiencePage;

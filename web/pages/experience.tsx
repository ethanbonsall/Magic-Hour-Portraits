// File: pages/experience.tsx
import Description from "@/components/experience/description";
import Investment from "@/components/experience/investment";
import Landing from "@/components/experience/landing";
import Process from "@/components/experience/process";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import Head from "next/head";
import Script from "next/script";
const ExperiencePage = () => {
  return (
    <div className="w-screen overflow-x-hidden">
      <Head>
        <title>Experience</title>
        <meta name="description" content="Discover the Magic Hour Portraits experience. From consultation to delivery, learn about our process, investment, and commitment to creating elegant, timeless photography." />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1JPCVGXG7T"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JPCVGXG7T');
            `,
        }}
      />
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

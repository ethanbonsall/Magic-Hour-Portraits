import Header from "../components/home/headerNew";
import NavBar from "../components/home/navbar";
import Experience from "@/components/home/experience";

const Portfolio = () => {
  return (
    <div className="bg-background flex flex-col items-center font-roboto min-h-screen">
      <NavBar />
      <Header />
      <Experience />
    </div>
  );
};

export default Portfolio;

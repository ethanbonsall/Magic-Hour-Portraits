import Home from "../components/home/home";
import NavBar from "../components/home/navbar";
import Experience from "@/components/home/experience";
import BottomBar from "@/components/home/bottomBar";

const Portfolio = () => {
  return (
    <div className="bg-background flex flex-col items-center font-roboto min-h-screen">
      <NavBar />
      <Home />
      <Experience />
      <BottomBar />
    </div>
  );
};

export default Portfolio;

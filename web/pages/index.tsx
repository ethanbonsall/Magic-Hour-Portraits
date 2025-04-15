import Courses from "../components/Portfolio/classes";
import Header from "../components/Portfolio/headerNew";
import Web from "../components/Portfolio/projects";
import Education from "../components/Portfolio/education";
import Skills from "../components/Portfolio/skills";
import Experience from "../components/Portfolio/experience";
import NavBar from "../components/Portfolio/navbar";

const Portfolio = () => {
  return (
    <div className="bg-background flex flex-col items-center font-roboto min-h-screen">
      <div className="h-6 flex w-full bg-accent" id="home"></div>
      <NavBar />
      <Header />
      <Education />
      <Courses />
      <Web />
      <Experience />
      <Skills />
    </div>
  );
};

export default Portfolio;

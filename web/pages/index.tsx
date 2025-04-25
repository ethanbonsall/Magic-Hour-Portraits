import Courses from "../components/home/classes";
import Header from "../components/home/headerNew";

import Education from "../components/home/education";
import Experience from "../components/home/experience";
import NavBar from "../components/home/navbar";

const Portfolio = () => {
  return (
    <div className="bg-background flex flex-col items-center font-roboto min-h-screen">
      <NavBar />
      <Header />
      <Education />
      <Courses />
      <Experience />
    </div>
  );
};

export default Portfolio;

import NavBar from "@/components/home/navbar";
const AboutPage = () => {
  return (
    <div>
      <NavBar />
      <div className="h-screen bg-background flex justify-items-center justify-center align-center">
        <h1 className="text-5xl md:text-6xl font-bold self-center text-center text-text">
          About Page Here
        </h1>
      </div>
    </div>
  );
};

export default AboutPage;

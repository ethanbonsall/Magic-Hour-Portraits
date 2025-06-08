/* eslint-disable @next/next/no-img-element */
const Landing = () => {
  return (
    <div className="relative h-screen bg-background flex items-center overflow-hidden justify-center text-start">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/assets/wedding/signature-event2.jpg')",
          filter: "blur(4px)",
          opacity: 0.5,
        }}
      ></div>
      <div className=" flex flex-row z-30">
        <div className="flex flex-col text-primary-700 text-center md:text-start justify-center md:justify-end mb-0 md:mb-[6dvh] lg:mb-[8dvh] xl:mb-[10dvh] 2xl:mb-[20dvh] gap-8 lg:gap-12 xl:gap-16 mr-0 md:mr-[10dvw]">
          <div>
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-thin">
              STORY
            </h1>
            <h1 className="text-7xl lg:text-8xl xl:text-9xl font-thin">
              TELLING
            </h1>
            <p className="text-4xl lg:text-5xl xl:text-6xl">
              for the modern couple
            </p>
          </div>
          <hr className="mx-2 md:mx-0"></hr>
          <div>
            <p className="text-2xl xl:text-3xl">
              Wedding Photgrapher serving Pennsylvania, New Jersey,
            </p>
            <p className="text-2xl xl:text-3xl">
              New York, Maryland, Deleware, and Destinations
            </p>
          </div>
        </div>

        <img
          src="/assets/home/right.jpg"
          alt="Wedding"
          className=" h-[80dvh] hidden md:inline-block w-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};
export default Landing;

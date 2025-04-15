/* eslint-disable @next/next/no-img-element */
import profilePic from "@/assets/image.jpeg";

const Header = () => {
  return (
    <div className="flex-col w-full">
      <div className="flex-col bg-secondary w-full text-text pt-[50px] pb-[80px] md:pt-[75px] md:pb-[90px] xl:pt-[85px] xl:pb-[105px] 2xl:pt-[115px] 2xl:pb-[135px]">
        <div className="flex items-center text-center justify-center">
          <img
            src={profilePic.src}
            alt="Profile"
            className="ethan-hover items-center justify-center w-40 h-40 md:w-80 md:h-80 rounded-full border-accent border-8"
          />
        </div>
        <div className="flex mt-10 md:mt-20 lg:mt-30 2xl:mt-40 items-center justify-center px-10 m:px-40 l:px-64 2xl:px-80">
          <div className="flex-row items-center text-center justify-items-center text-2xl md:text-4xl lg:text-5xl font-sans font-extrabold animate-slide-up">
            <span className="text-text">Hey, I&apos;m </span>
            <span className="text-pop"> Ethan Bonsall. </span>
            <span className="text-text">
              Here, you can check out what I&apos;m working on and more about
              me. i &lt;3 coding and web dev.
            </span>
          </div>
        </div>
      </div>
      <div className="h-6 flex w-full bg-accent"></div>
    </div>
  );
};

export default Header;

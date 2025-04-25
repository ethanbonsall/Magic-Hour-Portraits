
import { useEffect, useState } from "react";
import useHeaderPhotos from "./useHeaderPhotos";
import MenuSidebar from "./MenuSideBar";
import SocialIcons from "./socialIcons";

const Header = () => {
  const { photos, loading } = useHeaderPhotos();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!photos || photos.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [photos]);

  if (loading || !photos?.length) {
    return <div className="p-8 text-white text-xl">Loading...</div>;
  }

  return (
    <div className="flex-col z-40 w-full top-0">
      <div className="flex-col z-50 bg-secondary w-full text-text">
        <div className="flex items-center text-center justify-center">
          <img
            src={photos[index]}
            alt={`Profile ${index}`}
            className="w-full h-screen object-cover object-top"
          />
             <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl">
        Robert Bonsall
      </h1>
      <p className="mt-4 text-lg md:text-xl lg:text-2xl 2xl:text-3xl">
        Pennsylvania Photographer
      </p></div>
      <SocialIcons />
      <MenuSidebar />
        </div>
      </div>
      <div className="h-6 flex w-full bg-accent"></div>
    </div>
  );
};

export default Header;
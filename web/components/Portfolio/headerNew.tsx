
import { useEffect, useState } from "react";
import useHeaderPhotos from "./useHeaderPhotos";

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
    <div className="flex-col w-full">
      <div className="flex-col bg-secondary w-full text-text pt-[50px] pb-[80px] md:pt-[75px] md:pb-[90px] xl:pt-[85px] xl:pb-[105px] 2xl:pt-[115px] 2xl:pb-[135px]">
        <div className="flex items-center text-center justify-center">
          <img
            src={photos[index]}
            alt={`Profile ${index}`}
            className="ethan-hover w-40 h-40 md:w-80 md:h-80 border-accent border-8 object-cover transition-all duration-500 ease-in-out"
          />
        </div>
      </div>
      <div className="h-6 flex w-full bg-accent"></div>
    </div>
  );
};

export default Header;
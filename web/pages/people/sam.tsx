/* eslint-disable @next/next/no-img-element */
import sam from "@/assets/sam.jpeg";

const Sam = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src={sam.src}
        alt="Sam"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>
  );
};

export default Sam;

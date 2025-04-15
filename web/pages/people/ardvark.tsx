/* eslint-disable @next/next/no-img-element */
import ardvark from "@/assets/ardvark.jpeg";

const Sam = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src={ardvark.src}
        alt="lemon"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>
  );
};

export default Sam;

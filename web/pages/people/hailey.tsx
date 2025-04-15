/* eslint-disable @next/next/no-img-element */
import hailey from "@/assets/hailey.jpeg";

const Hailey = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src={hailey.src}
        alt="small"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>
  );
};

export default Hailey;

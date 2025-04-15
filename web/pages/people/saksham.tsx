/* eslint-disable @next/next/no-img-element */
import saksham from "@/assets/saksham.jpeg";

const Saksham = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <img
        src={saksham.src}
        alt="loser"
        className="rounded-lg shadow-lg max-w-full h-auto"
      />
    </div>
  );
};

export default Saksham;

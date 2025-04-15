import taylor from "@/assets/taylor.jpeg";

const Taylor = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div
        className="w-48 h-48 bg-cover bg-center rounded-full border-4 border-red-500 overflow-hidden"
        style={{
          backgroundImage: `url(${taylor.src})`,
          clipPath: "polygon(50% 0%, 100% 35%, 82% 100%, 18% 100%, 0% 35%)",
        }}
      ></div>
      <p className="mt-4 text-xl font-semibold text-red-600">I love you</p>
    </div>
  );
};

export default Taylor;

import java from "@/assets/java.png";
import python from "@/assets/python.png";
import javascript from "@/assets/javaScript.png";
import typescript from "@/assets/typeScript.png";
import cpp from "@/assets/cpp.png";
import sql from "@/assets/sql.png";
import react from "@/assets/react-1.svg";
import angular from "@/assets/angular.png";
import expressjs from "@/assets/expressjs.png";
import nextjs from "@/assets/nextjs.png";
import pandas from "@/assets/pandas.svg";
import postgres from "@/assets/postgres.png";
import supabase from "@/assets/supabase.jpg";
import tableau from "@/assets/tableau.png";
import tensorflow from "@/assets/tensorflow.png";
import css from "@/assets/css.svg";
import html from "@/assets/html.png"; 
const Skills = () => {
  return (
    <section className="bg-background text-text p-5 w-[100%] my-2">
      <h1 className="text-4xl font-bold">Skills & Technologies</h1>
      <hr className="border-accent my-2" />
      <div className="flex-column items-center justify-center justify-items-center">
      <h2 className="underline text-2xl md:text-3xl lg:text-4xl pb-4 font-semibold">
        Programming Languages
      </h2>
      <div className="grid grid-cols-3 md:grid-cols-6 ">
      <div className="flex justify-center items-center">
        <img src={java.src} alt="Java" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={python.src} alt="Python" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={javascript.src} alt="JavaScript" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={typescript.src} alt="TypeScript" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={cpp.src} alt="C++" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={sql.src} alt="SQL" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
      </div>
      </div>
      <div className="flex-column items-center justify-center justify-items-center">
      <h2 className="underline text-2xl md:text-3xl lg:text-4xl pb-4 font-semibold mt-4">
        Frameworks & Libraries
      </h2>
      <div className="grid grid-cols-4 lg:grid-cols-8">
      <div className="flex justify-center items-center">
      <img src={react.src} alt="React" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
      </div>
      <div className="flex justify-center items-center">
      <img src={nextjs.src} alt="Next.js" className="w-16 md:w-24 lg:w-28 h-auto m-2 bg-[#ebf0ee]" />
      </div>
      <div className="flex justify-center items-center">
      <img src={angular.src} alt="Angular" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
      </div>
      <div className="flex justify-center items-center">
      <img src={supabase.src} alt="Supabase" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
      </div>
      <div className="flex justify-center items-center">
      <img src={tensorflow.src} alt="TensorFlow" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
      </div>
      <div className="flex justify-center items-center">
      <img src={expressjs.src} alt="Express.js" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
      </div>
      <div className="flex justify-center items-center">
      <img src={postgres.src} alt="PostgreSQL" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
      </div>
      <div className="flex justify-center items-center">
      <img src={pandas.src} alt="Pandas" className="w-16 md:w-24 lg:w-28 h-auto m-2 bg-[#ebf0ee] " />
      </div>
      </div>
      </div>
      <div className="flex-column items-center justify-center justify-items-center">
      <h2 className="underline text-2xl md:text-3xl lg:text-4xl pb-4 font-semibold mt-4">
        Tools Platforms & Others
      </h2>
      <div className="grid grid-cols-3">
      <div className="flex justify-center items-center">
        <img src={tableau.src} alt="Tableau" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={css.src} alt="CSS" className="w-16 md:w-24 lg:w-28 h-auto m-2" />
        </div>
        <div className="flex justify-center items-center">
        <img src={html.src} alt="HTML" className="w-16 md:w-24 lg:w-28 h-auto m-2 bg-[#ebf0ee] p-1" />
        </div>
      </div>
      </div>
    </section>
  );
};
export default Skills;

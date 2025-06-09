/* eslint-disable @next/next/no-img-element */
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import Head from "next/head";
const about = "/assets/about/about.jpg";
const about2 = "/assets/about/about2.jpg";
const AboutPage = () => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <div className="static">
        <NavBar />
      </div>
      <div>
        <div>
          <div className="min-h-screen bg-background flex flex-col md:flex-row justify-between ">
            <div className="flex-col flex text-text w-full md:w-1/2 gap-2">
              <div className="w-full md:w-3/5">
                <h2 className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold text-center mt-6 text-text">
                  Dedicated To Capturing
                </h2>
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-center">
                Moments You Can Feel
              </h1>
              <hr className="border-text mx-[1dvw]"></hr>
              <div className="mx-8">
                <p className="text-4xl 2xl:text-5xl font-bold">
                  Robert Bonsall
                </p>
                <p className="text-xl 2xl:text-2xl italic mb-4">
                  Founder & Photographer, Magic Hour Portraits
                </p>
              </div>
              <div className="relative p-6 max-w-prose self-center 2xl:my-16 mb-8 before:absolute before:top-0 before:left-0 before:w-10 before:h-10 before:border-t-4 before:border-l-4 before:border-text after:absolute after:bottom-0 after:right-0 after:w-10 after:h-10 after:border-b-4 after:border-r-4 after:border-text">
                <p className="text-base md:text-lg 2xl:text-xl leading-relaxed">
                  From the moment he held his first Voigtländer camera at age
                  14, Robert Bonsall knew photography would shape his life. That
                  passion led him to his first job at Ritz Camera, where he
                  sharpened both his technical skill and artistic eye. Over the
                  years, Robert has worn many hats—photographer, teacher, father
                  of ten, and small business owner—but his love for capturing
                  life&apos;s most meaningful moments has never wavered. Robert
                  went on to run a successful one-hour photo lab with a portrait
                  studio, where he perfected his craft and developed what he
                  calls a Timeless Artistic Style. His images are known for
                  their elegant, romantic quality—portraits that evoke genuine
                  emotion and reveal the quiet beauty in everyday moments. With
                  a deep understanding of light, texture, and composition,
                  Robert doesn&apos;t just take pictures—he creates heirlooms.
                  Whether photographing a wedding, a family, or an individual
                  portrait, his goal is always the same: to preserve the essence
                  of his subjects with honesty and artistry. Today, through
                  Magic Hour Portraits, Robert brings decades of experience and
                  a lifetime of passion to every session. His work is defined by
                  warmth, authenticity, and a quiet grace that speaks to the
                  heart. These are portraits you&apos;ll cherish forever.
                </p>
              </div>
            </div>

            <div className="flex md:w-1/2 justify-center pt-12 bg-primary-100 items-center">
              <div className="relative ">
                <img
                  src={about}
                  alt="Robert"
                  className="w-3/4 md:w-full  md:h-[360px] lg:h-[480px] xl:h-[600px] 2xl:h-[700px] object-cover mb-60 ml-12 object-bottom rounded shadow"
                />

                <img
                  src={about2}
                  alt="Robert2"
                  className="absolute bottom-16 md:bottom-12 lg:bottom-0 left-16 md:-left-16 -translate-y-1/2 w-2/3 object-cover rounded shadow border-4 border-background"
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;

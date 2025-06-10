import Image from "next/image";
import Link from "next/link";

const leftImg = "/assets/home/left.jpg";
const middleImg = "/assets/home/center.jpg";
const rightImg = "/assets/home/right.jpg";

const HomeExperienceSection = () => {
  return (
    <section className="bg-background w-full text-text py-20">
      <div className="w-full flex flex-col items-center text-center gap-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">
          Romantic, elegant wedding photography
          <br className="hidden md:block" />
          <span className="italic"> captured on digital and film</span>
        </h2>

        <div className="flex flex-row justify-center items-center gap-4 md:gap-6">
          <div className="w-24 sm:w-36 md:w-52">
            <Image
              src={leftImg}
              alt="Left Image"
              width={400}
              height={500}
              className="rounded shadow object-cover w-full h-auto"
            />
          </div>
          <div className="w-36 sm:w-60 md:w-80">
            <Image
              src={middleImg}
              alt="Middle Image"
              width={600}
              height={800}
              className="rounded shadow-xl object-cover w-full h-auto"
            />
          </div>
          <div className="w-24 sm:w-36 md:w-52">
            <Image
              src={rightImg}
              alt="Right Image"
              width={400}
              height={500}
              className="rounded shadow object-cover w-full h-auto"
            />
          </div>
        </div>

        <p className="max-w-3xl text-base md:text-lg leading-relaxed">
          Pulling off a once-in-a-lifetime event like your wedding comes with
          its share of stress. But at
          <span className="font-semibold"> Magic Hour Portraits</span>, I see it
          as an opportunity. It&apos;s why I&apos;m passionate about delivering
          a once-in-a-lifetime <em>experience</em>. From personal styling for
          your engagement session, to the images you&apos;ll look back on for
          years to come (and not to mention some fun surprises along the way),
          I&apos;m here to be your confidante, guide, and friend as you commit
          to your forever.
        </p>

        <Link
          href="/experience"
          className="text-lg font-semibold tracking-wide underline underline-offset-4 hover:text-primary transition"
        >
          THE WEDDING EXPERIENCE →
        </Link>
      </div>
    </section>
  );
};

export default HomeExperienceSection;

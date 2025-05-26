/* eslint-disable @next/next/no-html-link-for-pages */

const ConsultationSection = () => {
  return (
    <section className="relative overflow-hidden w-full  py-24 px-6 text-black">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/assets/home/consultation.jpg')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          filter: "blur(4px)",
          opacity: 0.6,
        }}
      ></div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Cheers to your forever
        </h2>
        <p className="text-lg md:text-xl leading-relaxed mb-8">
          I can&apos;t wait to meet you and your forever person. Fill out my
          inquiry form to tell me more about your day, and we&apos;ll set up a
          call to get to know each other and decide if we are a good fit!
        </p>
        <a
          href="/contact"
          className="inline-block bg-primary text-white font-medium px-6 py-3 rounded-md text-sm md:text-base hover:bg-primary/90 transition"
        >
          SCHEDULE A CONSULTATION
        </a>
      </div>
    </section>
  );
};

export default ConsultationSection;

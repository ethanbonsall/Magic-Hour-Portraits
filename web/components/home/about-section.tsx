/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */

const AboutSection = () => {
  return (
    <section className="flex bg-primary-100 text-text w-full justify-center py-16 px-4 md:px-12">
      <div className="max-w-screen-xl px-auto flex flex-col md:flex-row justify-items-center items-center gap-12">
        {/* Image */}
        <div className="w-full md:w-1/2">
          <img
            src="/assets/about/about.jpg"
            alt="Robert Bonsall"
            className="rounded-lg shadow-lg w-full object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Robert</h2>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            From the moment he held his first Voigtländer camera at age 14 in
            central Pennsylvania, Robert Bonsall knew photography would shape
            his life. That passion led to his first job at Ritz Camera, where he
            honed both his technical skill and artistic eye.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            Over the years, Robert has worn many hats—photographer, teacher,
            father of ten, and small business owner—but his love for capturing
            life&apos;s most meaningful moments has never faded. He ran a
            successful one-hour photo lab with a portrait studio, where he
            developed his signature <em>Timeless Artistic Style</em>.
          </p>
          <p className="text-base md:text-lg leading-relaxed mb-6">
            His portraits are known for their elegant, romantic quality—images
            that evoke emotion and reveal the quiet beauty in everyday moments.
            Through Magic Hour Portraits, Robert brings decades of experience
            and heartfelt artistry to every session, creating heirlooms defined
            by warmth, authenticity, and grace.
          </p>
          <a
            href="/about"
            className="inline-block mt-4 px-6 py-3 bg-primary text-white rounded-md text-sm md:text-base font-medium transition hover:bg-primary/90"
          >
            More about me →
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

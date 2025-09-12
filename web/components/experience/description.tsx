/* eslint-disable @next/next/no-img-element */
const Description = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background-200 justify-evenly align-middle py-8 px-4 md:p-0">
      <img
        src="/assets/home/left.jpg"
        alt="Wedding"
        className="h-[80lvh] w-auto object-cover rounded-lg shadow-lg self-center"
      />
      <div className="flex flex-col bg-background-200 md:bg-secondary-400 w-full md:w-[50dvw] text-text md:text-white my-16">
        <hr className="inline-block md:hidden border-text mx-2"></hr>
        <p className="m-5 lg:m-6 xl:m-8 text-4xl xl:text-5xl">
          Throughout my career, I&apos;ve had the privilege of capturing some of
          the most heartwarming celebrations between couples on their wedding
          day.
        </p>
        <p className="m-5 lg:m-6 xl:m-8 text-2xl">
          One thing that ties every wedding I photograph together is the story
          behind it all. Each image captures a unique chapter — from slipping
          into your shoes and the quiet anticipation before the ceremony, to the
          joyful (and slightly exhausted) moments on the dance floor.
        </p>
        <p className="m-5 lg:m-6 xl:m-8 text-2xl">
          When the music fades and the last guests head home, you&apos;ll find
          yourselves cozied up on the couch. Flipping through your wedding
          album, each photo will bring back the genuine emotions of the day — a
          timeless reflection of your love and how it all unfolded.
        </p>
      </div>
    </div>
  );
};
export default Description;

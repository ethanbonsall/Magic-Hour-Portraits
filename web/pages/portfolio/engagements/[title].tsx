import { GalleryImages } from "@/components/galleryImages";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import { EngagementEntry, fetchEngagement } from "@/lib/fetchEngagements";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FamilyPage() {
  const { query } = useRouter();
  const titleParam =
    typeof query.title === "string" ? query.title.replace(/-/g, " ") : "";

  const [wedding, setWedding] = useState<EngagementEntry | null>(null);

  useEffect(() => {
    if (!titleParam) return;
    fetchEngagement().then((data) => {
      const match = data.find((w) => w.Title === titleParam);
      setWedding(match || null);
    });
  }, [titleParam]);

  if (!titleParam) return <p></p>;
  if (!wedding) return <p></p>;

  return (
    <div className="bg-background text-text">
      <div className="static">
        <NavBar />
      </div>
      <div className="justify-items-start m-4">
        <button
          onClick={() => (location.href = "/portfolio")}
          className="flex items-center gap-4 text-lg sm:text-xl lg:text-2xl 2xl:text-3xl"
        >
          <MoveLeft className="w-[1.5em] h-[1.5em]" />
          <p className="hidden md:block">Back To All Galleries</p>
        </button>
      </div>
      <div className="px-4 py-12 justify-items-center">
        <h1 className="text-center font-thin text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl mb-4">
          {wedding.Title}
        </h1>

        <h2 className="text-center italic text-lg sm:text-xl md:text-2xl lg:text-3xl 2xl:text-4xl mb-12">
          {wedding.Location}
        </h2>

        <div className="mx-auto md:self-center w-3/4">
          <GalleryImages folderPath={wedding.Images} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

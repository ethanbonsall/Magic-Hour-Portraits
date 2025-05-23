import { GalleryImages } from "@/components/galleryImages";
import { FamilyEntry, fetchFamilies } from "@/lib/fetchFamilies";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function FamilyPage() {
  const { query } = useRouter();
  const titleParam =
    typeof query.title === "string" ? query.title.replace(/-/g, " ") : "";

  const [wedding, setWedding] = useState<FamilyEntry | null>(null);

  useEffect(() => {
    if (!titleParam) return;
    fetchFamilies().then((data) => {
      const match = data.find((w) => w.Title === titleParam);
      setWedding(match || null);
    });
  }, [titleParam]);

  if (!titleParam) return <p></p>;
  if (!wedding) return <p></p>;

  return (
    <div className="px-4 py-12">
      <h1 className="text-center font-thin text-4xl sm:text-5xl md:text-6xl lg:text-7xl 2xl:text-8xl mb-4">
        {wedding.Title}
      </h1>

      <h2 className="text-center italic text-lg sm:text-xl md:text-2xl mb-12">
        {wedding.Location}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <GalleryImages folderPath={wedding.Images} />
      </div>
    </div>
  );
}

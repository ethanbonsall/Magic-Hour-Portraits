// File: components/galleryImages.tsx
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import supabase from "@/supabaseClient";

type Props = {
  folderPath: string;
};

export function GalleryImages({ folderPath }: Props) {
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data: files, error } = await supabase.storage
        .from("images")
        .list(folderPath);

      if (error || !files) return;

      const urls = files.map(
        (file) =>
          supabase.storage
            .from("images")
            .getPublicUrl(`${folderPath}/${file.name}`).data.publicUrl
      );

      setImageUrls(urls);
    };

    fetchImages();
  }, [folderPath]);

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {imageUrls.map((url, idx) => (
        <img
          key={idx}
          src={url}
          alt={`Gallery Image ${idx}`}
          className="w-full rounded shadow-md mb-4 break-inside-avoid"
        />
      ))}
    </div>
  );
}

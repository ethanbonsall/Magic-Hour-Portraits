import supabase from "@/supabaseClient.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const folderPath = "Header";
    console.log(`📂 Attempting to list files from: photos/${folderPath}`);

    const { data: listData, error: listError } = await supabase.storage
      .from("photos")
      .list(folderPath);

    if (listError) {
      console.error("❌ Supabase list() error:", listError);
      return res.status(500).json({ message: "Failed to list images", error: listError.message });
    }

    if (!listData || listData.length === 0) {
      console.warn(`⚠️ Supabase list() returned empty array from folder: photos/${folderPath}`);
      return res.status(200).json([]);
    }

    console.log("✅ Found files:", listData.map(f => f.name));

    const photoUrls = listData.map((file) => {
      const { data: urlData, error: urlError } = supabase.storage
        .from("photos")
        .getPublicUrl(`${folderPath}/${file.name}`);

      const url = urlData?.publicUrl;
      console.log(`🔗 Generated URL for ${file.name}: ${url}`);

      if (urlError || !url) {
        console.error(`❌ Error generating public URL for ${file.name}:`, urlError || "Missing URL");
        return null;
      }

      return {
        name: file.name,
        url,
      };
    }).filter(Boolean);

    console.log("✅ Final photo URL array:", photoUrls.map(p => p.url));

    res.status(200).json(photoUrls);
  } catch (error) {
    console.error("❌ Unexpected error in /api/header:", error);
    res.status(500).json({ message: "Unexpected error", error: error.message });
  }
}

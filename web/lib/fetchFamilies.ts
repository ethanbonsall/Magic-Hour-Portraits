import supabase from '@/supabaseClient'

export type FamilyEntry = {
    Title: string;
    Location: string;
    Images: string;
    previewUrl: string | null;
}

export const fetchFamilies = async (): Promise<FamilyEntry[]> => {
    const { data, error } = await supabase
        .from("Images")
        .select("Title, Location, Images")
        .eq("Type", "Family");

    if (error || !data) {
        return [];
    }

    const withThumbnails = await Promise.all(
        data.map(async (item) => {
            const { data: files, error: fileError } = await supabase.storage
                .from("images")
                .list(item.Images, {
                    limit: 1,
                    sortBy: { column: "name", order: "asc" },
                });

            if (fileError || !files?.[0]) return { ...item, previewUrl: null };

            const { data: urlData } = supabase.storage
                .from("images")
                .getPublicUrl(`${item.Images}/${files[0].name}`);

            return {
                ...item,
                previewUrl: urlData.publicUrl,
            };
        })
    );

    return withThumbnails;
};

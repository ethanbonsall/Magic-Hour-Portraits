/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";


const useHeaderPhotos = () => {
    const [photos, setPhotos] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch("/api/header/");

                if (!response.ok) {
                    throw new Error(`Server responded with ${response.status}`);
                }

                const data = await response.json();
                setLoading(false);

                if (!Array.isArray(data)) {
                    throw new Error("Invalid response format");
                }

                setPhotos(data.map((photo: any) => photo.url));
            } catch (error) {
                setPhotos([]);
                setLoading(false);
            }
        };

        fetchPhotos();
    }, []);

    return { photos, loading };
};

export default useHeaderPhotos;
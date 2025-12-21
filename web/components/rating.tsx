// File: components/rating.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import supabase from "@/supabaseClient";
import { Quote } from "lucide-react";

interface Review {
  name: string;
  event: string;
  review: string;
  rating: number;
}

export default function ReviewCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("form")
        .select("name, event, review, rating")
        .eq("rating", 5);

      if (!error) {
        setReviews(data ?? []);
      }
    };

    fetchReviews();
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [reviews]);

  if (reviews.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No 5-star reviews yet.
      </div>
    );
  }

  const { name, event, review } = reviews[current];

  return (
    <div className="relative flex flex-col md:flex-row w-full h-screen justify-center items-center md:justify-start pl-0 md:pl-[10lvw] bg-background-200 py-8">
      <div className="flex flex-col gap-6 max-w-full px-4 md:px-0 md:max-w-[50vw] justify-center">
        <Quote />
        <p className="text-2xl md:text-3xl">&quot;{review}&quot;</p>
        <div>
          <p className="text-xl font-semibold">-{name}</p>
          <p className="text-lg italic capitalize">{event}</p>
        </div>
      </div>

      <div className="hidden md:block md:absolute md:left-3/4 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/3">
        <img
          src="/assets/review.webp"
          alt="Review"
          className="w-100 h-auto object-cover rounded-lg shadow-md border-primary-500 border-4"
        />
      </div>
    </div>
  );
}

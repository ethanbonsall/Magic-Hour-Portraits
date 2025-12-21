// File: pages/form.tsx
import CategoryComboBox from "@/components/combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Star } from "lucide-react";
import { useState } from "react";
import supabase from "@/supabaseClient";
import NavBar from "@/components/navbar";
import BottomBar from "@/components/home/bottom-description-bar";
import Script from "next/script";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function FormPage() {
  const [category, setCategory] = useState<
    "wedding" | "family" | "engagement" | null
  >("wedding");
  const [names, setNames] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");

  const router = useRouter();

  useEffect(() => {
    const cleanupRecaptcha = () => {
      if (window.grecaptcha) {
        delete window.grecaptcha;
      }

      const script = document.querySelector("script[src*='recaptcha/api.js']");
      if (script) {
        script.remove();
      }
    };

    router.events.on("routeChangeStart", cleanupRecaptcha);

    return () => {
      router.events.off("routeChangeStart", cleanupRecaptcha);
      cleanupRecaptcha();
    };
  }, [router]);

  const handleSubmit = async () => {
    if (!names || !review || !rating || !category) {
      alert("Please fill out all fields.");
      return;
    }

    if (typeof window.grecaptcha === "undefined") {
      alert("reCAPTCHA is not ready. Please wait a moment and try again.");
      return;
    }

    try {
      await window.grecaptcha.ready(async () => {
        const token = await window.grecaptcha.execute(
          "6LfMWlwrAAAAAEsQHS_TmSkyBBk1-F4q2y5ESFzG",
          { action: "submit_feedback" }
        );

        const verifyRes = await fetch("/api/verify-recaptcha", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success || verifyData.score < 0.5) {
          alert("reCAPTCHA validation failed. Please try again later.");
          return;
        }

        const { error } = await supabase.from("form").insert({
          name: names,
          event: category,
          review,
          rating,
        });

        if (error) {
          alert("Something went wrong while submitting. Please try again.");
        } else {
          alert("Thank you for your feedback!");
          setNames("");
          setReview("");
          setRating(0);
          setCategory("wedding");
        }
      });
    } catch (err) {
      alert("Something went wrong with reCAPTCHA. Please try again.");
    }
  };

  return (
    <div className="w-screen overflow-x-hidden">
      <Head>
        <title>Form</title>
      </Head>
      {/* <!-- reCAPTCHA is used for spam protection. The badge has been hidden in compliance with Google's terms: https://developers.google.com/recaptcha/docs/faq --> */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=6LfMWlwrAAAAAEsQHS_TmSkyBBk1-F4q2y5ESFzG`}
        strategy="afterInteractive"
      />
      <div className="static pt-8 md:pt-0">
        <NavBar />
      </div>
      <div className="flex flex-col justify-center items-center min-h-screen bg-background">
        <div className="flex flex-col w-full md:w-[40lvw] min-h-screen bg-secondary-400 p-10 gap-8 shadow-none md:shadow-2xl">
          <div>
            <h1 className="text-3xl font-bold text-center mb-4">
              We&apos;d Love Your Feedback
            </h1>
            <p className="text-lg text-center mb-6 text-muted-foreground">
              Thank you for letting us be part of your story. If you have a
              moment, we&apos;d truly appreciate your thoughts about the
              experience. Your feedback helps us grow and serve future clients
              even better.
            </p>
          </div>

          <div>
            <Label className="text-lg font-semibold mb-2" htmlFor="name">
              Your Name
            </Label>
            <Input
              value={names}
              onChange={(e) => setNames(e.target.value)}
              className="bg-white"
            />
          </div>

          <div>
            <Label className="text-lg font-semibold mb-2" htmlFor="event">
              What type of session did you book?
            </Label>
            <CategoryComboBox
              onSelect={(value: string) => {
                const lowerValue = value.toLowerCase();
                if (["wedding", "family", "engagement"].includes(lowerValue)) {
                  setCategory(
                    lowerValue as "wedding" | "family" | "engagement"
                  );
                }
              }}
            />
          </div>

          <div>
            <Label className="text-lg font-semibold mb-2" htmlFor="review">
              Share a few words about your experience
            </Label>
            <Textarea
              className="bg-white"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="We'd love to hear what stood out to you!"
            />
          </div>

          <div className="text-center">
            <Label className="text-lg font-semibold mb-2 block">
              How would you rate your experience?
            </Label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-12 h-auto cursor-pointer transition-colors duration-100 ${
                    (hovered || rating) >= star
                      ? "fill-yellow-400"
                      : "fill-none "
                  }`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className="bg-white text-black px-6 py-3 rounded-md hover:bg-background-600 hover:text-white transition-colors duration-200 text-xl"
              onClick={() => {
                handleSubmit();
              }}
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}

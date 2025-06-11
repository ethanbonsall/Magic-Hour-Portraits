import CategoryComboBox from "@/components/combobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Star } from "lucide-react";
import { useState } from "react";
import supabase from "@/supabaseClient";

export default function FormPage() {
  const [category, setCategory] = useState<
    "wedding" | "family" | "engagement" | null
  >("wedding");
  const [names, setNames] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    if (!names || !review || !rating || !category) {
      alert("Please fill out all fields.");
      return;
    }

    const { error } = await supabase.from("form").insert({
      name: names,
      event: category,
      review,
      rating,
    });

    if (error) {
      console.error("Submission error:", error.message);
      alert("Something went wrong while submitting. Please try again.");
    } else {
      alert("Thank you for your feedback!");
      setNames("");
      setReview("");
      setRating(0);
      setCategory("wedding");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-slate-50">
      <div className="flex flex-col w-full md:w-[40lvw] min-h-screen bg-secondary-400 p-10 gap-8">
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
                setCategory(lowerValue as "wedding" | "family" | "engagement");
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
                  (hovered || rating) >= star ? "fill-yellow-400" : "fill-none "
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
  );
}

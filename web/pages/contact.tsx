/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
declare global {
  interface Window {
    grecaptcha: any;
  }
}

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import CategoryComboBox from "@/components/combobox";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import emailjs from "emailjs-com";
import Script from "next/script";

import Head from "next/head";
import { Textarea } from "@/components/ui/textarea";
const ContactPage = () => {
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [category, setCategory] = useState<
    "wedding" | "family" | "engagement" | null
  >("wedding");
  const [names, setNames] = useState("");
  const [email, setEmail] = useState("");
  const [vision, setVision] = useState("");
  const [priority, setPriority] = useState("");
  const [vacation, setVacation] = useState("");

  const handleSend = async () => {
    if (!email || !names) {
      alert("Please fill in your name and email.");
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        "6LfMWlwrAAAAAEsQHS_TmSkyBBk1-F4q2y5ESFzG",
        {
          action: "contact_form",
        }
      );

      const verifyRes = await fetch("/api/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyData.success || verifyData.score < 0.5) {
        alert("reCAPTCHA verification failed. Please try again.");
        return;
      }

      await emailjs.send(
        "service_flvx1zh",
        "template_z4z0xpg",
        {
          email,
          category,
          names,
          phone,
          date: date ? format(date, "PPP") : "",
          vision,
          priority,
          vacation,
        },
        "uhdisYswgUANDPxsU"
      );

      alert("Message sent successfully!");
      setNames("");
      setEmail("");
      setPhone("");
      setDate(undefined);
      setVision("");
      setPriority("");
      setVacation("");
    } catch (error) {
      console.error("Error during form submission:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 10);
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return cleaned;
    return !match[2]
      ? match[1]
      : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ""}`;
  };

  return (
    <div>
      <div className="min-h-screen bg-background mt-4 md:mt-0">
        <Head>
          <title>Contact</title>
        </Head>
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=6LfMWlwrAAAAAEsQHS_TmSkyBBk1-F4q2y5ESFzG`}
          strategy="afterInteractive"
        />

        <NavBar />

        <main className="flex items-center justify-center px-4 pt-16 py-8">
          <div className="w-full max-w-3xl bg-primary-100 rounded-lg shadow-md p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="life" className="text-xl xl:text-2xl">
                What life moment would you like me to photograph for you?
              </Label>
              <CategoryComboBox
                onSelect={(value: string) => {
                  const lowerValue = value.toLowerCase();
                  if (
                    ["wedding", "family", "engagement"].includes(lowerValue)
                  ) {
                    setCategory(
                      lowerValue as "wedding" | "family" | "engagement"
                    );
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-xl xl:text-2xl">
                {category === "wedding"
                  ? "What is your name and your forever person's name?"
                  : "What is your name?"}
              </Label>
              <Input
                type="text"
                id="name"
                value={names}
                onChange={(e) => setNames(e.target.value)}
                placeholder="Jacob and Emily"
                className="bg-white hover:bg-gray-100 h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-xl xl:text-2xl">
                Please provide your preferred email address
              </Label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-white hover:bg-gray-100 h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xl xl:text-2xl">
                Please provide your preferred telephone number.
              </Label>
              <Input
                type="tel"
                id="phone"
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                className="bg-white hover:bg-gray-100 h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xl xl:text-2xl">
                {category === "wedding"
                  ? "Please select your wedding date or preferred session date."
                  : "Please select your preferred session date."}
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className={cn(
                      "w-full h-12 pl-3 text-left font-normal bg-white hover:bg-gray-100 text-base",
                      !date && "text-muted-foreground"
                    )}
                  >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={(d) => d < new Date()}
                    initialFocus
                    className="bg-white"
                    classNames={{
                      day: `
                        h-8 w-8 p-0 font-normal 
                        transition-colors duration-200
                        rounded-full
                        hover:bg-primary-300 
                        aria-selected:bg-primary-500 
                        aria-selected:text-white
                      `,
                      day_selected: `bg-primary-500 text-white rounded-full`,
                      day_today: `border border-primary-500`,
                      day_disabled: `text-gray-300 cursor-not-allowed`,
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vision" className="text-xl xl:text-2xl">
                {category === "wedding"
                  ? "Where are you getting married? Share your wedding day vision with me!"
                  : "Where is your preferred location? Share your vision with me!"}
              </Label>
              <Input
                type="text"
                id="vision"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Include the venue name, address, and details!"
                className="bg-white hover:bg-gray-100 h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-xl xl:text-2xl">
                {category === "wedding"
                  ? "As you consider your wedding day priorities, how important is your wedding photography? 10 is the greatest priority, 1 is the least priority."
                  : "On a scale of 1–10, how excited are you for this photoshoot?"}
              </Label>
              <Input
                type="number"
                id="priority"
                min={1}
                max={10}
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-white hover:bg-gray-100 h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fun" className="text-xl xl:text-2xl">
                Now, just for fun... you&apos;re gifted a free-to-you dream
                vacation with zero limits on location, activity, and time. Tell
                me about it!
              </Label>
              <Textarea
                value={vacation}
                onChange={(e) => setVacation(e.target.value)}
                className="bg-white hover:bg-gray-100 h-32 text-base"
              />
            </div>

            <div className="flex justify-center pt-6">
              <Button
                onClick={handleSend}
                className="w-full sm:w-auto text-lg lg:text-xl px-6 py-3 rounded"
              >
                Send
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;

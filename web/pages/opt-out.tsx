// File: pages/opt-out.tsx
"use client";

import { useState } from "react";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import Head from "next/head";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const OptOutPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [optOutOptions, setOptOutOptions] = useState({
    marketing: false,
    newsletters: false,
    promotional: false,
    dataSharing: false,
    all: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleOptionChange = (option: keyof typeof optOutOptions) => {
    if (option === "all") {
      const newValue = !optOutOptions.all;
      setOptOutOptions({
        marketing: newValue,
        newsletters: newValue,
        promotional: newValue,
        dataSharing: newValue,
        all: newValue,
      });
    } else {
      setOptOutOptions((prev) => {
        const updated = { ...prev, [option]: !prev[option] };
        // Update "all" checkbox based on other selections
        updated.all =
          updated.marketing &&
          updated.newsletters &&
          updated.promotional &&
          updated.dataSharing;
        return updated;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !name) {
      alert("Please provide at least your name and email address.");
      return;
    }

    // Check if at least one opt-out option is selected
    const hasSelection =
      optOutOptions.marketing ||
      optOutOptions.newsletters ||
      optOutOptions.promotional ||
      optOutOptions.dataSharing ||
      optOutOptions.all;

    if (!hasSelection) {
      alert("Please select at least one opt-out option.");
      return;
    }

    setSubmitting(true);

    try {
      // Send opt-out request via API
      const response = await fetch("/api/send-opt-out", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          optOutOptions,
          additionalInfo,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        const errorMsg = data.error || data.message || "Unknown error occurred";
        alert(`Failed to submit opt-out request: ${errorMsg}`);
        setSubmitting(false);
        return;
      }

      alert("Your opt-out request has been submitted successfully. A confirmation email has been sent to your email address. We will process your request within 10 business days.");
      
      // Reset form
      setName("");
      setEmail("");
      setPhone("");
      setAdditionalInfo("");
      setOptOutOptions({
        marketing: false,
        newsletters: false,
        promotional: false,
        dataSharing: false,
        all: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      alert(`There was an error submitting your request: ${errorMessage}. Please try again or contact us directly.`);
      setSubmitting(false);
    }
  };

  return (
    <div className="w-screen overflow-x-hidden">
      <Head>
        <title>Opt-Out Request - Magic Hour Portraits</title>
      </Head>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text px-4 py-12">
        <div className="w-full max-w-3xl space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
              Opt-Out Request
            </h1>
            <p className="text-base md:text-lg text-text-800">
              We respect your privacy choices. Please fill out the form below to
              opt out of specific communications or data sharing practices.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-primary-100 rounded-lg shadow-md p-6 sm:p-8 space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-800">
                  Contact Information
                </h2>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg">
                    Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    required
                    className="bg-white hover:bg-gray-100 h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    className="bg-white hover:bg-gray-100 h-12 text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-lg">
                    Phone Number (Optional)
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(123) 456-7890"
                    className="bg-white hover:bg-gray-100 h-12 text-base"
                  />
                </div>
              </div>

              {/* Opt-Out Options */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-text-800">
                  Opt-Out Options
                </h2>
                <p className="text-sm text-text-700">
                  Please select all that apply:
                </p>

                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optOutOptions.all}
                      onChange={() => handleOptionChange("all")}
                      className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-base text-text-800 font-medium">
                      Opt out of all communications
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optOutOptions.marketing}
                      onChange={() => handleOptionChange("marketing")}
                      className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-base text-text-800">
                      Marketing communications
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optOutOptions.newsletters}
                      onChange={() => handleOptionChange("newsletters")}
                      className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-base text-text-800">
                      Newsletters and updates
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optOutOptions.promotional}
                      onChange={() => handleOptionChange("promotional")}
                      className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-base text-text-800">
                      Promotional emails and offers
                    </span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={optOutOptions.dataSharing}
                      onChange={() => handleOptionChange("dataSharing")}
                      className="w-5 h-5 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-base text-text-800">
                      Data sharing with third parties
                    </span>
                  </label>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo" className="text-lg">
                  Additional Information (Optional)
                </Label>
                <Textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Please provide any additional details about your opt-out request..."
                  rows={4}
                  className="bg-white hover:bg-gray-100 text-base"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto text-lg px-8 py-3 rounded bg-primary-300 hover:bg-primary-400 text-text-800 hover:text-white transition-colors disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Opt-Out Request"}
                </Button>
              </div>
            </div>
          </form>

          <div className="bg-secondary rounded-lg p-6 space-y-3">
            <h3 className="text-xl font-semibold text-text-800">
              What happens after you submit?
            </h3>
            <ul className="list-disc list-inside space-y-2 text-text-700">
              <li>
                Your request will be sent to robertbonsall@magichourportraits.com
              </li>
              <li>We will process your opt-out request within 10 business days</li>
              <li>
                You will receive a confirmation email once your request has been
                processed
              </li>
              <li>
                If you have any questions, please{" "}
                <a href="/contact" className="text-primary hover:underline">
                  contact us
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OptOutPage;


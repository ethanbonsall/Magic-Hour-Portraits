// File: pages/admin/portfolio.tsx
/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { supabase } from "@/lib/supabaseClient";
import NavBar from "@/components/navbar";
import Footer from "@/components/home/bottom-description-bar";
import Link from "next/link";

const frameworks = [
  { value: "Wedding", label: "Wedding" },
  { value: "Family", label: "Family" },
  { value: "Engagement", label: "Engagement" },
];

const UploadPage = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<FileList | null>(null);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files;
    if (f) {
      setFiles(f);
      const imageUrls = [...f].map((file) => URL.createObjectURL(file));
      setPreviews(imageUrls);
    }
  };

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        setAuthenticated(true);
      }
      setLoading(false);
    };
    checkAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpload = async () => {
    if (!files || !title || !location || !value) {
      alert("Please fill out all fields and select images.");
      return;
    }

    const folderPath = `${value}/${title}`;
    const uploadedPaths: string[] = [];

    for (const file of Array.from(files)) {
      const { data, error } = await supabase.storage
        .from("images")
        .upload(`${folderPath}/${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        alert("Image upload failed.");
        return;
      }

      uploadedPaths.push(data.path);
    }

    const { error: insertError } = await supabase.from("Images").insert({
      id: crypto.randomUUID(),
      Title: title,
      Location: location,
      Images: folderPath,
      Type: value,
    });

    if (insertError) {
      alert("Metadata insert failed.");
    } else {
      alert("Submitted!");
      setFiles(null);
      setPreviews([]);
      setTitle("");
      setLocation("");
      setValue("");
    }
  };

  if (loading) {
    return (
      <div className="w-screen overflow-x-hidden">
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text">
          <p>Loading...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="w-screen overflow-x-hidden">
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text space-y-4">
          <h1 className="text-2xl font-semibold">Authentication Required</h1>
          <p className="text-text-800">Please log in through the admin page to access this section.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-screen overflow-x-hidden">
      <NavBar />
      <div className="flex flex-col align-start justify-start bg-background text-text border-border pt-8 gap-8 min-h-screen px-8">
      <div className="flex items-center gap-4">
        <Link href="/admin">
          <Button variant="default" className="flex items-center text-xl bg-primary text-black px-4 py-6 rounded-[5px] gap-2 hover:bg-primary-500">
            <ChevronLeft className="h-16 w-16" />
            Back to Admin
          </Button>
        </Link>
      </div>
      <h1 className="text-center text-3xl font-semibold">Upload</h1>

      {/* ComboBox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="self-center" asChild>
          <Button
            variant="default"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-black text-xl"
          >
            {value || "Select type..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 bg-background border-border text-black text-xl">
          <Command>
            <CommandInput placeholder="Search type" className="h-9" />
            <CommandList>
              <CommandEmpty>No type found.</CommandEmpty>
              <CommandGroup>
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className={cn(
                      "text-text cursor-pointer",
                      "data-[selected=true]:bg-primary-200 data-[selected=true]:text-black",
                      "hover:bg-primary-100 hover:text-black",
                      "bg-background"
                    )}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Title Input */}
      <Label className="text-2xl" htmlFor="title">
        Title
      </Label>
      <Input
        id="title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Location Input */}
      <Label className="text-2xl" htmlFor="location">
        Location
      </Label>
      <Input
        id="location"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      {/* File Input */}
      <div className="space-y-4">
        <label
          htmlFor="picture"
          className="inline-block cursor-pointer px-4 py-2 text-text bg-muted border border-border rounded-md hover:bg-muted/80"
        >
          Select Images
        </label>
        <input
          id="picture"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFiles}
          className="hidden"
        />
        {previews.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {previews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                className="w-20 h-20 object-cover rounded-md border"
              />
            ))}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button className="bg-secondary" onClick={handleUpload}>
        Upload
      </Button>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPage;

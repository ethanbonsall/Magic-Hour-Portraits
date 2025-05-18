/* eslint-disable @next/next/no-img-element */
"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
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
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
        console.error("Upload error:", error);
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
      console.error("Insert error:", insertError);
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
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = () => {
    const correct = process.env.NEXT_PUBLIC_UPLOAD_PAGE_PASSWORD;
    if (password === correct) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };
  if (!authenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text space-y-4">
        <h1 className="text-2xl font-semibold">Enter Password to Continue</h1>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-64"
        />
        <Button className="bg-secondary" onClick={handleLogin}>
          Submit
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col align-start justify-start bg-background text-text border-border pt-8 gap-8 min-h-screen px-8">
      <h1 className="text-center text-3xl font-semibold">Upload</h1>

      {/* ComboBox */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="self-center" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value || "Select type..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
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
                      "text-text",
                      "data-[selected]:bg-secondary-200",
                      "bg-secondary"
                    )}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
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
  );
};

export default UploadPage;

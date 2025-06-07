"use client";

import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const UploadBlogPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [tsx, setTsx] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [password, setPassword] = useState<string>("");
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [uploadLinks, setUploadLinks] = useState<string[]>([]);

  const handleImageUpload = async () => {
    if (!files || !title) {
      alert("Please select one or more images and enter a title.");
      return;
    }

    const folderPath = `blog/${title}`;
    const urls: string[] = [];

    for (const file of Array.from(files)) {
      const filePath = `${folderPath}/${file.name}`;

      const { error } = await supabase.storage
        .from("blog")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) {
        console.error("Upload error:", error);
        alert(`Failed to upload ${file.name}`);
        continue;
      }

      const { data: publicData } = supabase.storage
        .from("blog")
        .getPublicUrl(filePath);
      if (publicData?.publicUrl) {
        urls.push(publicData.publicUrl);
      }
    }

    setUploadLinks(urls);
    alert(
      "Upload complete! You can now insert the <img> tags manually into your TSX."
    );
  };

  const handleSubmit = async () => {
    if (!title || !tsx) {
      alert("Please complete all fields.");
      return;
    }

    const { error } = await supabase.from("Blog").insert({
      title,
      markdown: tsx, // still stored as text
      images: `blog/${title}`,
    });

    if (error) {
      console.error(error);
      alert("Failed to upload post.");
      return;
    }

    alert("Blog post uploaded!");
    setTitle("");
    setTsx("");
    setFiles(null);
    setUploadLinks([]);
  };

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_UPLOAD_PAGE_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password.");
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
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
    <div className="flex flex-col gap-6 px-6 py-10 max-w-3xl mx-auto bg-background text-text">
      <h1 className="text-3xl font-bold text-center">Upload Blog Post</h1>

      <Label htmlFor="title">Title</Label>
      <Input
        id="title"
        placeholder="Blog Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Label htmlFor="tsx">TSX / MDX Content</Label>
      <Textarea
        id="tsx"
        placeholder={`Write your blog post in TSX or MDX...\n\nExample: <h2>Hello</h2>\n<MyComponent />`}
        rows={20}
        value={tsx}
        onChange={(e) => setTsx(e.target.value)}
      />

      <div className="space-y-2">
        <Label htmlFor="images">Upload Images</Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />
        <Button onClick={handleImageUpload} className="mt-2">
          Upload Selected Images
        </Button>

        {uploadLinks.length > 0 && (
          <div className="mt-4 space-y-2">
            <Label>Uploaded Image URLs (insert into TSX):</Label>
            {uploadLinks.map((url, idx) => (
              <div
                key={idx}
                className="text-sm break-all border px-2 py-1 rounded bg-muted"
              >
                {url}
              </div>
            ))}
          </div>
        )}
      </div>

      <Button className="bg-secondary mt-6" onClick={handleSubmit}>
        Submit Blog Post
      </Button>
    </div>
  );
};

export default UploadBlogPost;

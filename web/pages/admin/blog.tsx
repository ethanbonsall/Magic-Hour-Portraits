/* eslint-disable @typescript-eslint/no-unused-vars */
// File: pages/admin/blog.tsx
"use client";

import React, { useState, ChangeEvent, useEffect } from "react";
import { ChevronLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabaseClient";
import NavBar from "@/components/navbar";
import Footer from "@/components/home/bottom-description-bar";
import Link from "next/link";
import Script from "next/script";
import Head from "next/head";

const UploadBlogPost: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [blogTopic, setBlogTopic] = useState<string>("");
  const [tsx, setTsx] = useState<string>("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [uploadLinks, setUploadLinks] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [generating, setGenerating] = useState<boolean>(false);

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
    alert("Upload complete! You can now generate the blog post.");
  };

  const handleGenerateTSX = async () => {
    if (!blogTopic) {
      alert("Please enter what the blog post should be about.");
      return;
    }

    setGenerating(true);
    try {
      const response = await fetch("/api/generate-blog-tsx", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: blogTopic,
          imageUrls: uploadLinks,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(`Failed to generate content: ${data.message}`);
        return;
      }

      // Auto-fill the TSX textarea with generated content
      setTsx(data.content);
    } catch (error) {
      alert("Failed to generate blog content. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !tsx) {
      alert("Please complete all fields.");
      return;
    }

    const { error } = await supabase.from("Blog").insert({
      title,
      markdown: tsx,
      images: `blog/${title}`,
    });

    if (error) {
      alert("Failed to upload post.");
      return;
    }

    alert("Blog post uploaded!");
    setTitle("");
    setTsx("");
    setBlogTopic("");
    setFiles(null);
    setUploadLinks([]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
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
        <Head>
          <title>Authentication Required</title>
        </Head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-1JPCVGXG7T"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JPCVGXG7T');
            `,
          }}
        />
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text space-y-4">
          <h1 className="text-2xl font-semibold">Authentication Required</h1>
          <p className="text-text-800">
            Please log in through the admin page to access this section.
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-screen overflow-x-hidden">
      <Head>
        <title>Upload Blog Post</title>
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-1JPCVGXG7T"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-1JPCVGXG7T');
            `,
        }}
      />
      <NavBar />
      <div className="flex flex-col gap-6 px-6 py-10 bg-background text-black min-h-screen">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button
              variant="default"
              className="flex items-center gap-2 text-lg bg-primary text-black px-4 py-6 rounded-[5px] hover:bg-primary-500"
            >
              <ChevronLeft className="h-16 w-16" />
              Back to Admin
            </Button>
          </Link>
        </div>
        {isOpen ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="relative bg-secondary text-center p-6 rounded-xl shadow-xl max-w-md w-full">
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 text-xl font-bold text-black hover:text-gray-800"
              >
                ×
              </button>
              <div className="flex flex-col text-start">
                <p>{`ALERT!!!: Type in your Title then upload your images.`}</p>
                <p>Do not change your Title after uploading images.</p>
                <p>
                  Enter what the blog post should be about, then click Generate
                  TSX.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <h1 className="text-3xl font-bold text-center">Upload Blog Post</h1>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          {/* Left column - Form */}
          <div className="flex-1 space-y-6">
            <div>
              <Label htmlFor="title" className="text-xl">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xl h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images" className="text-xl">
                Upload Images
              </Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="text-xl"
              />
              <Button onClick={handleImageUpload} className="mt-2 text-lg">
                Upload Selected Images
              </Button>

              {uploadLinks.length > 0 && (
                <div className="flex flex-col mt-4 space-y-2">
                  <Label className="text-lg font-bold">
                    {uploadLinks.length} image(s) uploaded successfully
                  </Label>
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="blogTopic" className="text-xl">
                What should the blog post be about?
              </Label>
              <Textarea
                id="blogTopic"
                placeholder="Describe what the blog post should cover (e.g., 'A beautiful wedding at a vineyard with outdoor ceremony and reception')"
                value={blogTopic}
                onChange={(e) => setBlogTopic(e.target.value)}
                className="text-xl min-h-[100px]"
                rows={4}
              />
              <Button
                onClick={handleGenerateTSX}
                disabled={generating || !blogTopic}
                className="mt-2 text-lg bg-primary text-black hover:bg-primary-500"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate TSX"
                )}
              </Button>
            </div>

            <div>
              <Label htmlFor="tsx" className="text-xl">
                TSX Content
              </Label>
              <Textarea
                id="tsx"
                placeholder="Generated TSX will appear here, or you can write it manually..."
                rows={15}
                value={tsx}
                onChange={(e) => setTsx(e.target.value)}
                className="text-lg font-mono"
              />
            </div>

            <Button
              className="bg-secondary my-6 text-xl py-6"
              onClick={handleSubmit}
            >
              Submit Blog Post
            </Button>
          </div>

          {/* Right column - Preview */}
          <div className="flex-1 lg:sticky lg:top-20 lg:h-[calc(100vh-5rem)]">
            <div className="bg-white border-2 border-border rounded-lg p-6 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4 text-black">Preview</h2>
              {tsx ? (
                <div
                  className="prose prose-lg max-w-none text-black [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg [&_p]:mb-4 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-2"
                  dangerouslySetInnerHTML={{ __html: tsx }}
                />
              ) : (
                <div className="text-gray-500 text-lg">
                  Generated or written TSX content will appear here as a
                  preview.
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          className="flex self-center text-center bg-primary text-black p-3 w-auto text-lg"
          onClick={() => setIsOpen(true)}
        >
          Open instructions again
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default UploadBlogPost;

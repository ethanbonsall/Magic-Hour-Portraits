/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import { createClient } from "@supabase/supabase-js";

// Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type BlogPost = {
  id: string;
  title: string;
  markdown: string;
  images: string;
  created_at: string;
};

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("Blog")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      setPosts(data || []);

      for (const post of data || []) {
        if (post.images) {
          const cleanPath = post.images.replace(/^blog\//, "");

          const { data: files, error: listError } = await supabase.storage
            .from("blog")
            .list(`blog/${cleanPath}`, { limit: 1 });

          if (!listError && files?.[0]) {
            const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/blog/blog/${cleanPath}/${files[0].name}`;
            setPreviews((prev) => ({ ...prev, [post.id]: imageUrl }));
          }
        }
      }
    };

    fetchPosts();
  }, []);

  const stripTSX = (input: string): string => {
    return input
      .replace(/<[^>]+>/g, "") // remove HTML/JSX tags
      .replace(/\{[^}]*\}/g, "") // remove JSX expressions like {someVar}
      .replace(/\s+/g, " ") // normalize whitespace
      .replace(/#/g, "") // remove hash symbols
      .trim()
      .slice(0, 200);
  };

  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="static">
        <NavBar />
      </div>
      <div className="bg-background mt-4 md:mt-0">
        <div className="mx-auto w-full max-w-6xl px-6 py-12 min-h-screen text-text">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col md:flex-row justify-between items-center gap-10 py-16 border-b border-border"
            >
              {/* Text Content */}
              <div className="md:w-1/2 space-y-4">
                <h2 className="text-5xl font-bold leading-tight text-text">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <p className="text-lg leading-relaxed text-text">
                  {stripTSX(post.markdown)}...
                </p>
                <Link
                  href={`/blog/${encodeURIComponent(post.title)}`}
                  className="inline-block text-white bg-primary px-6 py-2 rounded-full hover:bg-primary/80 transition"
                >
                  Read the post →
                </Link>
              </div>

              {/* Image Preview */}
              {previews[post.id] && (
                <div className="md:w-1/2 flex justify-end">
                  <img
                    src={previews[post.id]}
                    alt={post.title}
                    className="max-h-[400px] w-auto object-cover rounded-lg shadow-md"
                  />
                </div>
              )}
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-center text-lg">No blog posts yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;

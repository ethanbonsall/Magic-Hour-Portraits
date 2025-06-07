import NextImage from "next/image";
import { GetServerSideProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import NavBar from "@/components/navbar";
import Footer from "@/components/home/bottom-description-bar";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  source: MDXRemoteSerializeResult;
  title: string;
}

const BlogPostPage = ({ source, title }: Props) => (
  <div className="bg-background text-text min-h-screen w-full">
    <NavBar />
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <MDXRemote {...source} components={{ Image: NextImage }} />
      </div>
    </div>
    <Footer />
  </div>
);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;

  const { data, error } = await supabase
    .from("Blog")
    .select("*")
    .eq("title", decodeURIComponent(slug))
    .limit(1)
    .single();

  if (error || !data) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(data.markdown);

  return {
    props: {
      source: mdxSource,
      title: data.title,
    },
  };
};

export default BlogPostPage;

// File: pages/blog/[slug].tsx
import NextImage from "next/image";
import { GetServerSideProps } from "next";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import NavBar from "@/components/navbar";
import Footer from "@/components/home/bottom-description-bar";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";
import Script from "next/script";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  source: MDXRemoteSerializeResult;
  title: string;
}
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

  const mdxSource = await serialize(data.markdown, {
    blockJS: false,
    blockDangerousJS: false,
  });

  return {
    props: {
      source: mdxSource,
      title: data.title,
    },
  };
};

const BlogPostPage = ({ source, title }: Props) => (
  <div className="w-screen overflow-x-hidden bg-background text-text min-h-screen mt-4 md:mt-0">
    <Head>
      <title>{title}</title>
      <meta name="description" content={`${title} - Photography insights and inspiration from Magic Hour Portraits, an elegant photography studio serving Pennsylvania and beyond.`} />
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
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">{title}</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <MDXRemote {...source} components={{ Image: NextImage }} />
      </div>
    </div>
    <Footer />
  </div>
);

export default BlogPostPage;

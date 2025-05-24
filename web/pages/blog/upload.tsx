import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/home/navbar";
import Head from "next/head";
const BlogPage = () => {
  return (
    <div>
      <Head>
        <title>Blog</title>
      </Head>
      <NavBar />
      <div className="h-screen bg-background flex justify-items-center justify-center align-center">
        <h1 className="text-5xl md:text-6xl font-bold self-center text-center text-text">
          Blog Page Here
        </h1>
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;

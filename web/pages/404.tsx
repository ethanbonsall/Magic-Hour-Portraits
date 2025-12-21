// File: pages/404.tsx
"use client"; // if using App Router (Next.js 13+)

import { useEffect } from "react";
import { useRouter } from "next/router"; // use 'next/navigation' for App Router

const Custom404 = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/"); // Redirect to home
  }, [router]);

  return null; // Optionally show a loading spinner while redirecting
};

export default Custom404;

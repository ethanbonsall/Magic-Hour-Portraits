// File: pages/admin.tsx
"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/home/bottom-description-bar";
import NavBar from "@/components/navbar";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const handleSubmit = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      setAuthenticated(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  if (loading) {
    return (
      <div className="w-screen overflow-x-hidden">
        <Head>
          <title>Admin</title>
        </Head>
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
          <title>Admin</title>
        </Head>
        <NavBar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text px-4 py-12">
          <div className="w-full max-w-md space-y-6">
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                Admin Login
              </h1>
              <p className="text-sm md:text-base text-text-800">
                Enter your email and password to access the admin dashboard.
              </p>
            </div>
            <div className="flex flex-col gap-4 p-6 md:p-8 bg-primary-100 rounded-lg shadow-lg">
              <div className="flex flex-col gap-2">
                <label className="text-lg md:text-xl font-medium text-text-800">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-lg md:text-xl font-medium text-text-800">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 border border-border rounded-md bg-background text-text focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit();
                    }
                  }}
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-secondary hover:bg-secondary/80 text-text py-3 px-6 rounded-md transition-colors text-base md:text-lg font-medium mt-2"
                type="button"
              >
                Login
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-screen overflow-x-hidden">
      <Head>
        <title>Admin</title>
      </Head>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-background text-text px-4 py-12">
        <div className="w-full max-w-4xl space-y-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
            Admin Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/admin/portfolio"
              className="flex flex-col items-center justify-center p-8 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors border-2 border-transparent hover:border-primary"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Upload Portfolio
              </h2>
              <p className="text-center text-sm md:text-base text-text-800">
                Upload new wedding, engagement, or family photos to the
                portfolio
              </p>
            </Link>
            <Link
              href="/admin/blog"
              className="flex flex-col items-center justify-center p-8 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors border-2 border-transparent hover:border-primary"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                Upload Blog Post
              </h2>
              <p className="text-center text-sm md:text-base text-text-800">
                Create and publish a new blog post
              </p>
            </Link>
            <Link
              href="/admin/opt-out"
              className="flex flex-col items-center justify-center p-8 bg-primary-100 hover:bg-primary-200 rounded-lg transition-colors border-2 border-transparent hover:border-primary"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                View Opt Out Requests
              </h2>
              <p className="text-center text-sm md:text-base text-text-800">
                View and manage client requests to opt out of marketing
                materials
              </p>
            </Link>
          </div>
          <div className="flex justify-center pt-8">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-secondary hover:bg-secondary/80 text-text rounded-md transition-colors text-base md:text-lg"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage;

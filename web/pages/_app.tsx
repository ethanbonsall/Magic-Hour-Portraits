import { ThemeProvider } from "@/context/themecontext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=6LfMWlwrAAAAAEsQHS_TmSkyBBk1-F4q2y5ESFzG`}
        strategy="afterInteractive"
      />
      <Analytics />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

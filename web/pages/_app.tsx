import { ThemeProvider } from "@/context/themecontext";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
      <SpeedInsights />
    </QueryClientProvider>
  );
}

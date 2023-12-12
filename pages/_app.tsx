import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { IBM_Plex_Mono, Inconsolata, Source_Code_Pro } from "@next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "600", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-ibm-plex-mono: ${ibmPlexMono.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
        <Analytics />
        <SpeedInsights />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

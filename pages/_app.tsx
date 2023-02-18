import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { IBM_Plex_Mono, Inconsolata, Source_Code_Pro } from "@next/font/google";

const sourceCodePro = IBM_Plex_Mono({
  weight: ["400", "600", "700"],
  variable: "--font-scp",
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-scp: ${sourceCodePro.style.fontFamily};
          }
        `}
      </style>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;

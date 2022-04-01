import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";
import MetaSocial from "../components/meta-social";

export default function Layout({ children }) {
  const navLinks = [
    { text: "Home", route: "/" },
    { text: "Posts", route: "/posts" },
    { text: "About", route: "/about" },
  ];

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          rel="preload"
          as="style"
          href="https://fonts.googleapis.com/css2?family=Recursive:wght,MONO@400,1;700,1&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Recursive:wght,MONO@400,1;700,1&display=swap"
          media="print"
          onload="this.media='all'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Recursive:wght,MONO@400,1;700,1&display=swap"
          />
        </noscript>
        <link rel="icon" href="/favicon.ico" />
        <link
          as="style"
          rel="preload"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          onload="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          />
        </noscript>
      </Head>
      <MetaSocial
        title="Aaron Bos' Blog"
        url={`${process.env.NEXT_PUBLIC_ORIGIN}`}
        description="Blogging about software and technology from a software engineer's perspective."
        image={`${process.env.NEXT_PUBLIC_ORIGIN}/static/card-logo.png`}
      />
      <div className="flex flex-col bg-gray-50 dark:bg-stone-800 dark:text-white">
        <Nav navLinks={navLinks} />
        <main className="w-full pt-8 max-w-screen-lg mx-auto px-10 md:px-28 grow dark:bg-stone-800 dark:text-white">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

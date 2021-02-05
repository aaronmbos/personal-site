import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";

const navLinks = [
  { text: "Posts", route: "/posts" },
  { text: "About", route: "/about" },
];

const socialLinks = [
  { iconClass: "fab fa-twitter", url: "https://twitter.com/AaronMBos" },
  {
    iconClass: "fab fa-linkedin-in",
    url: "https://www.linkedin.com/in/aaron-bos-057a5666/",
  },
  { iconClass: "fab fa-github", url: "https://github.com/aaronmbos" },
  {
    iconClass: "fab fa-stack-overflow",
    url: "https://stackoverflow.com/users/8548471/a-a-ron",
  },
  { iconClass: "fa fa-envelope", url: "mailto:aaron.bos@icloud.com" },
];

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        />
        <meta property="og:title" key="title" content="Aaron Bos" />
        <meta property="og:site_name" content="Aaron Bos' Blog" />
        <meta property="og:url" key="url" content={`${process.env.NEXT_PUBLIC_ORIGIN}`} />
        <meta property="og:description" key="description" content="Blogging about software and technology from a software engineer's perspective." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_ORIGIN}/static/card-logo.png`} />
      </Head>
      <div className="flex flex-col h-screen">
        <Nav navLinks={navLinks} />
        <main className="w-full pt-8 max-w-screen-lg mx-auto px-10 md:px-28 flex-grow">
          {children}
        </main>
        <Footer socialLinks={socialLinks} />
      </div>
    </>
  );
}

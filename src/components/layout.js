import Head from "next/head";
import Nav from "../components/nav";
import Footer from "../components/footer";

const navLinks = [
  { text: "Posts", route: "/posts" },
  { text: "About", route: "/about-me" },
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
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
        />
      </Head>
      <div className="flex flex-col h-screen">
        <Nav navLinks={navLinks} />
        <main className="w-full pt-28 max-w-screen-lg mx-auto px-10 md:px-28 flex-grow">
          {children}
        </main>
        <Footer socialLinks={socialLinks} />
      </div>
    </>
  );
}

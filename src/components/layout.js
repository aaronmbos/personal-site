import Link from "next/link";
import Head from "next/head";

const navLinks = [
  { text: "Posts", route: "" },
  { text: "About", route: "/about-me" },
];

const socialLinks = [
  { iconClass: "fab fa-twitter", url: "https://twitter.com/AaronMBos" },
  { iconClass: "fab fa-linkedin-in", url: "https://www.linkedin.com/in/aaron-bos-057a5666/" },
  { iconClass: "fab fa-github", url: "https://github.com/aaronmbos" },
  { iconClass: "fab fa-stack-overflow", url: "https://stackoverflow.com/users/8548471/a-a-ron" },
  { iconClass: "fa fa-envelope", url: "mailto:aaron.bos@icloud.com" }
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
        <nav className="fixed min-w-full border-b-2 border-grey-400 h-20">
          <div className="min-w-full md:w-auto min-h-full flex items-stretch mx-auto px-1 sm:px-12 lg:px-20">
            <Link href="/">
              <div className="hover:text-gray-500 cursor-pointer text-xl font-mono font-semibold flex items-center flex-none px-2">
                &lt;Aaron &#47;&gt;
              </div>
            </Link>
            <div className="min-h-full px-3 flex flex-grow items-stretch justify-end">
              {navLinks.map((link) => {
                return (
                  <Link href={link.route}>
                    <div className="hover:text-gray-500 cursor-pointer px-3 flex-initial flex items-center">
                      {link.text}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <main className="pt-32 flex-grow">{children}</main>
        <footer className="p-6 text-center bg-gray-50">
          <p className="my-2">Aaron Bos | {new Date().getFullYear()}</p>
          <p>
            {socialLinks.map((icon) => {
              return (
                <a className="hover:text-gray-500 m-3 text-2xl md:m-5" href={icon.url} target="_blank">
                  <i className={icon.iconClass}></i>
                </a>
              );
            })}
          </p>
        </footer>
      </div>
    </>
  );
}

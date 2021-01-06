import Link from "next/link";

const navLinks = [
  { text: "Blog Posts", route: "" },
  { text: "About Me", route: "/about-me" },
];

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <nav className="border-b-2 border-grey-400 h-16">
        <div className="min-h-full flex items-stretch mx-auto px-1 sm:px-6 lg:px-14">
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
      <main className="flex-grow">{children}</main>
      <footer className="p-6 text-center bg-gray-50">
          <p>Aaron Bos | {new Date().getFullYear()}</p>
          <p>Social Links</p>
      </footer>
    </div>
  );
}

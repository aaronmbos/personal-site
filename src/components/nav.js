import Link from "next/link";

const toggleMobileMenu = () => {
  document.getElementById("mobileMenu").classList.toggle("hidden");
  document.getElementById("mobileMenu").classList.toggle("block");
  document.getElementById("iconClosed").classList.toggle("hidden");
  document.getElementById("iconClosed").classList.toggle("block");
  document.getElementById("iconOpen").classList.toggle("block");
  document.getElementById("iconOpen").classList.toggle("hidden");
}

export default function Nav({ navLinks }) {
  return (
    <nav className="border-b border-b-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* <!-- Mobile menu button--> */}
            <button onClick={toggleMobileMenu} className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {/* <!-- Icon when menu is closed. -->
              <!--
                Heroicon name: menu

                Menu open: "hidden", Menu closed: "block"
              --> */}
              <svg id="iconClosed" className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* <!-- Icon when menu is open. -->
              <!--
                Heroicon name: x

                Menu open: "block", Menu closed: "hidden"
              --> */}
              <svg id="iconOpen" className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="hover:text-blue-700 text-blue-500 cursor-pointer text-xl font-mono font-semibold flex items-center flex-none px-2">
                  &lt;Aaron Bos &#47;&gt;
                </a>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                {navLinks.map((link) => {
                  return (
                    <Link key={link.route} href={link.route}>
                      <a className="bg-blue-100 text-blue-500 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
                        {link.text}
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="mobileMenu" className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => {
            return (
              <Link key={link.route} href={link.route}>
                <a className="hover:bg-blue-100 text-blue-500 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                  {link.text}
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

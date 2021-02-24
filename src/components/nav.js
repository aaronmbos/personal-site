import Link from "next/link";
import NavHamburger from "./nav-hamburger";
import NavMobileMenu from "./nav-mobile-menu";
import { useState } from "react";

export default function Nav({ navLinks }) {
  const [menuState, setMenuState] = useState(false);
  
  return (
    <nav className="border-b border-b-gray-200">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <NavHamburger 
            isMenuOpen={menuState}
            handleClick={() => setMenuState(!menuState)}
          />
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a className="hover:text-blue-700 text-blue-500 cursor-pointer text-2xl font-mono font-semibold flex items-center flex-none px-2">
                  &lt;Aaron Bos&#47;&gt;
                </a>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-10">
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
      <NavMobileMenu
        isMenuOpen={menuState}
        navLinks={navLinks}
      />
    </nav>
  );
}

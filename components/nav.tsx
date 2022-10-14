import NavHamburger from "./nav-hamburger";
import NavMobileMenu from "./nav-mobile-menu";
import NavLogo from "./nav-logo";
import NavBody from "./nav-body";
import { useState } from "react";
import algoliasearch from "algoliasearch";
import { BlogIndex } from "../constants";

export interface NavigationLink {
  text: string;
  route: string;
}

const navLinks: NavigationLink[] = [
  { text: "Home", route: "/" },
  { text: "Posts", route: "/posts" },
  { text: "About", route: "/about" },
];

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
);

export default function Nav() {
  const [menuState, setMenuState] = useState(false);

  return (
    <nav className="border-b border-b-gray-200 dark:border-b-zinc-700">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <NavHamburger
            isMenuOpen={menuState}
            handleClick={() => setMenuState(!menuState)}
          />
          <div className="flex-1 flex justify-end sm:items-stretch sm:justify-start">
            <NavLogo />
            <NavBody navLinks={navLinks} />
          </div>
        </div>
      </div>
      <NavMobileMenu isMenuOpen={menuState} navLinks={navLinks} />
    </nav>
  );
}

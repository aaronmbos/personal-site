import NavHamburger from "./nav-hamburger";
import NavMobileMenu from "./nav-mobile-menu";
import NavLogo from "./nav-logo";
import NavBody from "./nav-body";
import { useState } from "react";

export default function Nav({ navLinks, isDarkTheme, onThemeChange }) {
  const [menuState, setMenuState] = useState(false);

  return (
    <nav className="border-b border-b-gray-200 dark:border-b-zinc-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <NavHamburger
            isMenuOpen={menuState}
            handleClick={() => setMenuState(!menuState)}
          />
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <NavLogo />
            <NavBody
              isDarkTheme={isDarkTheme}
              onThemeChange={onThemeChange}
              navLinks={navLinks}
            />
          </div>
        </div>
      </div>
      <NavMobileMenu isMenuOpen={menuState} navLinks={navLinks} />
    </nav>
  );
}

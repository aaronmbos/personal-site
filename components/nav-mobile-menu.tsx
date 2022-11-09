import NavMobileLink from "./nav-mobile-link";
import { NavigationLink } from "./nav";
import { MaxSearchLength } from "../constants";
import { useRouter } from "next/router";

interface Props {
  isMenuOpen: boolean;
  navLinks: NavigationLink[];
}

export default function NavMobileMenu({ isMenuOpen, navLinks }: Props) {
  const router = useRouter();

  return (
    <div
      id="mobileMenu"
      className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navLinks.map((link) => {
          return (
            <NavMobileLink
              key={link.route}
              route={link.route}
              text={link.text}
            />
          );
        })}
        <input
          maxLength={MaxSearchLength}
          className="block mx-auto w-full dark:bg-stone-800 dark:text-white rounded-md dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0"
          type="search"
          placeholder="Search"
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              const query = (e.target as HTMLInputElement).value;

              router.push({
                pathname: "/search",
                query: {
                  q: encodeURIComponent(
                    query.substring(0, MaxSearchLength - 1)
                  ),
                },
              });
            }
          }}
        />
      </div>
    </div>
  );
}

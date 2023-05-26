import NavMobileLink from "./nav-mobile-link";
import { NavigationLink } from "./nav";
import { MaxSearchLength } from "../constants";
import Router, { useRouter } from "next/router";
import { ApiResponse, User } from "../types/api/types";

interface Props {
  isMenuOpen: boolean;
  navLinks: NavigationLink[];
  user?: User;
}

export default function NavMobileMenu({ isMenuOpen, navLinks, user }: Props) {
  const router = useRouter();

  async function handleLogout() {
    const res = (await (
      await fetch("/api/content/logout", {
        method: "POST",
      })
    ).json()) as ApiResponse<User>;

    if (res.isSuccess) {
      Router.push("/content/login");
    } else {
      console.error("Logout failed.");
    }
  }
  return (
    <div
      id="mobileMenu"
      className={`${isMenuOpen ? "block" : "hidden"} md:hidden`}
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
        {user && (
          <>
            <p
              onClick={() => Router.push("/content/posts")}
              aria-label="Content button"
              className="cursor-pointer dark:hover:bg-stone-900 hover:bg-blue-100 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium"
            >
              Content
            </p>
            <p
              onClick={handleLogout}
              aria-label="Logout button"
              className="cursor-pointer dark:hover:bg-stone-900 hover:bg-blue-100 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium"
            >
              Logout
            </p>
          </>
        )}
        <input
          maxLength={MaxSearchLength}
          className="block mx-auto w-full dark:bg-stone-800 dark:text-white rounded-md dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0"
          type="search"
          placeholder="Search posts"
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

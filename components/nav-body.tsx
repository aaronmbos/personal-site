import { NavigationLink } from "./nav";
import NavLink from "./nav-link";
import ThemeIcon from "./theme-icon";
import NavSearch from "./nav-search";
import { ApiResponse, User } from "../types/api/types";
import Router from "next/router";

interface Props {
  navLinks: NavigationLink[];
  user?: User;
}

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

export default function NavBody({ navLinks, user }: Props) {
  return (
    <>
      <div className="shrink-1 justify-between hidden md:flex sm:ml-10">
        <div className="flex flex-none space-x-4">
          {navLinks.map((link: NavigationLink) => {
            return (
              <NavLink key={link.route} route={link.route} text={link.text} />
            );
          })}
        </div>
      </div>
      <div className="flex-1 grow md:flex hidden md:justify-end px-4">
        <NavSearch />
      </div>
      <div className="mt-1 mr-5 flex flex-0">
        <ThemeIcon />
      </div>
      {user && (
        <div className="hidden md:flex">
          <div className="mt-1 flex flex-0">
            <button
              onClick={() => Router.push("/content/posts")}
              type="button"
              className="mr-1 hover:ring-2 ring-stone-400 dark:bg-stone-800 dark:hover:bg-stone-900 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 px-3 py-2 mt-1 rounded-md text-sm font-medium"
            >
              Content
            </button>
          </div>
          <div className="mt-1 flex flex-0">
            <button
              onClick={handleLogout}
              type="button"
              className="hover:ring-2 ring-stone-400 dark:bg-stone-800 dark:hover:bg-stone-900 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 px-3 py-2 mt-1 rounded-md text-sm font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}

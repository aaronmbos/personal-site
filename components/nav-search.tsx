import { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { MaxSearchLength } from "../constants";

export default function NavSearch() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (
        event.key === "/" &&
        document.activeElement !== searchInputRef.current
      ) {
        event.preventDefault();

        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  const router = useRouter();

  return (
    <input
      ref={searchInputRef}
      maxLength={MaxSearchLength}
      name="nav-search"
      className="lg:w-1/2 md:w-3/4 dark:bg-stone-800 dark:text-white rounded-md dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0"
      type="search"
      placeholder="Type / to search"
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          const query = (e.target as HTMLInputElement).value;

          router.push({
            pathname: "/search",
            query: {
              q: encodeURIComponent(
                query.trim().substring(0, MaxSearchLength - 1)
              ),
            },
          });
        }
      }}
    />
  );
}

import { useTheme } from "next-themes";
import { useState } from "react";

export default function ThemeIcon() {
  const themeIcons = {
    dark: "M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993 6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007 8.993 13.658 8.993 12 10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3zM4.219 18.363l2.12-2.122 1.415 1.414-2.12 2.122zM16.24 6.344l2.122-2.122 1.414 1.414-2.122 2.122zM6.342 7.759 4.22 5.637l1.415-1.414 2.12 2.122zm13.434 10.605-1.414 1.414-2.122-2.122 1.414-1.414z",
    light:
      "M20.742 13.045a8.088 8.088 0 0 1-2.077.271c-2.135 0-4.14-.83-5.646-2.336a8.025 8.025 0 0 1-2.064-7.723A1 1 0 0 0 9.73 2.034a10.014 10.014 0 0 0-4.489 2.582c-3.898 3.898-3.898 10.243 0 14.143a9.937 9.937 0 0 0 7.072 2.93 9.93 9.93 0 0 0 7.07-2.929 10.007 10.007 0 0 0 2.583-4.491 1.001 1.001 0 0 0-1.224-1.224zm-2.772 4.301a7.947 7.947 0 0 1-5.656 2.343 7.953 7.953 0 0 1-5.658-2.344c-3.118-3.119-3.118-8.195 0-11.314a7.923 7.923 0 0 1 2.06-1.483 10.027 10.027 0 0 0 2.89 7.848 9.972 9.972 0 0 0 7.848 2.891 8.036 8.036 0 0 1-1.484 2.059z",
  };

  const { theme, setTheme } = useTheme();

  const [iconState, setIconState] = useState(
    theme === "light" ? themeIcons.light : themeIcons.dark
  );

  return (
    <button
      onClick={() => {
        setTheme(theme === "light" ? "dark" : "light");
        setIconState(theme === "light" ? themeIcons.dark : themeIcons.light);
      }}
      aria-label="Toggle Dark Mode"
      type="button"
      className="w-9 h-9 bg-blue-50 rounded-lg dark:bg-stone-800 dark:bg-stone-900 flex items-center justify-center hover:ring-2 ring-stone-500 transition-all"
    >
      <svg
        className="w-4 h-4 fill-stone-800 dark:fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path id="theme-icon" d={iconState}></path>
      </svg>
    </button>
  );
}

import NavLink from "./nav-link";

export default function NavBody({ navLinks }) {
  return (
    <div className="hidden sm:block sm:ml-10">
      <div className="flex space-x-4">
        {navLinks.map((link) => {
          return (
            <NavLink key={link.route} route={link.route} text={link.text} />
          );
        })}
        <div className="flex">
          <select
            onChange={(e) =>
              e.target.value == "Dark"
                ? document.documentElement.classList.add("dark")
                : document.documentElement.classList.remove("dark")
            }
            className="ml-auto align-self-end dark:text-blue-300 dark:bg-stone-900 bg-blue-50 rounded-md text-blue-500 px-2"
          >
            <option>Light</option>
            <option>Dark</option>
            <option>System</option>
          </select>
        </div>
      </div>
    </div>
  );
}

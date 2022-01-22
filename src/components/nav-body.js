import NavLink from "./nav-link";
import ThemeIcon from "./theme-icon";

export default function NavBody({ navLinks }) {
  return (
    <div className="flex-1 justify-between hidden sm:flex sm:ml-10">
      <div className="flex flex-none space-x-4">
        {navLinks.map((link) => {
          return (
            <NavLink key={link.route} route={link.route} text={link.text} />
          );
        })}
      </div>
      <div className="flex-0 self-stretch">
        <ThemeIcon />
      </div>
    </div>
  );
}

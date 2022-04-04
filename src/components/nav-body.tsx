import { NavigationLink } from "./nav"
import NavLink from "./nav-link";
import ThemeIcon from "./theme-icon";

interface Props {
  navLinks: NavigationLink[]
}

export default function NavBody({ navLinks }: Props) {
  return (
    <>
      <div className="flex-1 justify-between hidden sm:flex sm:ml-10">
        <div className="flex flex-none space-x-4">
          {navLinks.map((link: NavigationLink) => {
            return (
              <NavLink key={link.route} route={link.route} text={link.text} />
            );
          })}
        </div>
      </div>
      <div className="mt-1 mr-5 flex flex-0">
        <ThemeIcon />
      </div>
    </>
  );
}

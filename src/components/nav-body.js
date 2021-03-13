import NavLink from "./nav-link";

export default function NavBody({ navLinks }) {
  return (
    <div className="hidden sm:block sm:ml-10">
      <div className="flex space-x-4">
        {navLinks.map((link) => {
          return <NavLink key={link.route} route={link.route} text={link.text} />;
        })}
      </div>
    </div>
  );
}

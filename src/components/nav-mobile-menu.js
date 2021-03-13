import NavMobileLink from "./nav-mobile-link";

export default function NavMobileMenu({ isMenuOpen, navLinks }) {
  return (
    <div
      id="mobileMenu"
      className={`${isMenuOpen ? "block" : "hidden"} sm:hidden`}
    >
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navLinks.map((link) => {
          return <NavMobileLink route={link.route} text={link.text} />;
        })}
      </div>
    </div>
  );
}

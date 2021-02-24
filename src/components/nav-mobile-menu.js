import Link from "next/link";

export default function NavMobileMenu({ isMenuOpen, navLinks }) {
  return (
    <div id="mobileMenu" className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1">
        {navLinks.map((link) => {
          return (
            <Link key={link.route} href={link.route}>
              <a className="hover:bg-blue-100 text-blue-500 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium">
                {link.text}
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
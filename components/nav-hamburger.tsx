interface Props {
  isMenuOpen: boolean;
  handleClick: () => void;
}

export default function NavHamburger({ isMenuOpen, handleClick }: Props) {
  return (
    <div className="flex items-center md:hidden">
      <button
        onClick={handleClick}
        className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none hover:ring-2 hover:ring-stone-400 transition-all"
        aria-expanded="false"
      >
        <span className="sr-only">Open main menu</span>
        <svg
          id="iconClosed"
          className={`${
            isMenuOpen ? "hidden" : "block"
          } h-6 w-6 fill-black dark:fill-white stroke-black dark:stroke-white`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          id="iconOpen"
          className={`${
            isMenuOpen ? "block" : "hidden"
          } h-6 w-6 fill-black dark:fill-white stroke-black dark:stroke-white`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export default function NavHamburger({ isMenuOpen, handleClick }) {
  return (
    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
      <button onClick={handleClick} className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg id="iconClosed" className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg id="iconOpen" className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke="black" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

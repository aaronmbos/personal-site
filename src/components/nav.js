import Link from 'next/link';

export default function Nav({ navLinks }) {
  return (
    <nav className="fixed min-w-full border-b-2 border-grey-400 h-20">
      <div className="min-w-full md:w-auto min-h-full flex items-stretch mx-auto px-1 sm:px-12 lg:px-20">
        <Link href="/">
          <div className="hover:text-gray-500 cursor-pointer text-xl font-mono font-semibold flex items-center flex-none px-2">
            &lt;Aaron &#47;&gt;
          </div>
        </Link>
        <div className="min-h-full px-3 flex flex-grow items-stretch justify-end">
          {navLinks.map((link) => {
              return (
                <Link href={link.route}>
                  <div className="hover:text-gray-500 cursor-pointer px-3 flex-initial flex items-center">
                    {link.text}
                  </div>
                </Link>
              );
          })}
        </div>
      </div>
    </nav>
  )
}
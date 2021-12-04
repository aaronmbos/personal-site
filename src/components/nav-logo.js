import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="flex-shrink-0 flex items-center">
      <Link href="/">
        <a className="hover:text-blue-700 text-blue-500 cursor-pointer text-2xl font-mono font-bold flex items-center flex-none px-2">
          &lt;Aaron Bos&#47;&gt;
        </a>
      </Link>
    </div>
  );
}

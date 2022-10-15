import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="shrink-0 md:flex md:items-center">
      <Link href="/">
        <a className="dark:text-blue-300 dark:hover:text-blue-100 hover:text-blue-700 text-blue-500 cursor-pointer text-2xl font-mono font-bold flex items-center flex-none px-2">
          &lt;Aaron Bos&#47;&gt;
        </a>
      </Link>
    </div>
  );
}

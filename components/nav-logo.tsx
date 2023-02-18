import Link from "next/link";

export default function NavLogo() {
  return (
    <div className="shrink-0 md:flex md:items-center">
      <Link
        className={`dark:text-blue-300 dark:hover:text-blue-100 hover:text-blue-700 text-blue-500 cursor-pointer text-2xl font-mono font-semibold flex items-center flex-none px-2`}
        href="/"
      >
        &lt;Aaron Bos&#47;&gt;
      </Link>
    </div>
  );
}

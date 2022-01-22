import Link from "next/link";

export default function NavLink({ route, text }) {
  return (
    <Link href={route}>
      <a className="dark:bg-stone-800 dark:hover:bg-stone-900 hover:bg-blue-50 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 px-3 py-2 mt-1 rounded-md text-sm font-medium">
        {text}
      </a>
    </Link>
  );
}

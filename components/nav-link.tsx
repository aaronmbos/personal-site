import Link from "next/link";

interface Props {
  route: string;
  text: string;
}

export default function NavLink({ route, text }: Props) {
  return (
    <Link href={route}>
      <a className="hover:ring-2 ring-stone-400 dark:bg-stone-800 dark:hover:bg-stone-900 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 px-3 py-2 mt-1 rounded-md text-sm font-medium">
        {text}
      </a>
    </Link>
  );
}

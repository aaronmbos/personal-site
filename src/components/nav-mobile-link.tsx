import Link from "next/link";

interface Props {
  route: string;
  text: string;
}

export default function NavMobileLink({ route, text }: Props) {
  return (
    <Link href={route}>
      <a className="dark:hover:bg-stone-900 hover:bg-blue-100 text-blue-500 dark:text-blue-300 hover:text-blue-700 dark:hover:text-blue-100 block px-3 py-2 rounded-md text-base font-medium">
        {text}
      </a>
    </Link>
  );
}

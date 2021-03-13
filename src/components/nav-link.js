import Link from "next/link";

export default function NavLink({ route, text }) {
  return (
    <Link key={route} href={route}>
      <a className="bg-blue-100 text-blue-500 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium">
        {text}
      </a>
    </Link>
  );
}

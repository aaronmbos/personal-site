import Link from "next/link";

export default function NavMobileLink({ route, text }) {
  return (
    <Link key={route} href={route}>
      <a className="hover:bg-blue-100 text-blue-500 hover:text-blue-700 block px-3 py-2 rounded-md text-base font-medium">
        {text}
      </a>
    </Link>
  );
}

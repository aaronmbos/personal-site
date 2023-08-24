import Link from "next/link";

interface Props {
  tag: string;
}

export default function Tag({ tag }: Props) {
  return (
    <Link
      href={`/search?q=${encodeURIComponent(`tag:${tag}`)}`}
      className="inline-block my-1 mr-1 py-1.5 px-2 rounded-md text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 text-sm
      dark:hover:ring-2 dark:hover:bg-stone-900 dark:hover:text-blue-100 dark:ring-stone-400"
    >
      {`#${tag}`}
    </Link>
  );
}

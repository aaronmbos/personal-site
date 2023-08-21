import Link from "next/link";

interface Props {
  tag: string;
}

export default function Tag({ tag }: Props) {
  return (
    <Link
      href={`/search?q=${encodeURIComponent(`${tag}`)}&a=metadata`}
      className="inline-block my-1 mr-1 py-1.5 px-2 rounded-md text-white dark:bg-neutral-900 bg-blue-800 text-sm
      hover:ring-2 dark:hover:bg-stone-900 dark:hover:text-blue-100 ring-stone-400"
    >
      {`#${tag}`}
    </Link>
  );
}

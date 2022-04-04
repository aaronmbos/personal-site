import Link from "next/link";

interface Props {
  text: string
}

export default function AllPostsLink({ text }: Props) {
  return (
    <div className="mb-10">
      <Link href="/posts">
        <a className="underline dark:text-white text-black">{text}</a>
      </Link>
    </div>
  );
}

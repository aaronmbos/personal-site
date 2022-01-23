import Link from "next/link";

export default function AllPostsLink({ text }) {
  return (
    <div className="mb-10">
      <Link href="/posts">
        <a className="underline dark:text-white text-black">{text}</a>
      </Link>
    </div>
  );
}

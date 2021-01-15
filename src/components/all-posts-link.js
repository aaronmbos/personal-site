import Link from "next/link";

export default function AllPostsLink({ text }) {
  return (
    <div className="mb-10">
      <Link href="/posts">
        <a className="hover:underline text-blue-600">{text}</a>
      </Link>
    </div>
  );
}
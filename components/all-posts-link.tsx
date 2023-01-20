import Link from "next/link";

interface Props {
  text: string;
}

export default function AllPostsLink({ text }: Props) {
  return (
    <div className="mb-10">
      <Link className="underline dark:text-white text-black" href="/posts">
        {text}
      </Link>
    </div>
  );
}

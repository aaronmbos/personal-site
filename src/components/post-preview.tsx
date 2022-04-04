import TagHolder from "./tag-holder";
import Link from "next/link";
import { PostMetadata } from "../lib/posts";

interface Props {
  id: number,
  slug: string,
  title: string,
  description: string,
  date: string,
  metadata: PostMetadata[]
}

export default function PostPreview({
  slug,
  title,
  description,
  date,
  metadata,
}: Props) {
  return (
    <>
      <div className="py-6 px-3">
        <Link href={`/posts/${slug}`}>
          <a className="dark:text-blue-400 text-blue-600 cursor-pointer hover:underline font-semibold text-lg">
            {title}
          </a>
        </Link>
        <div className="my-2 italic dark:text-gray-300 text-gray-600">
          {description}
        </div>
        <div className="mb-2 text-gray-500 dark:text-gray-100">{date}</div>
        {metadata.length > 0 && <TagHolder tags={metadata} />}
      </div>
      <hr />
    </>
  );
}

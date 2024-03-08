import TagHolder from "./tag-holder";
import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
}

export default function PostPreview({
  slug,
  title,
  description,
  date,
  tags,
}: Props) {
  return (
    <>
      <div className="py-6 px-3">
        <Link
          className="dark:text-blue-400 text-blue-600 cursor-pointer hover:underline font-semibold text-lg"
          href={`/posts/${slug}`}
        >
          {title}
        </Link>
        <div className="my-2 italic dark:text-gray-300 text-gray-600">
          {description}
        </div>
        <div className="mb-2 text-gray-500 dark:text-gray-100">{date}</div>
        {tags.length > 0 && <TagHolder tags={tags} />}
      </div>
      <hr />
    </>
  );
}

import TagHolder from './tag-holder';
import Link from 'next/link';

export default function PostPreview({ url_id, title, description, date, metadata }) {
  return (
    <>
      <div className="py-6 px-3">
        <Link href={`/posts/${url_id}`}>
          <a className="text-blue-600 cursor-pointer hover:underline font-semibold text-lg">{title}</a>
        </Link>
        <div className="my-2 italic text-gray-600">{description}</div>
        <div className="mb-2 text-gray-500">Published: {date}</div>
        {metadata.length > 0 && <TagHolder tags={metadata} />}
      </div>
      <hr />
    </>
  );
}
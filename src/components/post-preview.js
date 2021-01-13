import TagHolder from './tag-holder';
import Link from 'next/link';

export default function PostPreview({ url_id, title, description, date, metadata }) {
  return (
    <>
      <div className="py-6 px-3">
        <Link href={`/posts/${url_id}`}>
          <a className="cursor-pointer hover:underline hover:text-blue-700 font-semibold text-lg">{date}: {title}</a>
        </Link>
        <div className="text-gray-600">{description}</div>
        {metadata.length > 0 && <TagHolder tags={metadata} />}
      </div>
      <hr />
    </>
  );
}
export default function PostPreview({ id, title, description, date }) {
  return (
    <>
      <div className="py-6 px-3 group cursor-pointer">
        <div className="group-hover:underline group-hover:text-blue-700 font-semibold text-lg">{date}: {title}</div>
        <div className="text-gray-600">{description}</div>
      </div>
      <hr />
    </>
  );
}
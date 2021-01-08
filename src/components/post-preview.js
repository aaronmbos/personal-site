export default function PostPreview({ id, title, description, date }) {
  return (
    <>
      <div className="py-3 px-3 hover:bg-gray-50 cursor-pointer">
        <div className="font-semibold text-lg">{date}: <span className="underline">{title}</span></div>
        <div className="">{description}</div>
      </div>
      <hr />
    </>
  );
}
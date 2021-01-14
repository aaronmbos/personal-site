export default function PostHeader({ title, description, date }) {
  return (
    <>
      <h1 className="mb-2 font-semibold text-2xl">{title}</h1>
      <h2 className="mb-2 text-lg italic">{description}</h2>
      <p className="mb-2 text-gray-600">Published: {date}</p>
      <hr />
    </>
  );
}
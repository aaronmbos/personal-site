export default function Tag({ tag }) {
  return (
    <div className="inline-block my-1 mr-1 py-0.5 px-1.5 rounded-md text-white bg-blue-800 text-sm">
      {`#${tag}`}
    </div>
  );
}

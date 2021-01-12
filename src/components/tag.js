export default function Tag({ tag }) {
  return (
    <div className="inline-block mx-1 py-0.5 px-1.5 rounded-md text-white bg-purple-600 text-sm">
      {`#${tag}`}
    </div>
  )
}
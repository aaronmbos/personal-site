export default function PostBody({ content }) {
  return (
    <article className="mt-6" dangerouslySetInnerHTML={{ __html: content }}>
    </article>
  );
}
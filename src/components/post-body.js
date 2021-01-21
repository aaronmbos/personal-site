export default function PostBody({ content }) {
  return (
    <article className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: content }}>
    </article>
  );
}
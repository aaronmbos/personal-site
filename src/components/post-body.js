export default function PostBody({ content }) {
  return (
    <article className="prose mt-6" dangerouslySetInnerHTML={{ __html: content }}>
    </article>
  );
}
interface Props {
  content: string
}

export default function PostBody({ content }: Props) {
  return (
    <article
      className="prose dark:prose-invert max-w-none mt-6"
      dangerouslySetInnerHTML={{ __html: content }}
    ></article>
  );
}

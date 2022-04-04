interface Props {
  title: string,
  description: string,
  date: string
}

export default function PostHeader({ title, description, date }: Props) {
  return (
    <>
      <h1 className="mb-2 font-semibold text-3xl">{title}</h1>
      <h2 className="mb-2 text-md italic">{description}</h2>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-100">
        Aaron Bos | {date}
      </p>
      <hr />
    </>
  );
}

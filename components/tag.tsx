interface Props {
  tag: string;
}

export default function Tag({ tag }: Props) {
  return (
    <div className="inline-block my-1 mr-1 py-1.5 px-2 rounded-md text-white dark:bg-neutral-900 bg-blue-800 text-sm">
      {`#${tag}`}
    </div>
  );
}

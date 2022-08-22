interface Props {
  path: string | string[];
  fill: string;
  id?: string;
  classList?: string[];
}

export default function ButtonIcon({ path, fill, id, classList }: Props) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill={fill}
      className={`inline ${classList?.join(" ")}`}
    >
      {Array.isArray(path) ? (
        path.map((p) => <path key={p} d={p} />)
      ) : (
        <path d={path} />
      )}
    </svg>
  );
}

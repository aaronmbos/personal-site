interface Props {
  path: string | string[];
  fill: string;
  id?: string;
  classList?: string[];
  dimensions: [height: number, width: number];
}

export default function ButtonIcon({
  path,
  fill,
  id,
  classList,
  dimensions,
}: Props) {
  return (
    <svg
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      width={dimensions[1]}
      height={dimensions[0]}
      viewBox={`0 0 ${dimensions[1]} ${dimensions[0]}`}
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

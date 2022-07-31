interface Props {
  path: string;
  fill: string;
}

export default function ButtonIcon({ path, fill }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      fill={fill}
      viewBox="0 0 17 17"
      className="inline"
    >
      <path d={path} />
    </svg>
  );
}

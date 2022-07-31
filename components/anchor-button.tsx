interface Props {
  href: string;
  children?: JSX.Element | JSX.Element[];
}

export default function AnchorButton({ href, children }: Props) {
  return (
    <a
      className="mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-800 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
}

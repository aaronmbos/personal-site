import Tag from "./tag";

interface Props {
  tags: string[];
}

export default function TagHolder({ tags }: Props) {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => {
        return <Tag key={tag} tag={tag} />;
      })}
    </div>
  );
}

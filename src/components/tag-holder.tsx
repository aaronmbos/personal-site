import Tag from "./tag";

interface PostTag {
  id: number;
  tag: string;
}

interface Props {
  tags: PostTag[];
}

export default function TagHolder({ tags }: Props) {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => {
        return <Tag key={tag.id} tag={tag.tag} />;
      })}
    </div>
  );
}

import Tag from "./tag";
import { PostMetadata } from "../lib/posts";

interface Props {
  tags: PostMetadata[];
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

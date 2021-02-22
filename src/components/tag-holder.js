import Tag from "./tag";

export default function TagHolder({ tags }) {
  return (
    <div className="flex flex-wrap">
      {tags.map((tag) => {
        return <Tag key={tag.id} tag={tag.tag} />
      })}
    </div>
  );
}
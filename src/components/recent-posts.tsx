import PostPreview from "./post-preview";
import { BlogPost } from "../lib/posts";

interface Props {
  recentPosts: Pick<BlogPost, "id" | "slug" | "description" | "date" | "metadata" | "title">[]
}

export default function RecentPosts({ recentPosts }: Props) {
  return (
    <div className="my-3">
      <h3 className="pt-6 text-xl font-semibold pb-3">Recent Posts</h3>
      <hr />
      {recentPosts.map((post) => {
        return <PostPreview key={post.id} {...post} />;
      })}
    </div>
  );
}

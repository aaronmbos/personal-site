import PostPreview from "./post-preview";
import { BlogPost } from "../lib/posts";

interface Props {
  recentPosts: Pick<
    BlogPost,
    "id" | "slug" | "description" | "date" | "tags" | "title"
  >[];
}

export default function RecentPosts({ recentPosts }: Props) {
  return (
    <div className="dark:bg-stone-800 bg-gray-50 my-3">
      <h3 className="pt-6 text-xl font-semibold pb-3">Recent Posts</h3>
      <hr />
      {recentPosts.map((post) => {
        return <PostPreview key={post.id} {...post} />;
      })}
    </div>
  );
}

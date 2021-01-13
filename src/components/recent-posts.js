import PostPreview from "./post-preview";

export default function RecentPosts({ recentPosts }) {
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

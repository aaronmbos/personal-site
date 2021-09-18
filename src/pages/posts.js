import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import { getAllPosts } from "../lib/posts";
import Head from "next/head";

export default function Posts({ posts }) {
  return (
    <>
      <Head>
        <title>Aaron Bos - Blog Posts</title>
      </Head>
      <Layout>
        <section className="mb-10">
          <h1 className="mb-4 font-semibold text-2xl">All Blog Posts</h1>
          <hr />
          {posts.map((post) => {
            return <PostPreview key={post.id} {...post} />;
          })}
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

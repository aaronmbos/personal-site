import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import { getAllPosts, getPaginatedPosts, BlogPost } from "../lib/posts";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useState } from "react";

interface Props {
  posts: BlogPost[];
}

export default function Posts({ posts }: Props) {
  const [page, setPage] = useState(1);

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
        {/* TODO: Add paging component */}
        <button
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Forward
        </button>
        <button
          onClick={() => {
            setPage(page - 1);
          }}
        >
          Back
        </button>
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPaginatedPosts(1, 15);
  return {
    props: {
      posts,
    },
  };
};

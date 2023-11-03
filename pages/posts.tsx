import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import { getPaginatedPosts, BlogPost } from "../lib/posts";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

interface Props {
  posts: BlogPost[];
  page: number;
}

export default function Posts({ posts, page }: Props) {
  const router = useRouter();

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
            router.push({
              pathname: "/posts",
              query: { page: page + 1 },
            });
          }}
        >
          Forward
        </button>
        <button
          onClick={() => {
            router.push({
              pathname: "/posts",
              query: { page: page - 1 },
            });
          }}
        >
          Back
        </button>
      </Layout>
    </>
  );
}

export const getServerSideProps = (async ({ res, query }) => {
  const page = parseInt(query["page"] as string) || 1;
  const posts = await getPaginatedPosts(page, 15);
  return {
    props: {
      posts,
      page,
    },
  };
}) satisfies GetServerSideProps<Props>;

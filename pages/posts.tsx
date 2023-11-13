import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import { getPaginatedPosts, BlogPost } from "../lib/posts";
import Head from "next/head";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import PaginationRow from "../components/pagination-row";
import useSWR from "swr";
import { ApiResponse, Paged, SlimPost } from "../types/api/types";

interface Props {
  posts: BlogPost[];
  limit: number;
}

export default function Posts({ posts, limit }: Props) {
  const router = useRouter();
  const pageParam = router.query.page
    ? parseInt(router.query.page as string) || 1
    : 1;

  const getPostsForPage = async () => {
    if (pageParam !== 1) {
      const response = await fetch(`/api/post/page/${pageParam}`, {
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });
      const results = (await response.json()) as ApiResponse<Paged<SlimPost>>;

      return results.data.data;
    } else {
      return posts;
    }
  };

  const { data, error, isLoading } = useSWR(
    `/api/post?page=${pageParam}`,
    getPostsForPage
  );

  return (
    <>
      <Head>
        <title>Aaron Bos - Blog Posts</title>
      </Head>
      <Layout>
        <section className="mb-10">
          <h1 className="mb-4 font-semibold text-2xl">All Blog Posts</h1>
          <hr />
          {isLoading && pageParam !== 1 ? (
            <div>Loading ...</div>
          ) : (
            data &&
            data.map((post) => {
              return <PostPreview key={post.id} {...post} />;
            })
          )}
        </section>
        <PaginationRow page={pageParam} limit={limit} />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data, limit } = await getPaginatedPosts(1, 15);

  return {
    props: {
      posts: data,
      limit,
    },
  };
};

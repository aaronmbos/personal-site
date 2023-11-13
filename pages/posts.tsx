import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import Head from "next/head";
import { useRouter } from "next/router";
import PaginationRow from "../components/pagination-row";
import useSWR from "swr";
import { ApiResponse, Paged, SlimPost } from "../types/api/types";
import LoadingSpinner from "../components/loading-spinner";

export default function Posts() {
  const router = useRouter();
  const pageParam = router.query.page
    ? parseInt(router.query.page as string) || 1
    : 1;

  const getPostsForPage = async () => {
    const response = await fetch(`/api/post/page/${pageParam}`, {
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });
    const results = (await response.json()) as ApiResponse<Paged<SlimPost>>;

    if (results?.isSuccess) {
      return results.data;
    } else {
      throw new Error(
        results?.message ?? "An error occurred while getting posts."
      );
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
          {isLoading ? (
            <div className="text-center font-bold my-3">
              Loading posts
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center my-2 text-red-500 dark:text-red-300">
              {error.message}
            </div>
          ) : (
            data && (
              <>
                {data.data.map((post) => {
                  return <PostPreview key={post.id} {...post} />;
                })}
                <PaginationRow page={pageParam} limit={data.limit} />
              </>
            )
          )}
        </section>
      </Layout>
    </>
  );
}

import Layout from "../components/layout";
import PostPreview from "../components/post-preview";
import { getPaginatedPosts, BlogPost } from "../lib/posts";
import Head from "next/head";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
} from "next";
import { useRouter } from "next/router";
import PaginationRow from "../components/pagination-row";
import { useEffect } from "react";
import useSWR from "swr";
import { ApiResponse, Paged, SlimPost } from "../types/api/types";
import { Post } from "../types/database/types";

interface Props {
  posts: BlogPost[];
  page: number;
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

      if (results.isSuccess) {
        console.log("success");
      }
      return results.data.data;
    }
  };

  const { data, error, isLoading } = useSWR(
    pageParam === 1 ? null : `/api/post?page=${pageParam}`,
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
            <div>Loading ...</div>
          ) : data ? (
            data.map((post) => {
              return <PostPreview key={post.id} {...post} />;
            })
          ) : (
            posts.map((post) => {
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
  const page = 1;
  const { data, limit } = await getPaginatedPosts(page, 15);

  return {
    props: {
      posts: data,
      limit,
    },
  };
};

//export async function getServerSideProps(context: GetServerSidePropsContext) {
//  const page = parseInt(context.query["page"] as string) || 1;
//  const { data, limit } = await getPaginatedPosts(page, 15);
//  return {
//    props: {
//      posts: data,
//      page,
//      limit,
//    },
//  };
//}

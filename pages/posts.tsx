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

interface Props {
  posts: BlogPost[];
  page: number;
  limit: number;
}

export default function Posts({ posts, page, limit }: Props) {
  const router = useRouter();
  const pageParam = router.query.page
    ? parseInt(router.query.page as string) || 1
    : 1;

  const getPostsForPage = async () => {
    if (pageParam !== 1) {
      console.log("Fetching posts for page " + pageParam);
    }
  };

  const { data, error, isLoading } = useSWR(
    pageParam === 1 ? null : `/api/posts/page/${pageParam}`,
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
          {posts.map((post) => {
            return <PostPreview key={post.id} {...post} />;
          })}
        </section>
        <PaginationRow page={page} limit={limit} />
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
      page,
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

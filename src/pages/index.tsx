import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import RecentPosts from "../components/recent-posts";
import { getRecentPosts, BlogPost } from "../lib/posts";
import AllPostsLink from "../components/all-posts-link";
import { GetStaticProps } from "next";

interface Props {
  recentPosts: BlogPost[]
}

export default function Home({ recentPosts }: Props) {
  return (
    <>
      <Head>
        <title>Aaron Bos</title>
      </Head>
      <Layout>
        <section>
          <Intro />
          <RecentPosts recentPosts={recentPosts} />
        </section>
        <AllPostsLink text="See All Posts" />
      </Layout>
    </>
  );
}

export const getStaticProps : GetStaticProps = async () => {
  const recentPosts = await getRecentPosts();
  return {
    props: { recentPosts }
  };
}

import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import RecentPosts from "../components/recent-posts";
import { getRecentPosts } from "../lib/posts";
import AllPostsLink from "../components/all-posts-link";

export default function Home({ recentPosts }) {
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

export async function getStaticProps() {
  const recentPosts = await getRecentPosts();
  return {
    props: {
      recentPosts,
    },
  };
}

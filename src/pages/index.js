import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import RecentPosts from "../components/recent-posts";
import { getRecentPosts } from "../lib/posts";

export default function Home({ recentPosts }) {
  return (
    <>
      <Head>
        <title>Aaron's Blog</title>
      </Head>
      <Layout>
        <section className="max-w-screen-lg mx-auto px-16 md:px-32">
          <Intro />
          <RecentPosts recentPosts={recentPosts} />   
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const recentPosts = getRecentPosts();
  return {
    props: {
      recentPosts,
    },
  };
}

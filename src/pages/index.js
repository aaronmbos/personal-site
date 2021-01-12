import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import RecentPosts from "../components/recent-posts";
import { getRecentPosts } from "../lib/posts";
import Link from "next/link"

export default function Home({ recentPosts }) {
  return (
    <>
      <Head>
        <title>Aaron's Blog</title>
      </Head>
      <Layout>
        <section>
          <Intro />
          <RecentPosts recentPosts={recentPosts} />
        </section>
        <div className="mx-3 mb-6">
        <Link href="">
          <a className="hover:underline text-blue-600">See all posts</a>
        </Link>
      </div>
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

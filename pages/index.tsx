import Head from "next/head";
import Layout from "../components/layout";
import Intro from "../components/intro";
import RecentPosts from "../components/recent-posts";
import { getRecentPosts, BlogPost } from "../lib/posts";
import AllPostsLink from "../components/all-posts-link";
import { GetStaticProps } from "next";
import MetaSocial from "../components/meta-social";

interface Props {
  recentPosts: BlogPost[];
}

export default function Home({ recentPosts }: Props) {
  return (
    <>
      <Head>
        <title>Aaron Bos</title>
      </Head>
      <MetaSocial
        title="Aaron Bos' Blog"
        url={`${process.env.NEXT_PUBLIC_ORIGIN}`}
        description="Blogging about software and technology from a software engineer's perspective."
        image={`${process.env.NEXT_PUBLIC_ORIGIN}/static/card-logo.png`}
      />
      <Layout>
        <section>
          <Intro />
          <RecentPosts recentPosts={recentPosts} />
        </section>
        <AllPostsLink text="See all posts" />
      </Layout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const recentPosts = await getRecentPosts();
  return {
    props: { recentPosts },
  };
};

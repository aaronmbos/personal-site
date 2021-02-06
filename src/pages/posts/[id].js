import { getAllPosts, getPostByUrlId } from "../../lib/posts";
import Layout from "../../components/layout";
import { parseMarkdownToHtml } from "../../lib/markdown-parser";
import PostHeader from "../../components/post-header";
import PostBody from "../../components/post-body";
import PostFooter from "../../components/post-footer";
import Head from "next/head";
import AllPostsLink from "../../components/all-posts-link";
import MetaSocial from "../../components/meta-social";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <MetaSocial
        title={post.title}
        url={`${process.env.NEXT_PUBLIC_ORIGIN}/posts/${post.slug}`}
        description={post.description}
        image={`${process.env.NEXT_PUBLIC_ORIGIN}/static/card-logo.png`}
      />
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
      />
      <PostBody content={post.content} />
      <PostFooter />
      <AllPostsLink text="See More Posts" />
    </Layout>
  ) 
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.slug },
  }))

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostByUrlId(params.id);
  const parsedContent = await parseMarkdownToHtml(post.content);
  post.content = parsedContent;
  return {
    props: {
      post,
    },
  };
}

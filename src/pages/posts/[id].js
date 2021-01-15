import { getAllPosts, getPostByUrlId } from "../../lib/posts";
import Layout from "../../components/layout";
import { parseMarkdownToHtml } from "../../lib/markdown-parser";
import PostHeader from "../../components/post-header";
import PostBody from "../../components/post-body";
import PostFooter from "../../components/post-footer";
import Head from "next/head";
import AllPostsLink from "../../components/all-posts-link";

export default function Post({ post }) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
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

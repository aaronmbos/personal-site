import { getAllPosts, getPostByUrlId, BlogPost } from "../../lib/posts";
import Layout from "../../components/layout";
import { parseMarkdownToHtml } from "../../lib/markdown-parser";
import PostHeader from "../../components/post-header";
import PostBody from "../../components/post-body";
import PostFooter from "../../components/post-footer";
import Head from "next/head";
import AllPostsLink from "../../components/all-posts-link";
import MetaSocial from "../../components/meta-social";
import { GetStaticProps } from "next";

interface Props {
  post: BlogPost
}

function getPostUrl(slug: string) {
  return `${process.env.NEXT_PUBLIC_ORIGIN}/posts/${slug}`;
}

export default function Post({ post }: Props) {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <MetaSocial
        title={post.title}
        url={getPostUrl(post.slug)}
        description={post.description}
        image={`${process.env.NEXT_PUBLIC_ORIGIN}/static/card-logo.png`}
      />
      <PostHeader
        title={post.title}
        description={post.description}
        date={post.date}
      />
      <PostBody content={post.content} />
      <PostFooter url={getPostUrl(post.slug)} />
      <AllPostsLink text="See More Posts" />
    </Layout>
  );
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.slug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps : GetStaticProps = async ({ params }) => {
  const post = await getPostByUrlId(params?.id as string);
  const parsedContent = await parseMarkdownToHtml(post.content);
  post.content = parsedContent;
  return {
    props: {
      post,
    },
  };
}

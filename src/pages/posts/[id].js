import { getAllPosts, getPostByUrlId } from "../../lib/posts";
import Layout from "../../components/layout";

export default function Post({ post }) {
  return (
    <Layout>
      <h3>{post.title}</h3>
      <h4>{post.description}</h4>
    </Layout>
  ) 
}

export async function getStaticPaths() {
  const posts = await getAllPosts();
  const paths = posts.map((post) => ({
    params: { id: post.url_id },
  }))

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const post = await getPostByUrlId(params.id);

  return {
    props: {
      post,
    },
  };
}

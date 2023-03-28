import Head from "next/head";
import Layout from "../../components/layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { User } from "../../types/api/types";
import { getPostTable, PostTableRow } from "../../lib/content";
import Link from "next/link";

export default function Posts({
  user,
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>Manage Posts</Head>
      <Layout user={user}>
        <h1>Manage Posts</h1>
        <table>
          <thead>
            <tr>
              <th>Slug</th>
              <th>Title</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.slug}</td>
                  <td>
                    <Link
                      className="dark:text-blue-400 text-blue-600 cursor-pointer hover:underline"
                      href={`/content/${post.id}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.createdAt}</td>
                  <td>{post.updatedAt}</td>
                  <td>{post.publishedAt ?? "Draft"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Layout>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader("location", "/content/login");
    res.statusCode = 302;
    res.end();

    return {
      props: {
        user: { isLoggedIn: false, username: "" } as User,
        posts: [] as PostTableRow[],
      },
    };
  }

  return {
    props: { user: req.session.user, posts: await getPostTable() },
  };
},
sessionOptions);

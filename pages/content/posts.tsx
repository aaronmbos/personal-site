import Head from "next/head";
import Layout from "../../components/layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { User } from "../../types/api/types";
import { getPostTable, PostTableRow } from "../../lib/content";

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
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td>{post.title}</td>
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

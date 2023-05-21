import Head from "next/head";
import Layout from "../../components/layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { User } from "../../types/api/types";
import { getPostTable, PostTableRow } from "../../lib/content";
import Link from "next/link";
import Router from "next/router";

export default function Posts({
  user,
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  function handleSubmit() {
    Router.push("/content/new-post");
  }

  return (
    <>
      <Head>Manage Posts</Head>
      <Layout user={user} isWide={true}>
        <h1 className="text-2xl">Manage Posts</h1>
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            type="button"
            className="px-4 py-1 mb-2 flex items-center justify-center text-sm text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 hover:border-0 hover:ring-2 dark:ring-stone-400"
          >
            New Post
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Slug</th>
              <th>Title</th>
              <th>Created</th>
              <th>Updated</th>
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
                  <td>
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(post.createdAt)
                    )}
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(post.updatedAt)
                    )}
                  </td>
                  <td>
                    {post.publishedAt
                      ? new Intl.DateTimeFormat("en-US").format(
                          new Date(post.publishedAt)
                        )
                      : "Draft"}
                  </td>
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

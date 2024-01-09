import Head from "next/head";
import Layout from "../../components/layout";
import { SessionData, sessionOptions } from "../../lib/session";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { User } from "../../types/api/types";
import { getPostTable, PostTableRow } from "../../lib/content";
import Link from "next/link";
import Router from "next/router";
import { getIronSession } from "iron-session";

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
        <div className="flex justify-between mb-6 pb-4 border-b-2 dark:border-stone-600 border-stone-800">
          <h1 className="mb-2 font-semibold text-3xl inline-block">
            Manage Posts
          </h1>
          <button
            onClick={handleSubmit}
            type="button"
            className="px-4 py-2 mb-2 flex items-center justify-center text-sm text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 hover:border-0 hover:ring-2 dark:ring-stone-400"
          >
            New Post
          </button>
        </div>
        <table className="border-collapse table-auto">
          <thead>
            <tr>
              <th>Title</th>
              <th className="hidden md:table-cell">Slug</th>
              <th className="hidden md:table-cell">Created</th>
              <th className="hidden md:table-cell">Updated</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => {
              return (
                <tr key={post.id}>
                  <td className="border-b border-slate-100 dark:border-stone-600 p-3">
                    <Link
                      className="dark:text-blue-400 text-blue-600 cursor-pointer hover:underline"
                      href={`/content/${post.id}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="border-b border-slate-100 dark:border-stone-600 p-3 hidden md:table-cell">
                    {post.slug}
                  </td>
                  <td className="border-b border-slate-100 dark:border-stone-600 p-3 hidden md:table-cell">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(post.createdAt)
                    )}
                  </td>
                  <td className="border-b border-slate-100 dark:border-stone-600 p-3 hidden md:table-cell">
                    {new Intl.DateTimeFormat("en-US").format(
                      new Date(post.updatedAt)
                    )}
                  </td>
                  <td className="border-b border-slate-100 dark:border-stone-600 p-3">
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

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext) => {
  const { user } = await getIronSession<SessionData>(req, res, sessionOptions);

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
    props: { user: user, posts: await getPostTable() },
  };
};

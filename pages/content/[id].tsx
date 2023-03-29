import Head from "next/head";
import Layout from "../../components/layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { User } from "../../types/api/types";
import { getPostById, PostContent } from "../../lib/content";
import { FormEvent } from "react";

export default function Posts({
  user,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submitted dawg");
  }

  return (
    <>
      <Head>{post.title}</Head>
      <Layout user={user}>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between flex-wrap">
            <div className="flex-1">
              <label htmlFor="title" className="block">
                Title
              </label>
              <input
                className="my-3 w-5/6 dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
                name="title"
                id="title"
                type="text"
                defaultValue={post.title}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="slug" className="block">
                Slug
              </label>
              <input
                className="my-3 w-5/6 dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
                name="slug"
                id="slug"
                type="text"
                defaultValue={post.slug}
              />
            </div>
          </div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            className="h-40 my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
            name="description"
            id="description"
            defaultValue={post.description}
          />
          <label htmlFor="Content" className="block">
            Content
          </label>
          <textarea
            className="h-screen my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
            name="content"
            id="content"
            defaultValue={post.content}
          />
          <button
            className="px-10 flex shrink items-center justify-center text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 w-11 h-11 my-5 hover:border-0 hover:ring-2 dark:ring-stone-400"
            type="submit"
          >
            Save
          </button>
        </form>
      </Layout>
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  params,
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
        post: {} as PostContent,
      },
    };
  }

  return {
    props: {
      user: req.session.user,
      post: await getPostById(params!.id as string),
    },
  };
},
sessionOptions);

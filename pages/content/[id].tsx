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
  }

  return (
    <>
      <Head>Manage Posts</Head>
      <Layout user={user}>
        <form onSubmit={handleSubmit}></form>
        <div>{post.title}</div>
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

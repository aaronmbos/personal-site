import Head from "next/head";
import { User } from "../../types/api/types";
import Layout from "../../components/layout";
import PostForm from "../../components/post-form";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { withIronSessionSsr } from "iron-session/next";
import { FormEvent } from "react";
import Router from "next/router";

export default function NewPost({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await (
      await fetch(`/api/content/posts`, {
        method: "POST",
        body: JSON.stringify({
          title: event.currentTarget.postTitle.value,
          slug: event.currentTarget.slug.value,
          description: event.currentTarget.description.value,
          content: event.currentTarget.content.value,
          tags: event.currentTarget.tags.value.split(","),
        }),
      })
    ).json();

    if (res.isSuccess) {
      Router.push(`/content/${res.data}`);
    } else {
      console.log(res.message);
    }
  }

  return (
    <>
      <Head>Create New Post</Head>
      <Layout user={user} isWide={true}>
        <PostForm onSubmit={handleSubmit} />
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
      },
    };
  }

  return {
    props: {
      user: req.session.user,
    },
  };
},
sessionOptions);

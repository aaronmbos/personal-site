import Head from "next/head";
import { User } from "../../types/api/types";
import Layout from "../../components/layout";
import PostForm from "../../components/post-form";
import { SessionData, sessionOptions } from "../../lib/session";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { FormEvent, useState } from "react";
import Router from "next/router";
import { getIronSession } from "iron-session";

export default function NewPost({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [postError, setPostError] = useState<string | undefined>(undefined);

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
      if (postError) {
        setPostError(undefined);
      }
      Router.push(`/content/${res.data}`);
    } else {
      setPostError(res.message);
    }
  }

  return (
    <>
      <Head>Create New Post</Head>
      <Layout user={user} isWide={true}>
        <PostForm submitError={postError} onSubmit={handleSubmit} />
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
      },
    };
  }

  return {
    props: {
      user: user,
    },
  };
};

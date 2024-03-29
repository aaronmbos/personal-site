import Head from "next/head";
import Layout from "../../components/layout";
import { SessionData, sessionOptions } from "../../lib/session";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { User } from "../../types/api/types";
import { getPostById, PostContent } from "../../lib/content";
import { FormEvent, useState } from "react";
import PostForm from "../../components/post-form";
import { getIronSession } from "iron-session";

export default function Posts({
  user,
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [putError, setPutError] = useState<string | undefined>(undefined);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const res = await (
      await fetch(`/api/content/posts`, {
        method: "PUT",
        body: JSON.stringify({
          title: event.currentTarget.postTitle.value,
          id: post.id,
          slug: event.currentTarget.slug.value,
          description: event.currentTarget.description.value,
          content: event.currentTarget.content.value,
          tags: event.currentTarget.tags.value.split(","),
        }),
      })
    ).json();

    if (res.isSuccess) {
      if (putError) {
        setPutError(undefined);
      }
    } else {
      setPutError(res.message);
    }
  }

  return (
    <>
      <Head>{post.title}</Head>
      <Layout user={user} isWide={true}>
        <PostForm submitError={putError} post={post} onSubmit={handleSubmit} />
      </Layout>
    </>
  );
}

export const getServerSideProps = (async ({
  req,
  res,
  params,
}: GetServerSidePropsContext) => {
  const { user } = await getIronSession<SessionData>(req, res, sessionOptions);

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
      user: user,
      post: await getPostById(params!.id as string),
    },
  };
}) satisfies GetServerSideProps<{
  user: User;
  post: PostContent;
}>;

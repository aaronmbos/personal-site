import Head from "next/head";
import { User } from "../../types/api/types";
import Layout from "../../components/layout";
import PostForm from "../../components/post-form";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { withIronSessionSsr } from "iron-session/next";

export default function NewPost({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>Create New Post</Head>
      <Layout user={user} isWide={true}>
        <PostForm
          onSubmit={() => {
            "new post";
          }}
        />
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

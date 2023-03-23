import Head from "next/head";
import Layout from "../../components/layout";
import { withIronSessionSsr } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { InferGetServerSidePropsType } from "next";
import { User } from "../../types/api/types";

export default function Posts({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>Manage Posts</Head>
      <Layout user={user}>
        <div>{user?.username}</div>
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
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
},
sessionOptions);

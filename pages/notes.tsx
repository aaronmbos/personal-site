import Head from "next/head";
import Layout from "../components/layout";
import AllPostsLink from "../components/all-posts-link";
import Image from "next/image";

export default function Notes() {
  return (
    <Layout>
      <Head>
        <title>Aaron Bos - Notes</title>
      </Head>
      <section>
        <h1 className="mb-4 font-semibold text-2xl">Notes</h1>
        <hr />
      </section>
    </Layout>
  );
}

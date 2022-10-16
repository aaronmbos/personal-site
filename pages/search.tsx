import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";

export default function Search() {
  const {q}= useRouter().query;
  
  return (
    <Layout>
      <Head>
        <title>Search{q && ` - ${q}`}</title>
      </Head>
      <div className="container">
        <h2 className="text-2xl font-bold text-center my-2">{q ?? "Search blog posts"}</h2>
        <input className="my-4 mx-auto block w-1/2 dark:bg-stone-800 dark:text-white rounded-md" type="search" value={q} />
        <div>
          Results
        </div>
      </div>
    </Layout>
  );  
}

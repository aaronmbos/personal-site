import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch";
import { BlogIndex } from "../constants";
import {useState } from "react";

export default function Search() {
  const [results, setResults] = useState<Array<any>>([]);
  const {q}= useRouter().query;
  
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
  );

  const index = client.initIndex(BlogIndex);

  const handleClick = () => {
    const q = document.getElementById("q") as HTMLInputElement;

    if (q.value.length === 0) {
      return
    }

    index.search(q.value).then(({hits}) => {
      console.log(hits);
      setResults(hits);
    });
  }

  return (
    <Layout>
      <Head>
        <title>Search{q && ` - ${q}`}</title>
      </Head>
      <div className="container">
        <h2 className="text-2xl font-bold text-center my-2">{q ?? "Search blog posts"}</h2>
        <div className="text-center align-bottom flex">
          <input id="q" className="my-5 mx-auto w-1/2 flex-1 sm:w-3/4 dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md" type="search" value={q} />
          <button 
            onClick={handleClick}
            className="flex shrink ml-2 items-center justify-center dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-slate-500 w-11 h-11 my-5 hover:border-0 hover:ring-2 dark:ring-stone-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="w-5 h-5 fill-white" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </button>
        </div>
        {results.length > 0 &&
        <div>
          <h3 className="text-xl font-bold my-2">
            Search results
          </h3>
          <div>
            {results.map((result) => {
              return <div>{result.title}</div>
            })}
          </div>
        </div>}
      </div>
    </Layout>
  );  
}

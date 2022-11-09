import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch";
import { BlogIndex, MaxSearchLength } from "../constants";
import { FocusEvent, useState, useEffect } from "react";

export default function Search() {
  const router = useRouter();
  const q = router.query["q"] as string | undefined;
  const decodedQuery = decodeURIComponent(q ?? "");
  const [results, setResults] = useState<Array<any>>([]);

  useEffect(() => {
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
    );

    const index = client.initIndex(BlogIndex);

    if (q && q.length > 0 && typeof q === "string") {
      index
        .search(decodeURIComponent(q.substring(0, MaxSearchLength - 1)))
        .then(({ hits }) => {
          setResults(hits);
        });
    }
  }, [q]);

  const handleClick = () => handleSearch();

  const handleSearch = () => {
    const query = (document.getElementById("q") as HTMLInputElement).value;
    if ((query && query.length === 0) || typeof query !== "string") {
      return;
    }

    router.push({
      pathname: "/search",
      query: {
        q: encodeURIComponent(query),
      },
    });
  };

  return (
    <>
      <Head>
        <title>Search{q && ` - ${decodedQuery}`}</title>
      </Head>

      <Layout>
        <div className="container">
          <h2 className="text-2xl font-bold text-center my-2 break-words">
            Search{q && `: "${decodedQuery}"`}
          </h2>
          <div className="text-center align-bottom flex">
            <input
              maxLength={MaxSearchLength}
              id="q"
              defaultValue={decodedQuery}
              className="my-5 mx-auto w-1/2 flex-1 sm:w-3/4 dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
              type="search"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <button
              onClick={handleClick}
              className="flex shrink ml-2 items-center justify-center dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-slate-500 w-11 h-11 my-5 hover:border-0 hover:ring-2 dark:ring-stone-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                fill="currentColor"
                className="w-5 h-5 fill-white"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          {results.length > 0 && (
            <div>
              <h3 className="text-xl font-bold my-2">Search results</h3>
              <div>
                {results.map((result) => {
                  return <div key={result.objectID}>{result.title}</div>;
                })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

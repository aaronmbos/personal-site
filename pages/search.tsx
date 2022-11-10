import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import algoliasearch from "algoliasearch";
import { BlogIndex, MaxSearchLength } from "../constants";
import { FocusEvent, useState, useEffect } from "react";
import ButtonIcon from "../components/button-icon";
import { icons } from "../types/icons";
import PostPreview from "../components/post-preview";

interface SearchHit {
  objectID: string;
  title: string;
  description: string;
  date: string;
  metadata: string[];
  slug: string;
}

export default function Search() {
  const router = useRouter();
  const q = router.query["q"] as string | undefined;
  const decodedQuery = decodeURIComponent(q ?? "");
  const [results, setResults] = useState<Array<SearchHit>>([]);

  useEffect(() => {
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
    );

    const index = client.initIndex(BlogIndex);

    if (q && q.length > 0 && typeof q === "string") {
      index
        .search<SearchHit>(
          decodeURIComponent(q.substring(0, MaxSearchLength - 1))
        )
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
        q: encodeURIComponent(query.trim()),
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
              placeholder="Search posts"
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
              className="flex shrink ml-2 items-center justify-center dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 w-11 h-11 my-5 hover:border-0 hover:ring-2 dark:ring-stone-400"
            >
              <ButtonIcon
                fill="currentColor"
                classList={["w-5", "h-5", "fill-white"]}
                dimensions={[15, 15]}
                path={icons.search}
              />
            </button>
          </div>
          {results.length > 0 && (
            <div>
              <h3 className="text-xl font-bold my-2">Search results</h3>
              <div>
                {results.map((result) => {
                  return (
                    <PostPreview
                      key={result.objectID}
                      slug={result.slug}
                      title={result.title}
                      description={result.description}
                      date={new Date(result.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        timeZone: "America/Chicago",
                      })}
                      metadata={result.metadata}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

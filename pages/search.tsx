import Head from "next/head";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import { MaxSearchLength } from "../constants";
import { useState, useEffect } from "react";
import ButtonIcon from "../components/button-icon";
import { icons } from "../types/icons";
import PostPreview from "../components/post-preview";
import { ApiResponse, SearchHit } from "../types/api/types";
import useSWR from "swr";
import LoadingSpinner from "../components/loading-spinner";

export default function Search() {
  const router = useRouter();
  const q = router.query["q"] as string | undefined;
  const decodedQuery = decodeURIComponent(q ?? "");
  const [input, setInput] = useState(decodedQuery ?? "");

  const searchPosts = async (query: string) => {
    const sanitizedQuery = decodeURIComponent(
      query.trim().substring(0, MaxSearchLength - 1)
    );

    const response = await fetch(`/api/post/search`, {
      method: "POST",
      body: JSON.stringify({
        query: sanitizedQuery,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
    });
    const results = (await response.json()) as ApiResponse<SearchHit[]>;

    if (results?.isSuccess) {
      return results.data;
    } else {
      throw new Error(results?.message ?? "An error occurred during search.");
    }
  };

  const shouldQuery = q && q.length > 0 && typeof q === "string";
  useEffect(() => {
    if (shouldQuery) {
      setInput(decodedQuery);
    }
  }, [q]);

  const { data, error, isLoading } = useSWR(q, searchPosts);

  const handleClick = () => handleSearch();

  const handleSearch = () => {
    if (input && input.length === 0) {
      return;
    }

    router.push({
      pathname: "/search",
      query: {
        q: encodeURIComponent(input.trim()),
      },
    });
  };

  return (
    <>
      <Head>
        <title>{q ? `Search - ${decodedQuery}` : "Search"}</title>
      </Head>

      <Layout>
        <div className="container">
          <h2 className="text-2xl font-bold text-center my-2 break-words">
            {q ? `Search: ${decodedQuery}` : "Search"}
          </h2>
          <div className="text-center align-bottom flex">
            <input
              placeholder="Search posts"
              maxLength={MaxSearchLength}
              id="q"
              onChange={(e) => setInput(e.target.value)}
              value={input}
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
          {isLoading ? (
            <div className="text-center font-bold my-2">
              Searching for posts
              <LoadingSpinner />
            </div>
          ) : data?.length ?? 0 > 0 ? (
            <div>
              <h3 className="text-xl font-bold my-2">Search results</h3>
              <div>
                {data?.map((result) => {
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
          ) : (
            (error?.length ?? 0) > 0 && (
              <div className="text-center my-2 text-red-500 dark:text-red-300">
                {error.message}
              </div>
            )
          )}
        </div>
      </Layout>
    </>
  );
}

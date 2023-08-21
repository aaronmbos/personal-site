import algoliasearch from "algoliasearch";
import { BlogIndex } from "../../constants";
import { ApiResponse, SearchHit } from "../../types/api/types";

export async function handleGet(
  query: string,
  attribute?: "metadata"
): Promise<ApiResponse<SearchHit[]>> {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_SEARCH_API_KEY!
  );

  const index = client.initIndex(BlogIndex);
  let algoliaResults;
  if (!attribute) {
    algoliaResults = (await index.search<SearchHit>(query)).hits;
  } else {
    algoliaResults = (
      await index.search<SearchHit>("", { filters: `${attribute}:${query}` })
    ).hits;
  }
  const rawResults = (await index.search<SearchHit>(query)).hits;
  return {
    // Unfortunately need to map here to make sure the entire content isn't sent in the response
    data: rawResults.map((h) => {
      return {
        objectID: h.objectID,
        title: h.title,
        description: h.description,
        date: h.date,
        metadata: h.metadata,
        slug: h.slug,
      };
    }),
    isSuccess: true,
    message: "",
  };
}

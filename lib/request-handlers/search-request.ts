import algoliasearch from "algoliasearch";
import { BlogIndex } from "../../constants";
import { ApiResponse, SearchHit } from "../../types/api/types";

export async function handleGet(
  query: string
): Promise<ApiResponse<SearchHit[]>> {
  const rawResults = await search(parseQuery(query));

  return {
    // Unfortunately need to map here to make sure the entire content isn't sent in the response
    data: rawResults
      .map((h) => {
        return {
          objectID: h.objectID,
          title: h.title,
          description: h.description,
          date: h.date,
          metadata: h.metadata,
          slug: h.slug,
        };
      })
      .sort(
        (a, b) =>
          new Date(b.date).getMilliseconds() -
          new Date(a.date).getMilliseconds()
      ),
    isSuccess: true,
    message: "",
  };
}

type AlgoliaQuery = {
  query: string;
  filters?: string;
};

function parseQuery(query: string): AlgoliaQuery {
  // Currently this only supports a single tag, but could be expanded if needed
  if (query.toLowerCase().startsWith("tag:")) {
    return { query: "", filters: `metadata:${query.substring(4)}` };
  }

  return { query };
}

async function search(query: AlgoliaQuery) {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_SEARCH_API_KEY!
  );

  const index = client.initIndex(BlogIndex);
  if (!query.filters) {
    return (await index.search<SearchHit>(query.query)).hits;
  }

  return (await index.search<SearchHit>("", { filters: query.filters })).hits;
}

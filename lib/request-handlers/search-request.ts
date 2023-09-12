import algoliasearch from "algoliasearch";
import { BlogIndex } from "../../constants";
import { ApiResponse, SearchHit } from "../../types/api/types";

export async function handleGet(
  query: string
): Promise<ApiResponse<SearchHit[]>> {
  const rawResults = await search(parseQuery(query));

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

type AlgoliaQuery = {
  query: string;
  filters?: string;
};

function parseQuery(query: string): AlgoliaQuery {
  // Support multiple tags formatted as "tag:tag1,tag2,tag3"
  if (query.toLowerCase().startsWith("tag:")) {
    var filters = query
      .replace(/,\s*$/, "") // Remove trailing commas
      .substring(4)
      .split(",")
      .map((f) => {
        if (f.length > 0) {
          return `metadata:${f.trim()}`;
        }
      })
      .join(" OR ");
    return { query: "", filters: filters };
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

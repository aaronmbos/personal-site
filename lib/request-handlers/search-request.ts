import algoliasearch from "algoliasearch";
import { BlogIndex } from "../../constants";
import { ApiResponse, SearchHit } from "../../types/api/types";

export async function handleGet(
  query: string
): Promise<ApiResponse<SearchHit[]>> {
  const client = algoliasearch(
    process.env.ALGOLIA_APP_ID!,
    process.env.ALGOLIA_SEARCH_API_KEY!
  );

  const index = client.initIndex(BlogIndex);

  return {
    data: (await index.search<SearchHit>(query)).hits,
    isSuccess: true,
    message: "",
  };
}

import algoliasearch from "algoliasearch";
import { BlogIndex } from "../../constants";
import { SearchHit } from "../../types/api/types";

export async function handleGet(query: string): Promise<SearchHit[]> {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
  );

  const index = client.initIndex(BlogIndex);

  return (await index.search<SearchHit>(query)).hits;
}

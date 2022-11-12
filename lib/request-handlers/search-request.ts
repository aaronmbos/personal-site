import algoliasearch from "algoliasearch";
import { BlogIndex } from "../../constants";

export async function handleSearch(query: string) {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
  );

  const index = client.initIndex(BlogIndex);
}

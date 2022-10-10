import dotenv from "dotenv";
import { algoliasearch } from "algoliasearch";
import { AlgoliaAppId, BlogIndex } from "../constants";

export async function run() {
  dotenv.config();
  const client = algoliasearch(AlgoliaAppId, process.env.ALGOLIA_ADMIN_API_KEY);

  //const index = client.initIndex(BlogIndex);

  const postsDir = path.join(process.cwd(), "_posts");
  const posts = await fs.readdir(postsDir);

  const rawPosts = posts.map((post) => {
    const matterPost = matter.read(`${postsDir}/${post}`);
    return {
      id: matterPost.data.id,
      title: matterPost.data.title,
      content: matterPost.content,
      slug: matterPost.data.slug,
      description: matterPost.data.description,
      metadata: matterPost.data.metadata.split(","),
      date: matterPost.data.publishedAt,
    };
  });
}

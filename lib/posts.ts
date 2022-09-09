import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

export interface BlogPost {
  id: number;
  title: string;
  content: string;
  slug: string;
  date: string;
  description: string;
  metadata: string[];
}

export async function getRecentPosts(): Promise<BlogPost[]> {
  return (await getAllPosts()).slice(0, 5);
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const postsDir = path.join(process.cwd(), "_posts");
  const posts = await fs.readdir(postsDir);

  return posts
    .map((post: string) => {
      const matterPost = matter.read(`${postsDir}/${post}`) as any;
      return {
        id: matterPost.data.id as number,
        title: matterPost.data.title as string,
        content: matterPost.content as string,
        slug: matterPost.data.slug as string,
        description: matterPost.data.description as string,
        metadata: matterPost.data.metadata.split(",") as string[],
        date: formatDate(matterPost.data.publishedAt as string),
      };
    })
    .sort((post1, post2) =>
      new Date(post1.date) > new Date(post2.date) ? -1 : 1
    );
}

export async function getPostByUrlId(urlId: string): Promise<BlogPost | never> {
  const posts = await getAllPosts();
  const post = posts.find((post: BlogPost) => post.slug === urlId);

  if (!post) {
    throw new Error("No post found with given urlId");
  }

  return post;
}

function formatDate(rawDate: string): string {
  var options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "America/Chicago",
  };
  const date = new Date(rawDate);
  return date.toLocaleDateString("en-US", options);
}

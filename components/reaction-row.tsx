import useSWR, { useSWRConfig } from "swr";
import { Reaction, ReactionType } from "../types/api/types";

interface Props {
  postSlug: string;
  url: string;
}

async function getReactions(url: string): Promise<Reaction[]> {
  const res = await fetch(url).then((r) => r.json());
  return JSON.parse(res) as Reaction[];
}

async function sendReaction(
  slug: string,
  type: ReactionType,
  count: number
): Promise<Reaction[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}/api/post/reaction?slug=${slug}
&type=${type}&count=${count}`,
    { method: "POST" }
  ).then((r) => r.json());
  return JSON.parse(res) as Reaction[];
}

async function deleteReaction(
  slug: string,
  type: ReactionType,
  count: number
): Promise<Reaction[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_ORIGIN}/api/post/reaction?slug=${slug}
&type=${type}&count=${count}`,
    { method: "DELETE" }
  ).then((r) => r.json());
  return JSON.parse(res) as Reaction[];
}

export default function ReactionRow({ postSlug, url }: Props) {
  const { data, mutate, error } = useSWR<Reaction[]>(
    `/api/post/reaction?slug=${postSlug}`,
    getReactions,
    {
      revalidateIfStale: true,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) {
    // Can do something more with the error
    return <div>Error</div>;
  }
  if (!data) {
    // Default to this while the request is being made
    return <div>Loading</div>;
  }

  return (
    <>
      <hr />
      <div className="my-3 pt-2">
        <button
          type="button"
          className={`text-sm mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-800 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all ${
            data[0].hasReacted ? "opacity-60 ring-2" : ""
          }`}
          onClick={() =>
            mutate(
              data[0].hasReacted
                ? deleteReaction(postSlug, "like", data[0].count)
                : sendReaction(postSlug, "like", data[0].count),
              {
                revalidate: false,
              }
            )
          }
        >
          👍 <span className="text-sm ml-1">{data[0].count}</span>
        </button>
        <a
          className="mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-800 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all"
          href={`https://twitter.com/intent/tweet?url=${encodeURI(url)}`}
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="rgb(29,155,240)"
            viewBox="0 0 17 17"
            className="inline"
          >
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
          </svg>
          <span className="text-sm ml-2">Share</span>
        </a>
        <a
          className="mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-800 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all"
          href="https://aaronbos.dev/feed.xml"
          target="_blank"
          rel="noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="17"
            height="17"
            fill="currentColor"
            viewBox="0 0 17 17"
            className="inline"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
          </svg>
          <span className="text-sm ml-2">Subscribe</span>
        </a>
      </div>
    </>
  );
}

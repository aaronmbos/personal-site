import useSWR, { useSWRConfig } from "swr";
import { Reaction, ReactionType } from "../types/api/types";
import AnchorButton from "./anchor-button";
import ButtonIcon from "./button-icon";
import { icons } from "../types/icons";

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

  return (
    <>
      <hr />
      <div className="my-3 pt-2">
        {!error && (
          <button
            type="button"
            className={`text-sm mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-800 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all ${
              data && data[0].hasReacted ? "opacity-60 ring-2" : ""
            }`}
            onClick={() =>
              mutate(
                data && data[0].hasReacted
                  ? deleteReaction(postSlug, "like", data[0].count)
                  : data && sendReaction(postSlug, "like", data[0].count),
                {
                  revalidate: false,
                }
              )
            }
          >
            👍{data && <span className="text-sm ml-1">{data[0].count}</span>}
          </button>
        )}
        <AnchorButton
          href={`https://twitter.com/intent/tweet?url=${encodeURI(url)}`}
        >
          <ButtonIcon fill="rgb(29,155,240)" path={icons.twitter} />
          <span className="text-sm ml-2">Share</span>
        </AnchorButton>
        <AnchorButton href="https://aaronbos.dev/feed.xml">
          <ButtonIcon fill="currentColor" path={icons.bell} />
          <span className="text-sm ml-2">Subscribe</span>
        </AnchorButton>
      </div>
    </>
  );
}

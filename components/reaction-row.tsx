import { useState, useEffect } from "react";
import useSWR from "swr";
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

async function getReact(slug: string): Promise<Reaction[]> {
  return JSON.parse(
    await (await fetch(`/api/post/reaction?slug=${slug}`)).json()
  ) as Reaction[];
}

async function sendReaction(
  slug: string,
  type: ReactionType,
  count: number
): Promise<Reaction[]> {
  const res = await fetch(
    `/api/post/reaction?slug=${slug}
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
    `/api/post/reaction?slug=${slug}
&type=${type}&count=${count}`,
    { method: "DELETE" }
  ).then((r) => r.json());
  return JSON.parse(res) as Reaction[];
}

function copyToClipboard(url: string) {
  if (document.getElementById("clip")?.classList.contains("hidden")) {
    return;
  }
  navigator.clipboard.writeText(url);
  window.setTimeout(() => {
    toggleClipboard("Copy link");
  }, 1000);

  toggleClipboard("Copied!");
}

function toggleClipboard(text: string) {
  (document.getElementById("clip-text") as HTMLSpanElement).innerText = text;
  document.getElementById("clip")?.classList.toggle("hidden");
  document.getElementById("clipped")?.classList.toggle("hidden");
}

export default function ReactionRow({ postSlug, url }: Props) {
  const [reactions, setReactions] = useState<Reaction[]>();

  useEffect(() => {
    let ignore = false;

    const getReactions = async () => {
      console.log("requesting");
      const reactions = await getReact(postSlug);

      if (!ignore) {
        setReactions(reactions);
      }
    };

    getReactions();

    return () => {
      ignore = true;
    };
  }, []);

  //const { data, mutate, error } = useSWR<Reaction[]>(
  //  `/api/post/reaction?slug=${postSlug}`,
  //  getReactions,
  //  {
  //    revalidateIfStale: false,
  //    revalidateOnFocus: false,
  //    revalidateOnReconnect: false,
  //    shouldRetryOnError: false,
  //  }
  //);

  return (
    <>
      <hr className="mt-6" />
      <div className="my-3 pt-2 flex flex-wrap">
        <button
          type="button"
          onClick={async () => {
            if (reactions) {
              const result = reactions[0].hasReacted
                ? await deleteReaction(postSlug, "like", reactions[0].count)
                : await sendReaction(postSlug, "like", reactions[0].count);
              setReactions(result);
            }
          }}
          className={`text-sm mb-3 mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all ${
            reactions && reactions[0].hasReacted ? "opacity-60 ring-2" : ""
          }`}
        >
          👍
          {
            <span className="text-sm ml-1">
              {reactions && reactions[0].count}
            </span>
          }
        </button>
        {
          //</div>!error && (
          //</div> <button
          //</div>   type="button"
          //</div>   className={`text-sm mb-3 mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all ${
          //</div>     data && data[0].hasReacted ? "opacity-60 ring-2" : ""
          //</div>   }`}
          //</div>   onClick={() =>
          //</div>     mutate(
          //</div>       data && data[0].hasReacted
          //</div>         ? deleteReaction(postSlug, "like", data[0].count)
          //</div>         : data && sendReaction(postSlug, "like", data[0].count),
          //</div>       {
          //</div>         populateCache: (updatedReaction, current) => {
          //</div>           return updatedReaction;
          //</div>         },
          //</div>         revalidate: false,
          //</div>       }
          //</div>     )
          //</div>   }
          //</div> >
          //</div>   👍{data && <span className="text-sm ml-1">{data[0].count}</span>}
          //</div> </button>
          //)</div>
        }
        <AnchorButton
          href={`https://twitter.com/intent/tweet?url=${encodeURI(url)}`}
        >
          <ButtonIcon
            fill="rgb(29,155,240)"
            path={icons.twitter}
            dimensions={[17, 17]}
          />
          <span className="text-sm ml-2">Share</span>
        </AnchorButton>
        <AnchorButton href="https://aaronbos.dev/feed.xml">
          <ButtonIcon
            fill="currentColor"
            path={icons.bell}
            dimensions={[17, 17]}
          />
          <span className="text-sm ml-2">Subscribe</span>
        </AnchorButton>
        <button
          id="clip-btn"
          type="button"
          className={`text-sm mb-3 mr-2 py-2 px-3 rounded-lg bg-gray-100 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all`}
          onClick={() => copyToClipboard(url)}
        >
          <ButtonIcon
            id="clip"
            fill="currentColor"
            path={icons.emptyClipboard}
            dimensions={[17, 17]}
          />
          <ButtonIcon
            id="clipped"
            fill="currentColor"
            path={icons.copiedClipboard}
            classList={["hidden"]}
            dimensions={[17, 17]}
          />{" "}
          <span id="clip-text" className="text-sm ml-1">
            Copy link
          </span>
        </button>
      </div>
    </>
  );
}

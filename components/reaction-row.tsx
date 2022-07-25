import useSWR, { useSWRConfig } from "swr";
import { Reaction } from "../pages/api/post/reaction";

interface Props {
  postSlug: string;
}

async function getReactions(url: string): Promise<Reaction[]> {
  const res = await fetch(url).then((r) => r.json());
  return JSON.parse(res) as Reaction[];
}

//const fetcher = (url: string) => fetch(url).then((r) => JSON.parse(r.json()));

export default function ReactionRow({ postSlug }: Props) {
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR<Reaction[]>(
    `/api/post/reaction?slug=${postSlug}`,
    getReactions
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
      <div className="my-3">
        <button
          className="py-1 px-3 rounded-lg bg-gray-100 dark:bg-stone-800 dark:bg-stone-900 hover:ring-2 ring-stone-400 transition-all"
          onClick={() => mutate(`/api/post/reaction?slug=${postSlug}`)}
        >
          👍 <span className="text-sm ml-1">{data[0].count}</span>
        </button>
      </div>
    </>
  );
}

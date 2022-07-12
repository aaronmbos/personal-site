import useSWR, { useSWRConfig } from "swr";

interface Props {
  postSlug: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ReactionRow({ postSlug }: Props) {
  const { mutate } = useSWRConfig();

  const { data, error } = useSWR(
    `/api/post/reaction?slug=${postSlug}`,
    fetcher
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
      <div>{data}</div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
        onClick={() => mutate(`/api/post/reaction?slug=${postSlug}`)}
      >
        Mutate
      </button>
    </>
  );
}

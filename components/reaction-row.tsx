import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ReactionRow() {
  console.log("rendered");
  const { data, error } = useSWR("/api/post/reaction", fetcher);

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading</div>;

  return <div>{data}</div>;
}

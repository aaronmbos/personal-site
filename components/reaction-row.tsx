import useSWR from "swr";

interface Props {
  postSlug: string;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function ReactionRow({ postSlug }: Props) {
  console.log("rendered");
  const { data, error } = useSWR(
    `/api/post/reaction?slug=${postSlug}`,
    fetcher
  );

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading</div>;

  return <div>{data}</div>;
}

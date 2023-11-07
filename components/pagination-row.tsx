import router from "next/router";

interface Props {
  page: number;
  limit: number;
}

export default function PaginationRow({ page, limit }: Props) {
  return (
    <div className="flex justify-evenly py-1">
      {page > 1 && (
        <button
          className="mr-auto ml-2 hover:ring-2 ring-stone-400 dark:bg-stone-800 dark:hover:bg-stone-900 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium"
          onClick={() => {
            router.push({
              pathname: "/posts",
              query: { page: page - 1 },
            });
          }}
        >
          ← Previous
        </button>
      )}
      {page < limit && (
        <button
          className="ml-auto mr-2 hover:ring-2 ring-stone-400 dark:bg-stone-800 dark:hover:bg-stone-900 text-blue-500 hover:text-blue-700 dark:text-blue-300 dark:hover:text-blue-100 px-3 py-2 rounded-md text-sm font-medium"
          onClick={() => {
            router.push({
              pathname: "/posts",
              query: { page: page + 1 },
            });
          }}
        >
          Next →
        </button>
      )}
    </div>
  );
}

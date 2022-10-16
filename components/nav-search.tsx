import { useRouter } from "next/router";

export default function NavSearch() {
  const router = useRouter();

  return (
    <input
      className="lg:w-1/2 md:w-3/4 dark:bg-stone-800 dark:text-white rounded-md"
      type="search"
      placeholder="Search"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          const query = (e.target as HTMLInputElement).value;

          router.push({
            pathname: "/search",
            query: {
              q: encodeURIComponent(query)           
            }
          })
          console.log(query);
        }
      }}
    />
  );
}

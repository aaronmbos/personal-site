export default function NavSearch() {
  return (
    <input
      className="lg:w-1/2 md:w-3/4 dark:bg-stone-800 dark:text-white rounded-md"
      type="search"
      placeholder="Search"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          console.log(e.key);
        }
      }}
    />
  );
}

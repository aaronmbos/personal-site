import { PostContent } from "../lib/content";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  post?: PostContent;
  submitError?: string;
}

export default function PostForm({ onSubmit, post, submitError }: Props) {
  return (
    <>
      {post ? (
        <h1 className="mb-6 font-semibold text-3xl">Edit Post</h1>
      ) : (
        <h1 className="mb-6 font-semibold text-3xl">Create New Post</h1>
      )}
      {submitError && (
        <div className="text-center my-2 text-red-500 dark:text-red-300">
          {submitError}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="">
          <div className="w-full md:w-2/5 inline-block">
            <label htmlFor="postTitle" className="block">
              Title
            </label>
            <input
              className="my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
              name="postTitle"
              id="postTitle"
              type="text"
              defaultValue={post?.title}
            />
          </div>
          <div className="w-full md:w-2/5 inline-block float-right">
            <label htmlFor="slug" className="block">
              Slug
            </label>
            <input
              className="my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
              name="slug"
              id="slug"
              type="text"
              defaultValue={post?.slug}
            />
          </div>
        </div>
        <label htmlFor="tags" className="block">
          Tags
        </label>
        <input
          className="my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
          name="tags"
          id="tags"
          type="text"
          defaultValue={post?.tags?.join(",")}
        />
        <label htmlFor="description" className="block">
          Description
        </label>
        <textarea
          className="h-40 my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
          name="description"
          id="description"
          defaultValue={post?.description ?? undefined}
        />
        <label htmlFor="Content" className="block">
          Content
        </label>
        <textarea
          className="h-screen my-3 w-full dark:focus:ring-stone-400 dark:focus:ring-2 dark:focus:border-0 dark:bg-stone-800 dark:text-white rounded-md"
          name="content"
          id="content"
          defaultValue={post?.content ?? undefined}
        />
        <button
          className="px-10 flex shrink items-center justify-center text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 w-11 h-11 my-5 hover:border-0 hover:ring-2 dark:ring-stone-400"
          type="submit"
        >
          Save
        </button>
      </form>
    </>
  );
}

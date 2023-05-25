import { MouseEventHandler, useState } from "react";
import { PostContent } from "../lib/content";
import Router from "next/router";

interface Props {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  post?: PostContent;
  submitError?: string;
}

export default function PostForm({ onSubmit, post, submitError }: Props) {
  const [publishError, setPublishError] = useState<string | undefined>(
    undefined
  );

  async function handlePublish() {
    const res = await (
      await fetch(`/api/content/posts`, {
        method: "PATCH",
        body: JSON.stringify({
          id: post?.id,
          fields: {
            publishedAt: new Date().toISOString(),
          },
        }),
      })
    ).json();

    if (res.isSuccess) {
      Router.push(`/content/${post?.id}`);
    } else {
      setPublishError(res.message);
    }
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="mb-6 py-4 sticky top-0 bg-gray-50 dark:bg-stone-800 dark:text-white border-b-2 dark:border-stone-600 border-stone-800">
          {submitError && (
            <div className="text-center my-2 text-red-500 dark:text-red-300">
              {submitError}
            </div>
          )}
          {publishError && (
            <div className="text-center my-2 text-red-500 dark:text-red-300">
              {publishError}
            </div>
          )}
          <div className="flex justify-between">
            <h1 className="font-semibold text-3xl inline-block">
              {post ? "Edit Post" : "Create New Post"}
            </h1>
            <div className="">
              {post && !post?.publishedAt && (
                <button
                  onClick={handlePublish}
                  type="button"
                  className="inline px-4 py-2 mb-1 mr-4 text-sm text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 hover:border-0 hover:ring-2 dark:ring-stone-400"
                >
                  Publish
                </button>
              )}
              <button
                type="submit"
                className="inline px-4 py-2 mb-1 text-sm text-white dark:bg-stone-900 bg-blue-500 hover:bg-blue-700 rounded-lg dark:border dark:border-gray-500 hover:border-0 hover:ring-2 dark:ring-stone-400"
              >
                Save
              </button>
            </div>
          </div>
        </div>
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
      </form>
    </>
  );
}

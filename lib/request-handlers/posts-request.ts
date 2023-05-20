import { ApiResponse, PostsRequest } from "../../types/api/types";
import sql from "../../database/db.mjs";

export async function handlePut(req: PostsRequest): Promise<ApiResponse<null>> {
  const [isValid, message] = isRequestValid(req);

  if (!isValid) {
    return {
      isSuccess: false,
      message: `No changes saved. ${message}`,
      data: null,
    };
  }

  await sql`
    update post.post
      set title = ${req.title},
      content = ${req.content},
      description = ${req.description},
      tags = ${req?.tags ?? []},
      slug = ${req.slug}
    where id = ${req.id}`;

  return {
    isSuccess: isValid,
    message: message,
    data: null,
  };
}

function isRequestValid(req: PostsRequest): [boolean, string] {
  if (!req.slug || req.slug.length < 1 || req.slug.length > 128) {
    return [false, "Slug is invalid"];
  }

  if (!req.title || req.title.length < 1 || req.title.length > 128) {
    return [false, "Title is invalid"];
  }

  if (!req.content || req.content.length < 1) {
    return [false, "Content is invalid"];
  }

  if (!req.description || req.description.length < 1) {
    return [false, "Description is invalid"];
  }

  return [true, ""];
}

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
      content = ${req.content ?? null},
      description = ${req.description ?? null},
      tags = ${req?.tags ?? null},
      slug = ${req.slug}
    where id = ${req.id}`;

  return {
    isSuccess: isValid,
    message: message,
    data: null,
  };
}

export async function handlePost(
  req: PostsRequest
): Promise<ApiResponse<string | null>> {
  const [isValid, message] = isRequestValid(req);

  if (!isValid) {
    return {
      isSuccess: false,
      message: `No changes saved. ${message}`,
      data: null,
    };
  }

  const dbRes = await sql`
    insert into post.post (title, content, description, tags, slug)
    values (${req.title}, ${req.content ?? null}, ${req.description ?? null}, ${
    req?.tags ?? null
  }, ${req.slug})

  returning id;
  `;

  return {
    isSuccess: isValid,
    message: message,
    data: dbRes[0].id,
  };
}

function isRequestValid(req: PostsRequest): [boolean, string] {
  if (!req.slug || req.slug.length < 1 || req.slug.length > 128) {
    return [false, "Slug is invalid"];
  }

  if (!req.title || req.title.length < 1 || req.title.length > 128) {
    return [false, "Title is invalid"];
  }

  return [true, ""];
}

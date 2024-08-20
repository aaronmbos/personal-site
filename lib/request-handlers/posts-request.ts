import {
  ApiResponse,
  PostsPatchRequest,
  PostsRequest,
} from "../../types/api/types";
import sql from "../../database/db.mjs";
const cloudinary = require("cloudinary").v2;

export async function handlePut(req: PostsRequest): Promise<ApiResponse<void>> {
  const [isValid, message] = isRequestValid(req);

  if (!isValid) {
    return {
      isSuccess: false,
      message: `No changes saved. ${message}`,
    };
  }

  const existingPost = (
    await sql`select id, title, content, description, tags, slug, updated_at, created_at, published_at from post.post where id = ${req.id}`
  )[0];

  await sql`
    update post.post
      set title = ${req.title},
      content = ${req.content ?? null},
      description = ${req.description ?? null},
      tags = ${req?.tags ?? null},
      slug = ${req.slug},
      updated_at = now()
    where id = ${req.id}`;

  if (existingPost.title !== req.title) {
    generateImage(req.title);
  }

  return {
    isSuccess: isValid,
    message: message,
  };
}

export async function handlePost(
  req: PostsRequest
): Promise<ApiResponse<string | void>> {
  const [isValid, message] = isRequestValid(req);

  if (!isValid) {
    return {
      isSuccess: false,
      message: `No changes saved. ${message}`,
    };
  }

  const dbRes = await sql`
    insert into post.post (title, content, description, tags, slug)
    values (${req.title}, ${req.content ?? null}, ${req.description ?? null}, ${
    req?.tags ?? null
  }, ${req.slug})

  returning id;
  `;

  generateImage(req.title);

  return {
    isSuccess: isValid,
    message: message,
    data: dbRes[0].id,
  };
}

export async function handlePatch(
  req: PostsPatchRequest
): Promise<ApiResponse<void>> {
  const dbPost = (
    await sql`select id, title, content, description, tags, slug, updated_at, created_at, published_at from post.post where id = ${req.id}`
  )[0];

  if (!dbPost) {
    return {
      isSuccess: false,
      message: "The post cannot be published.",
    };
  }

  var updatedPost = { ...dbPost, ...req.fields, id: dbPost.id };

  await sql`
    update post.post
      set title = ${updatedPost.title},
      content = ${updatedPost.content ?? null},
      description = ${updatedPost.description ?? null},
      tags = ${updatedPost?.tags ?? null},
      slug = ${updatedPost.slug},
      updated_at = now(),
      published_at = ${updatedPost.publishedAt ?? null}
    where id = ${updatedPost.id}`;

  if (updatedPost.title !== dbPost.title) {
    generateImage(updatedPost.title);
  }

  return {
    isSuccess: true,
  };
}

function generateImage(title: string) {
  // Return "https" URLs by setting secure: true
  cloudinary.config({
    secure: true,
  });

  // Log the configuration
  console.log(cloudinary.config());
  //console.log("Generating image for post: " + title);
}

function isRequestValid(req: PostsRequest): [boolean, string?] {
  if (!req.slug || req.slug.length < 1 || req.slug.length > 128) {
    return [false, "Slug is invalid"];
  }

  if (!req.title || req.title.length < 1 || req.title.length > 128) {
    return [false, "Title is invalid"];
  }

  return [true];
}

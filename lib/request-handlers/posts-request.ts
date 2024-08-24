import {
  ApiResponse,
  PostsPatchRequest,
  PostsRequest,
} from "../../types/api/types";
import sql from "../../database/db.mjs";
import Jimp from "jimp";
const cloudinary = require("cloudinary").v2;
import path from "path";

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
    await generateImage(req.title);
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

  await generateImage(req.title);

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
    await generateImage(updatedPost.title);
  }

  return {
    isSuccess: true,
  };
}

async function generateImage(title: string) {
  const plugin = require.resolve("@jimp/plugin-print");
  const jimpFont = path.resolve(
    plugin,
    "../../fonts/open-sans/open-sans-32-black/open-sans-64-black.fnt"
  );
  const outputPath = process.cwd() + `/${title}.png`;
  let loadedImage: any;
  const fileName =
    "https://res.cloudinary.com/aaron-bos/image/upload/v1724151592/og-bg_ye1eu7.png";
  Jimp.read(fileName)
    .then(function (image) {
      loadedImage = image;
      return Jimp.loadFont(jimpFont);
    })
    .then(function (font) {
      loadedImage
        .print(
          font,
          10,
          10,
          {
            text: title,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
            alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
          },
          1200,
          630
        )
        .write(outputPath);
    })
    .catch(function (err) {
      console.error(err);
    });

  // https://cloudinary.com/documentation/node_quickstart
  // Return "https" URLs by setting secure: true
  cloudinary.config({
    secure: true,
  });

  // Log the configuration
  //console.log(cloudinary.config());
  //console.log("Generating image for post: " + title);
  // Use the uploaded file's name as the asset's public ID and
  // allow overwriting the asset with new versions
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: false,
  };

  await new Promise((resolve) => setTimeout(resolve, 1000));

  try {
    const result = await cloudinary.uploader.upload(outputPath, options);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
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

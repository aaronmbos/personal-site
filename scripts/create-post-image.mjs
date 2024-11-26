// Example usage: node ./scripts/create-post-image.mjs '"Hello, world!"'

import { spawn } from "child_process";
import sql from "../database/db.mjs";
import { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";

// The post's slug should be passed to the script
const postSlug = process.argv[2];

if (!postSlug) {
  console.log("You need to provide a post slug.");
}

const post = (
  await sql`select id, title, slug from post.post where slug=${postSlug}`
)[0];

if (!post) {
  console.log(`No post found with the provided slug: "${postSlug}"`);
}

// Spawn the child process
const scriptPath = resolve("./scripts/create-post-image.sh");
const child = spawn(scriptPath, ["-c", post.title, "-o", `${post.slug}.png`]);

child.stdout.on("data", (data) => {
  console.log(`${data}`);
});

// Capture standard error
child.stderr.on("data", (data) => {
  console.error(`An error occurred during child process. ${data}`);
  process.exit(1);
});

// Handle process exit
child.on("close", (code) => {
  if (code === 0) {
    // Make sure cloudinary returns secure URLs
    cloudinary.config({
      secure: true,
    });

    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    // Upload the image
    cloudinary.uploader
      .upload(`./tmp/${post.slug}.png`, options)
      .then((result) => {
        console.log(result);
        updatePostImageUrl(post.id, result.secure_url)
          .then(() => {
            process.exit(0);
          })
          .catch((error) => {
            console.error(error);
            process.exit(1);
          });
      })
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });
  }
});

async function updatePostImageUrl(id, url) {
  await sql`update post.post set image_url = ${url} where id = ${id} `;
}

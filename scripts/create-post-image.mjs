import { spawn } from "child_process";
import { resolve } from "path";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

function createPostImage(post) {
  const scriptPath = resolve("./scripts/create-post-image.sh");
  const child = spawn(scriptPath, ["-c", post.title, "-o", `${post.slug}.png`]);

  child.stdout.on("data", (data) => {
    console.log(`${data}`);
  });

  child.stderr.on("data", (data) => {
    console.error(`An error occurred during child process. ${data}`);
  });

  child.on("close", (code) => {
    if (code === 0) {
      return uploadPost(post);
    }
  });
}

function uploadPost(post) {
  // Make sure cloudinary returns secure URLs
  cloudinary.config({
    secure: true,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
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
      return result.secure_url;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
}

export default createPostImage;

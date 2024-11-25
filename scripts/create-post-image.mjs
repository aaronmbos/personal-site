// Example usage: node ./scripts/create-post-image.mjs '"Hello, world!"'

import { spawn } from "child_process";
import sql from "../database/db.mjs";
import { resolve } from "path";

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

// Capture standard output
child.stdout.on("data", (data) => {
  console.log(`Output: ${data}`);
});

// Capture standard error
child.stderr.on("data", (data) => {
  console.error(`Error: ${data}`);
});

// Handle process exit
child.on("close", (code) => {
  console.log(`Child process exited with code ${code}`);
});

process.exit(0);

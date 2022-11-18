import { readdir, writeFile } from "fs/promises";
import path from "path";

const fileNameArg = process.argv[2];

const postsDir = path.join(process.cwd(), "_posts");
const files = await readdir(postsDir);

const newFileName = `${files.length + 1}_${fileNameArg}.md`;

const matterTemplate = `---
id: ${files.length + 1}
slug: <the-slug>
title: "The title"
description: "The description"
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: <comma,delimited,values>
---
`;

await writeFile(`${postsDir}/${newFileName}`, matterTemplate, { flag: "a" });

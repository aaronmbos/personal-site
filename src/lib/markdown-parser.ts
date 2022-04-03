import remark from "remark";
import html from "remark-html";

export async function parseMarkdownToHtml(markdown: string) {
  const processedMarkdown = await remark().use(html).process(markdown);
  return processedMarkdown.toString();
}

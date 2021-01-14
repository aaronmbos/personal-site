import remark from 'remark';
import html from 'remark-html';

export async function parseMarkdownToHtml(markdown) {
  const processedMarkdown = await remark().use(html).process(markdown);
  return processedMarkdown.toString();
}
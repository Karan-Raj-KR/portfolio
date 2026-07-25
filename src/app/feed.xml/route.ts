import { publications } from "@/data/publications";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function GET() {
  // Was a single hardcoded item pointing at /blog/hello-world, which rendered
  // "This is a placeholder". These are the real articles.
  const items = publications
    .slice()
    .sort((a, b) => b.publishedDate.localeCompare(a.publishedDate))
    .map((article) => {
      const url = article.canonicalUrl ?? article.platforms[0]?.url ?? "";
      return `    <item>
      <title>${escape(article.title)}</title>
      <link>${escape(url)}</link>
      <guid isPermaLink="false">${escape(article.slug)}</guid>
      <description>${escape(article.excerpt)}</description>
      <pubDate>${new Date(article.publishedDate).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Karan Raj KR | AI Engineer</title>
    <link>https://www.karanrajkr.com</link>
    <description>Writing about AI, backend development, and building things.</description>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: { "Content-Type": "application/xml" },
  });
}

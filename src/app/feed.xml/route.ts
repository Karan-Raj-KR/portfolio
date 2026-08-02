import { publications } from "@/data/publications";

export async function GET() {
  const items = [...publications]
    .sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime())
    .map((article) => {
      const link = `https://www.karanrajkr.com/blog/${article.slug}`;
      const date = new Date(article.publishedDate).toUTCString();
      return `    <item>
      <title>${article.title}</title>
      <link>${link}</link>
      <description>${article.excerpt}</description>
      <pubDate>${date}</pubDate>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Karan Raj KR | AI Engineer</title>
    <link>https://www.karanrajkr.com</link>
    <description>Blog posts about AI, Backend Development, and startups.</description>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

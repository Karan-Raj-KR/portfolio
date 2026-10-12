import { publications } from "@/data/publications";

const escapeXml = (value: string) => value.replace(/[<>&"']/g, (character) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
})[character]!);

export async function GET() {
  const items = publications.map((article) => `<item>
    <title>${escapeXml(article.title)}</title>
    <link>${escapeXml(article.canonicalUrl || article.platforms[0].url)}</link>
    <description>${escapeXml(article.excerpt)}</description>
    <pubDate>${new Date(`${article.publishedDate}T00:00:00Z`).toUTCString()}</pubDate>
  </item>`).join("\n");
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0"><channel>
  <title>Karan Raj KR | Founder, KĀRYO</title>
  <link>https://www.karanrajkr.com</link>
  <description>Build notes, hackathon stories and engineering lessons.</description>
  ${items}
</channel></rss>`;

  return new Response(feed, { headers: { "Content-Type": "application/xml" } });
}

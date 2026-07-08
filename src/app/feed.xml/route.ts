export async function GET() {
  const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Karan Raj KR | AI Engineer</title>
    <link>https://karanrajkr.com</link>
    <description>Blog posts about AI, Backend Development, and startups.</description>
    <item>
      <title>Hello World - Building KĀRYO</title>
      <link>https://karanrajkr.com/blog/hello-world</link>
      <description>A look into why I founded KĀRYO and what we're building for local businesses.</description>
      <pubDate>Sun, 05 Jul 2026 08:00:00 GMT</pubDate>
    </item>
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

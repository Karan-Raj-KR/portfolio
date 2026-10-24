import type { APIRoute } from 'astro';
import { site as content } from '../data/site';

const escape = (value: string) => value.replace(/[<>&"']/g, (c) => ({
  '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;',
})[c]!);

export const GET: APIRoute = ({ site }) => {
  const items = content.about.writing.map((article) => `<item>
    <title>${escape(article.title)}</title>
    <link>${escape(article.href)}</link>
    <guid isPermaLink="true">${escape(article.href)}</guid>
    <description>${escape(article.summary)}</description>
    <pubDate>${new Date(`${article.datetime}T00:00:00Z`).toUTCString()}</pubDate>
  </item>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
  <title>${escape(content.name)}: writing</title>
  <link>${escape(site!.href)}</link>
  <description>Build notes, hackathon stories and engineering lessons.</description>
  <atom:link href="${escape(new URL('/feed.xml', site).href)}" rel="self" type="application/rss+xml" />
  ${items}
</channel></rss>`, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { publications } from "@/data/publications";
import { Header } from "@/components/layout/header";

export const metadata = {
  title: "Writing",
  description: "Essays, thoughts, and research notes on software, AI, and startups by Karan Raj KR.",
  alternates: {
    canonical: "/writing",
  },
};

export default function WritingList() {
  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <Header />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Writing", url: "https://www.karanrajkr.com/writing" },
        ]}
      />
      <div className="pt-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Writing</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Essays, thoughts, and research notes by Karan Raj KR.
        </p>
      </div>

      <div className="rounded-xl border border-border p-8 text-muted-foreground">
        <ul className="space-y-6">
          {publications.map((article) => (
            <li key={article.slug}>
              <time dateTime={article.publishedDate} className="text-sm">{new Date(`${article.publishedDate}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })}</time>
              <h2 className="mt-2 text-xl font-semibold text-foreground">
                <Link href={article.platforms.find((platform) => platform.source === "hashnode")!.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{article.title}</Link>
              </h2>
              <p className="mt-2">{article.excerpt}</p>
              <p className="mt-2 text-sm">Hashnode</p>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

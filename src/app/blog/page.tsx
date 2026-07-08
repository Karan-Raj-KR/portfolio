import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata = {
  title: "Blog",
  description: "Read my latest articles about AI Engineering, Backend Development, and building products.",
};

export default function BlogList() {
  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://karanrajkr.com/" },
          { name: "Blog", url: "https://karanrajkr.com/blog" },
        ]}
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Blog</h1>
      <p className="mb-12 text-lg text-muted-foreground">
        Thoughts and tutorials on AI, Python, FastAPI, and Next.js.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Dummy Post */}
        <article className="flex flex-col gap-4 rounded-xl border border-border p-6 transition-colors hover:bg-muted/10">
          <h2 className="text-2xl font-semibold">
            <Link href="/blog/hello-world">Hello World - Building KĀRYO</Link>
          </h2>
          <p className="text-muted-foreground">
            A look into why I founded KĀRYO and what we're building for local businesses.
          </p>
          <time dateTime="2026-07-05" className="text-sm text-muted-foreground">July 5, 2026</time>
        </article>
      </div>
    </main>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar, User } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";
import { publications } from "@/data/publications";

export async function generateStaticParams() {
  return publications.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = publications.find((p) => p.slug === slug);
  if (!article) return {};

  return {
    title: `${article.title} | Karan Raj KR`,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${article.title} | Karan Raj KR`,
      description: article.excerpt,
      url: `https://www.karanrajkr.com/blog/${slug}`,
      type: "article",
      publishedTime: article.publishedDate,
      authors: ["Karan Raj KR"],
      images: [
        {
          url: article.coverImage || "https://www.karanrajkr.com/og-image.png",
          alt: article.title,
        },
      ],
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = publications.find((p) => p.slug === slug);

  if (!article) {
    notFound();
  }

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.publishedDate,
    description: article.excerpt,
    mainEntityOfPage: `https://www.karanrajkr.com/blog/${article.slug}`,
    author: {
      "@type": "Person",
      "@id": "https://www.karanrajkr.com/#person",
      name: "Karan Raj KR",
      url: "https://www.karanrajkr.com",
    },
    publisher: {
      "@type": "Person",
      "@id": "https://www.karanrajkr.com/#person",
      name: "Karan Raj KR",
    },
  };

  const primaryUrl = article.canonicalUrl || article.platforms[0]?.url || "#";

  return (
    <main className="min-h-screen py-24">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Blog", url: "https://www.karanrajkr.com/blog" },
          { name: article.title, url: `https://www.karanrajkr.com/blog/${article.slug}` },
        ]}
      />

      <article className="container mx-auto px-4 md:px-6 max-w-3xl pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <header className="mb-12 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-primary" />
              <time dateTime={article.publishedDate}>{article.publishedDate}</time>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-primary" />
              Karan Raj KR
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
            {article.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed pt-2">
            {article.excerpt}
          </p>
        </header>

        <div className="rounded-2xl border border-border/80 bg-muted/10 p-8 space-y-6 mb-12">
          <h2 className="text-xl font-semibold text-foreground">
            Read Full Article
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This technical write-up by Karan Raj KR is published on external engineering publication platforms. Read the complete story, code snippets, and discussion on your preferred platform:
          </p>

          <div className="flex flex-wrap gap-3">
            {article.platforms.map((platform, idx) => (
              <Link
                key={idx}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-medium hover:bg-foreground/90 transition-colors"
              >
                Read on {platform.source === "devto" ? "Dev.to" : platform.source.charAt(0).toUpperCase() + platform.source.slice(1)}
                <ExternalLink className="h-4 w-4" />
              </Link>
            ))}
          </div>
        </div>
      </article>
    </main>
  );
}

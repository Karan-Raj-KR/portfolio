import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";
import { publications } from "@/data/publications";

// This is a dynamic route
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = publications.find((p) => p.slug === resolvedParams.slug);
  if (!article) notFound();

  return {
    title: article.title,
    description: article.excerpt,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = publications.find((p) => p.slug === resolvedParams.slug);
  if (!article) notFound();

  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    datePublished: article.publishedDate,
    author: {
      "@type": "Person",
      name: "Karan Raj KR",
    },
  };

  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Blog", url: "https://www.karanrajkr.com/blog" },
          { name: article.title, url: `https://www.karanrajkr.com/blog/${resolvedParams.slug}` },
        ]}
      />
      
      <article className="prose prose-invert lg:prose-xl max-w-3xl">
        <h1>{article.title}</h1>
        <p>{article.excerpt}</p>
        <p>This is a placeholder for the blog post content.</p>
      </article>
    </main>
  );
}

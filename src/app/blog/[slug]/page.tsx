import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

// This is a dynamic route
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return {
    title: `Post ${resolvedParams.slug}`,
    description: `A deep dive into ${resolvedParams.slug} as an AI Engineer and Backend Developer.`,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const postSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: `Post ${resolvedParams.slug}`,
    datePublished: "2026-07-05T08:00:00Z",
    author: {
      "@type": "Person",
      name: "Karan Raj KR",
    },
  };

  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Blog", url: "https://www.karanrajkr.com/blog" },
          { name: resolvedParams.slug, url: `https://www.karanrajkr.com/blog/${resolvedParams.slug}` },
        ]}
      />
      
      <article className="prose prose-invert lg:prose-xl max-w-3xl">
        <h1>{resolvedParams.slug.replace("-", " ")}</h1>
        <p>This is a placeholder for the blog post content.</p>
      </article>
    </main>
  );
}

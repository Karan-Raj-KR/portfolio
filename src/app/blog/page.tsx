import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { publications } from "@/data/publications";
import { Tilt } from "@/components/ui/tilt";
import { ShareButtons } from "@/components/blog/share-buttons";

export const metadata = {
  title: "Blog | Karan Raj KR",
  description: "Read my latest articles about AI Engineering, Backend Development, and building products.",
  openGraph: {
    title: "Blog | Karan Raj KR",
    description: "Read my latest articles about AI Engineering, Backend Development, and building products.",
    url: "https://karanrajkr.com/blog",
    images: [{ url: publications[0]?.coverImage || "/og-image.jpg" }]
  }
};

export default function BlogList() {
  const sortedPublications = [...publications].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog | Karan Raj KR",
    "url": "https://karanrajkr.com/blog",
    "blogPost": sortedPublications.map((pub) => ({
      "@type": "BlogPosting",
      "headline": pub.title,
      "url": pub.url,
      "datePublished": pub.publishedDate,
      "description": pub.excerpt,
      "author": {
        "@type": "Person",
        "name": "Karan Raj KR"
      }
    }))
  };

  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://karanrajkr.com/" },
          { name: "Blog", url: "https://karanrajkr.com/blog" },
        ]}
      />
      
      <div className="mb-12">
        <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Blog</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          Thoughts and tutorials on AI, Python, FastAPI, Next.js, and building products.
        </p>
      </div>

      {sortedPublications.length === 0 ? (
        <div className="rounded-xl border border-border bg-muted/10 p-8 text-center text-muted-foreground">
          No publications yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedPublications.map((pub, index) => (
            <div key={index} className="group relative block h-full">
              <Link href={pub.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                <span className="sr-only">Read {pub.title}</span>
              </Link>
              <Tilt className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted/10 transition-colors group-hover:bg-muted/20 relative z-0">
                {pub.coverImage && (
                  <div className="relative h-48 w-full border-b border-border bg-muted/30">
                    <img 
                      src={pub.coverImage} 
                      alt={pub.title} 
                      className="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-grow p-5 sm:p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      pub.source === 'hashnode' 
                        ? 'bg-blue-500/10 text-blue-500 dark:text-blue-400' 
                        : 'bg-zinc-800 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
                    }`}>
                      {pub.source === 'hashnode' ? 'Hashnode' : 'Dev.to'}
                    </span>
                    <time dateTime={pub.publishedDate} className="text-xs text-muted-foreground">
                      {new Date(pub.publishedDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </time>
                  </div>
                  <h2 className="mb-3 text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                    {pub.title}
                  </h2>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {pub.excerpt}
                  </p>
                  <div className="mt-auto">
                    <ShareButtons publication={pub} />
                  </div>
                </div>
              </Tilt>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

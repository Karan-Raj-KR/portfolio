import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { publications } from "@/data/publications";
import { Tilt } from "@/components/ui/tilt";
import { ShareButtons } from "@/components/blog/share-buttons";
import { ExternalLink } from "lucide-react";

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

const platformStyles: Record<string, string> = {
  hashnode: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20',
  devto: 'bg-zinc-800 text-zinc-100 hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200',
  medium: 'bg-green-500/10 text-green-600 hover:bg-green-500/20 dark:text-green-400',
  quora: 'bg-red-500/10 text-red-600 hover:bg-red-500/20 dark:text-red-400',
};

const platformLabels: Record<string, string> = {
  hashnode: 'Hashnode',
  devto: 'Dev.to',
  medium: 'Medium',
  quora: 'Quora',
};

export default function BlogList() {
  const sortedArticles = [...publications].sort((a, b) => 
    new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Blog | Karan Raj KR",
    "url": "https://karanrajkr.com/blog",
    "blogPost": sortedArticles.map((article) => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "url": article.canonicalUrl || article.platforms[0]?.url,
      "datePublished": article.publishedDate,
      "description": article.excerpt,
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

      {sortedArticles.length === 0 ? (
        <div className="rounded-xl border border-border bg-muted/10 p-8 text-center text-muted-foreground">
          No articles yet. Check back soon!
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sortedArticles.map((article, index) => {
            const primaryUrl = article.canonicalUrl || article.platforms[0]?.url || "#";
            return (
              <div key={index} className="group relative block h-full">
                <Tilt className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted/10 transition-colors group-hover:bg-muted/20 relative z-0">
                  {article.coverImage && (
                    <Link href={primaryUrl} target="_blank" rel="noopener noreferrer" className="relative h-48 w-full border-b border-border bg-muted/30 block">
                      <img 
                        src={article.coverImage} 
                        alt={article.title} 
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </Link>
                  )}
                  <div className="flex flex-col flex-grow p-5 sm:p-6">
                    <div className="mb-3 flex items-center justify-between">
                      <time dateTime={article.publishedDate} className="text-xs text-muted-foreground font-medium">
                        {new Date(article.publishedDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                    </div>
                    <Link href={primaryUrl} target="_blank" rel="noopener noreferrer">
                      <h2 className="mb-3 text-xl font-semibold leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-3">
                        {article.title}
                      </h2>
                    </Link>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>
                    
                    <div className="mb-4">
                      <span className="text-xs font-medium text-muted-foreground mr-2">Read on:</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {article.platforms.map((platform, idx) => (
                          <Link 
                            key={idx} 
                            href={platform.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${platformStyles[platform.source] || 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                          >
                            {platformLabels[platform.source] || platform.source}
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto">
                      <ShareButtons article={article} />
                    </div>
                  </div>
                </Tilt>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

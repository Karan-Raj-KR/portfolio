export type Platform = {
  source: "hashnode" | "devto" | "medium" | "quora";
  url: string;
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  publishedDate: string; // ISO date format YYYY-MM-DD
  coverImage?: string;
  platforms: Platform[];
  canonicalUrl?: string;
};

export const publications: Article[] = [
  {
    slug: "my-first-year-of-engineering",
    title: "My First Year of Engineering",
    excerpt: "A deep dive into what I built, won, and actually learned during my first year.",
    publishedDate: "2026-07-05",
    platforms: [
      { source: "hashnode", url: "https://karanrajkr.hashnode.dev/my-first-year-of-engineering" },
      { source: "devto", url: "https://dev.to/karanrajkr/my-first-year-of-engineering-what-i-built-won-and-actually-learned-1473" }
    ]
  }
];

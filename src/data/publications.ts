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
    slug: "open-loop-2026-formpilot-winner",
    title: "We Scrapped 6 Hours of Work Mid-Hackathon. Then We Won 1st Place at Open Loop 2026.",
    excerpt: "Three first-year students scrapped six hours of work, pivoted at 5 PM, and won 1st place at Open Loop 2026 with FormPilot, an AI Chrome extension.",
    publishedDate: "2026-07-09",
    platforms: [
      { source: "hashnode", url: "https://karanrajkr.hashnode.dev/open-loop-2026-formpilot-winner" },
      { source: "devto", url: "https://dev.to/karanrajkr/we-scrapped-6-hours-of-work-mid-hackathon-then-we-won-1st-place-at-open-loop-2026-2b17" }
    ]
  },
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

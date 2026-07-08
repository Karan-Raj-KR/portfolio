export type Publication = {
  title: string;
  source: "hashnode" | "devto";
  url: string;
  publishedDate: string; // ISO date format YYYY-MM-DD
  excerpt: string;
  coverImage?: string;
};

export const publications: Publication[] = [
  {
    title: "Building KĀRYO: Automating Law Firm Operations",
    source: "hashnode",
    url: "https://karanrajkr.hashnode.dev/hello-world",
    publishedDate: "2026-07-05",
    excerpt: "A deep dive into how we built KĀRYO to solve workflow bottlenecks for local law firms using AI and Next.js.",
    coverImage: "/og-image.jpg" // Using default OG image as placeholder
  }
];

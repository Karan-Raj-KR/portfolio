export type GalleryCategory =
  | "portraits"
  | "awards"
  | "projects";

export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  alt: string;
  caption: string;
  description: string;
  category: GalleryCategory;
  categoryLabel: string;
  date: string;
  width: number;
  height: number;
  relatedUrl?: string;
  eventOrProject?: string;
  isPortrait?: boolean;
}

export const galleryCategories: { id: GalleryCategory | "all"; label: string }[] = [
  { id: "all", label: "All Media & Assets" },
  { id: "portraits", label: "Professional Portraits" },
  { id: "awards", label: "Awards & Credentials" },
  { id: "projects", label: "Projects & Engineering" },
];

/**
 * Genuine media items featuring Karan Raj KR and verified project milestones.
 * Only genuine photographs and verified assets are included.
 */
export const galleryItems: GalleryItem[] = [
  {
    id: "karan-raj-kr-portrait",
    imageUrl: "/karan-raj-kr-ai-engineer.jpeg",
    title: "Karan Raj KR — Event Speaking & Professional Portrait",
    alt: "Karan Raj KR speaking into a microphone on stage at a technology event, AI engineer and backend developer based in Bengaluru",
    caption: "Karan Raj KR speaking on stage at a technology event in Bengaluru. AI Engineer, Backend Developer, and Founder of KĀRYO.",
    description: "Official event speaking photograph and primary identity portrait of Karan Raj KR addressing an audience.",
    category: "portraits",
    categoryLabel: "Professional Portraits",
    date: "2026-04-26",
    width: 900,
    height: 1200,
    relatedUrl: "/about",
    eventOrProject: "Tech Event & Keynote",
    isPortrait: true,
  },
  {
    id: "open-loop-winner-certificate",
    imageUrl: "/Karan-certificate.png",
    title: "Open Loop Hackathon 2026 Winner Certificate",
    alt: "Certificate of Achievement awarded to Karan Raj KR for winning 1st Place at Open Loop 2026 Hackathon",
    caption: "First Place Winner Certificate awarded to Karan Raj KR at Open Loop 2026 (YenTech, Yenepoya Institute of Technology), where Karan Raj KR, Havinash and Saagnik ranked #1 out of 121 teams from 14 states.",
    description: "Official Certificate of Achievement presented to Karan Raj KR for securing 1st place in Open Loop 2026 national hackathon.",
    category: "awards",
    categoryLabel: "Awards & Credentials",
    date: "2026-04-26",
    width: 600,
    height: 800,
    relatedUrl: "/hackathons/open-loop-2026",
    eventOrProject: "Open Loop Hackathon 2026",
  },
  {
    id: "formpilot-architecture-diagram",
    imageUrl: "/architecture-image.png",
    title: "FormPilot Technical Architecture Diagram",
    alt: "System architecture diagram of FormPilot, built by Karan Raj KR, Havinash and Saagnik",
    caption: "Technical architecture diagram of FormPilot, detailing the Manifest V3 Vite/React popup UI, background service workers, and DOM content script automation pipeline.",
    description: "Engineering architecture diagram illustrating the client-side execution lifecycle and LLM context extraction pipeline of FormPilot.",
    category: "projects",
    categoryLabel: "Projects & Engineering",
    date: "2026-04-26",
    width: 1586,
    height: 856,
    relatedUrl: "/projects/formpilot",
    eventOrProject: "FormPilot Chrome Extension",
  },
];

import React from "react";
import { personSameAs } from "@/lib/social";
import { galleryItems } from "@/data/gallery";
import { projects } from "@/data/projects";

export const CANONICAL_PERSON_ID = "https://www.karanrajkr.com/#person";
export const CANONICAL_WEBSITE_ID = "https://www.karanrajkr.com/#website";

export function SiteJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": CANONICAL_PERSON_ID,
    name: "Karan Raj KR",
    alternateName: ["Karan Raj K R", "Karan Raj"],
    url: "https://www.karanrajkr.com",
    image: "https://www.karanrajkr.com/karan-raj-kr-ai-engineer.jpeg",
    jobTitle: "Founder, KĀRYO",
    description:
      "Karan Raj KR is Founder, KĀRYO; a builder, hackathon winner, open-source contributor and content creator from Gubbi, Tumkur. B.Tech CSE (AI/ML), NIAT–S-VYASA, Bengaluru, batch 2025–29. Running for EDC (Entrepreneurship Development Cell) President. 6 figures in revenue through agencies and products. 18 merged PRs in GSSoC 2026.",
    worksFor: {
      "@type": "Organization",
      name: "KĀRYO",
      url: "https://www.karanrajkr.com",
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "NIAT–S-VYASA University",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      addressCountry: "IN",
    },
    homeLocation: { "@type": "Place", name: "Gubbi, Tumkur" },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      name: "B.Tech CSE (AI/ML), NIAT–S-VYASA, Bengaluru · Batch 2025–29 · In progress",
      credentialCategory: "Degree in progress",
    },
    award: [
      "GRIT Awards 2026 — Content",
      "GRIT Awards 2026 — Hackathons",
      "Technology Innovators Award — 10 Aug 2026",
      "Open Loop 2026 — 1st place with Havinash and Saagnik",
      "Ideathon — Winner",
      "Hack BLR 2026 — Top 40, solo, of 2,500+ teams",
      "OpenAI DevDay Exchange community hackathon — Top 50, Bengaluru, 10 Oct 2026",
    ],
    knowsAbout: [
      "Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Python", "FastAPI",
      "Groq", "NVIDIA NIM", "CrewAI", "MCP", "Claude Code", "Vercel", "Docker", "AWS Bedrock",
    ],
    sameAs: personSameAs,
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KĀRYO",
    url: "https://www.karanrajkr.com",
    logo: "https://www.karanrajkr.com/og-image.png",
    description: "A digital studio helping local businesses build high-performance online presence.",
    foundingDate: "2025-08",
    founder: {
      "@id": CANONICAL_PERSON_ID,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": CANONICAL_WEBSITE_ID,
    name: "Karan Raj KR | Portfolio",
    url: "https://www.karanrajkr.com",
    author: {
      "@id": CANONICAL_PERSON_ID,
    },
    publisher: {
      "@id": CANONICAL_PERSON_ID,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.karanrajkr.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([personSchema, orgSchema, websiteSchema]),
      }}
    />
  );
}

export function ProfilePageJsonLd() {
  const profilePageSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": "https://www.karanrajkr.com/about#profilepage",
    url: "https://www.karanrajkr.com/about",
    name: "About Karan Raj KR",
    description:
      "Background, engineering focus, hackathon accomplishments, and verified social profiles for Karan Raj KR.",
    mainEntity: {
      "@id": CANONICAL_PERSON_ID,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
    />
  );
}

export function GalleryJsonLd() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "@id": "https://www.karanrajkr.com/gallery#gallery",
    name: "Karan Raj KR — Media & Photography Gallery",
    description:
      "Verified photographs, certificates, and technical engineering diagrams for Karan Raj KR.",
    url: "https://www.karanrajkr.com/gallery",
    author: {
      "@id": CANONICAL_PERSON_ID,
    },
    image: galleryItems.map((item) => ({
      "@type": "ImageObject",
      contentUrl: `https://www.karanrajkr.com${item.imageUrl}`,
      name: item.title,
      caption: item.caption,
      description: item.description,
      datePublished: item.date,
      width: item.width,
      height: item.height,
      author: {
        "@id": CANONICAL_PERSON_ID,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }}
    />
  );
}

export function ProjectJsonLd() {
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Projects by Karan Raj KR",
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "SoftwareApplication",
        name: project.title,
        description: project.overview,
        applicationCategory: project.slug === "formpilot" ? "BrowserExtension" : project.slug === "voicerx" ? "HealthApplication" : "BusinessApplication",
        url: `https://www.karanrajkr.com/projects/${project.slug}`,
        author: [
          { "@id": CANONICAL_PERSON_ID },
          ...(project.collaborators ?? []).map((name) => ({ "@type": "Person", name })),
        ],
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsSchema) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

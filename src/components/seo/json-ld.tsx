import React from "react";

export function SiteJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Karan Raj KR",
    "alternateName": "Karan Raj",
    "url": "https://www.karanrajkr.com",
    "image": "https://www.karanrajkr.com/karan-raj-kr-ai-engineer.jpeg",
    "jobTitle": "AI Engineer & Backend Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "KĀRYO"
    },
    "affiliation": {
      "@type": "CollegeOrUniversity",
      "name": "NIAT–S-VYASA University"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bengaluru",
      "addressCountry": "IN"
    },
    "knowsAbout": [
      "Artificial Intelligence",
      "Backend Development",
      "Python",
      "FastAPI",
      "Next.js",
      "Machine Learning",
      "Large Language Models (LLMs)"
    ],
    "sameAs": [
      "https://github.com/Karan-Raj-KR",
      "https://linkedin.com/in/karanrajkr",
      "https://twitter.com/karan_raj_kr",
      "https://instagram.com/karan.rajkr",
      "https://karanrajkr.hashnode.dev",
      "https://dev.to/karanrajkr",
      "https://youtube.com/@KaranRajKR"
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KĀRYO",
    url: "https://www.karanrajkr.com",
    logo: "https://www.karanrajkr.com/og-image.jpg",
    description: "A digital studio helping local businesses get online.",
    founders: [
      {
        "@type": "Person",
        name: "Karan Raj KR",
      },
      {
        "@type": "Person",
        name: "Havinash",
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Karan Raj KR - Portfolio",
    url: "https://www.karanrajkr.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.karanrajkr.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
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

export function ProjectJsonLd() {
  const projectsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        position: 1,
        name: "FormPilot",
        applicationCategory: "BrowserExtension",
        operatingSystem: "Chrome",
        url: "https://form-pilot.netlify.app/",
        author: {
          "@type": "Person",
          name: "Karan Raj KR",
        },
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "VoiceRx",
        applicationCategory: "HealthApplication",
        operatingSystem: "Web",
        author: {
          "@type": "Person",
          name: "Karan Raj KR",
        },
      },
      {
        "@type": "SoftwareApplication",
        position: 3,
        name: "KĀRYO Lead Intelligence Agent",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        author: {
          "@type": "Person",
          name: "Karan Raj KR",
        },
      }
    ]
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

import React from "react";

export function SiteJsonLd() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "KĀRYO",
    url: "https://karanrajkr.com",
    logo: "https://karanrajkr.com/og-image.jpg",
    description: "A digital studio helping local businesses get online.",
    founders: [
      {
        "@type": "Person",
        name: "Karan Raj KR",
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Karan Raj KR - Portfolio",
    url: "https://karanrajkr.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://karanrajkr.com/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([orgSchema, websiteSchema]),
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

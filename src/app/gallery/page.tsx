import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { GalleryView } from "@/components/gallery/gallery-view";
import { GalleryJsonLd, BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Media & Photography Gallery",
  description:
    "Verified personal photographs, hackathon certificates, and technical engineering architecture diagrams for Karan Raj KR.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Media & Photography Gallery | Karan Raj KR",
    description:
      "Verified personal photographs, hackathon certificates, and technical engineering architecture diagrams for Karan Raj KR.",
    url: "https://www.karanrajkr.com/gallery",
    images: [
      {
        url: "https://www.karanrajkr.com/karan-raj-kr-ai-engineer.jpeg",
        width: 900,
        height: 1200,
        alt: "Karan Raj KR — Professional Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Media & Photography Gallery | Karan Raj KR",
    description:
      "Verified personal photographs, hackathon certificates, and technical engineering architecture diagrams for Karan Raj KR.",
    images: ["https://www.karanrajkr.com/karan-raj-kr-ai-engineer.jpeg"],
  },
};

export default function GalleryPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
      <Header />
      <GalleryJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Gallery", url: "https://www.karanrajkr.com/gallery" },
        ]}
      />
      <GalleryView />
    </main>
  );
}

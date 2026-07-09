import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata = {
  title: "Changelog",
  description: "A timeline of my releases, updates, and major milestones.",
  alternates: {
    canonical: "/changelog",
  },
};

export default function Changelog() {
  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Changelog", url: "https://www.karanrajkr.com/changelog" },
        ]}
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Changelog</h1>
      <p className="mb-12 text-lg text-muted-foreground">
        A timeline of my releases and updates.
      </p>

      {/* Future integration: Read from src/content/changelog */}
      <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
        Changelog coming soon.
      </div>
    </main>
  );
}

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata = {
  title: "Projects & Open Source",
  description: "A deep dive into my open-source contributions, hackathon wins, and personal projects.",
};

export default function ProjectsList() {
  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://karanrajkr.vercel.app/" },
          { name: "Projects", url: "https://karanrajkr.vercel.app/projects" },
        ]}
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Projects & Open Source</h1>
      <p className="mb-12 text-lg text-muted-foreground">
        Detailed case studies and links to my latest work.
      </p>

      {/* Future integration: Map over src/data/projects.ts here for a detailed view */}
      <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
        Project case studies coming soon.
      </div>
    </main>
  );
}

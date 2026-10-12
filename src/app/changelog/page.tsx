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

      <div className="rounded-xl border border-border p-8 text-muted-foreground">
        <ul className="space-y-6">
          <li><time dateTime="2026-10-10">10 Oct 2026</time><p className="mt-2 text-foreground">Top 50 · OpenAI DevDay Exchange community hackathon, Bengaluru.</p></li>
          <li><time dateTime="2026-08-10">10 Aug 2026</time><p className="mt-2 text-foreground">Technology Innovators Award.</p></li>
          <li><time dateTime="2026-07-09">9 Jul 2026</time><p className="mt-2 text-foreground">Published “We Scrapped 6 Hours of Work Mid-Hackathon. Then We Won...” on Hashnode.</p></li>
          <li><time dateTime="2026-07-06">6 Jul 2026</time><p className="mt-2 text-foreground">Published “My First Year of Engineering: What I Built, Won, and Actually Learned” on Hashnode.</p></li>
          <li><time dateTime="2026-04-25">25–26 Apr 2026</time><p className="mt-2 text-foreground">Open Loop 2026: 1st place with Havinash and Saagnik. Built FormPilot.</p></li>
          <li><time dateTime="2025-08">Aug 2025</time><p className="mt-2 text-foreground">Founded KĀRYO.</p></li>
        </ul>
      </div>
    </main>
  );
}

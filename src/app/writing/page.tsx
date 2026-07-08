import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata = {
  title: "Writing",
  description: "Essays, thoughts, and research notes on software, AI, and startups.",
};

export default function WritingList() {
  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://karanrajkr.com/" },
          { name: "Writing", url: "https://karanrajkr.com/writing" },
        ]}
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Writing</h1>
      <p className="mb-12 text-lg text-muted-foreground">
        Essays, thoughts, and research notes.
      </p>

      {/* Future integration: Read from src/content/writing */}
      <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
        Essays coming soon.
      </div>
    </main>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { projects } from "@/data/projects";

export const metadata = {
  title: "Projects",
  description: "Case studies of what I've built — hackathon wins, agents, and tools, each starting with what actually happened.",
};

export default function ProjectsList() {
  return (
    <main className="container mx-auto px-4 py-24 md:px-6">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://karanrajkr.com/" },
          { name: "Projects", url: "https://karanrajkr.com/projects" },
        ]}
      />
      <h1 className="mb-8 text-4xl font-bold tracking-tight">Projects</h1>
      <p className="mb-12 max-w-2xl text-lg text-muted-foreground">
        Each case study starts with what actually happened, not the feature list.
      </p>

      <div className="border-t border-border">
        {projects.map((project) => (
          <article key={project.slug} className="grid gap-3 border-b border-border py-8 md:grid-cols-[10rem_1fr] md:gap-10">
            <p className="font-mono text-xs leading-6 text-muted-foreground">{project.subtitle}</p>
            <div className="max-w-2xl">
              <h2 className="mb-2 text-2xl font-semibold tracking-tight">
                <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-muted-foreground">
                  {project.title}
                </Link>
              </h2>
              <p className="mb-4 leading-relaxed text-muted-foreground">{project.story}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
              >
                Case study <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

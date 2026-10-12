import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { Header } from "@/components/layout/header";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} Case Study | Karan Raj KR`,
    description: project.overview,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Karan Raj KR`,
      description: project.overview,
      url: `https://www.karanrajkr.com/projects/${slug}`,
      images: [
        {
          url:
            project.slug === "formpilot"
              ? "https://www.karanrajkr.com/architecture-image.png"
              : "https://www.karanrajkr.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `${project.title} by Karan Raj KR`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} Case Study | Karan Raj KR`,
      description: project.overview,
      images: [
        project.slug === "formpilot"
          ? "https://www.karanrajkr.com/architecture-image.png"
          : "https://www.karanrajkr.com/og-image.png",
      ],
    },
  };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.overview,
    applicationCategory:
      project.slug === "formpilot"
        ? "BrowserExtension"
        : project.slug === "voicerx"
        ? "HealthApplication"
        : "BusinessApplication",
    operatingSystem: "Web",
    author: [
      { "@type": "Person", "@id": "https://www.karanrajkr.com/#person", name: "Karan Raj KR", url: "https://www.karanrajkr.com" },
      ...(project.collaborators ?? []).map((name) => ({ "@type": "Person", name })),
    ],
    creator: [
      { "@id": "https://www.karanrajkr.com/#person" },
      ...(project.collaborators ?? []).map((name) => ({ "@type": "Person", name })),
    ],
    url: `https://www.karanrajkr.com/projects/${project.slug}`,
  };

  return (
    <main className="min-h-screen py-24">
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: "https://www.karanrajkr.com/" },
          { name: "Projects", url: "https://www.karanrajkr.com/projects" },
          { name: project.title, url: `https://www.karanrajkr.com/projects/${project.slug}` },
        ]}
      />

      <article className="container mx-auto px-4 md:px-6 max-w-4xl pt-8">
        <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>

        <header className="mb-16">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{project.title}</h1>
            <div className="flex gap-2">
              {project.metrics.slice(0, 2).map((metric, idx) => (
                <span key={idx} className="bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full text-sm font-medium">
                  {metric.value}
                </span>
              ))}
            </div>
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            {project.overview}
          </p>
          <div className="flex flex-wrap gap-4">
            {project.links.demo && (
              <Link href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                {project.slug === "school-erp" ? "View Demo" : "View Live"} <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {project.links.store && (
              <Link href={project.links.store} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                Chrome Web Store <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {project.links.code && (
              <Link href={project.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                Source Code <Github className="h-4 w-4" />
              </Link>
            )}
          </div>
        </header>

        <div className="mb-16">
          <ImagePlaceholder height="450px" text={`${project.title} Hero Image Placeholder`} />
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-2 space-y-12">
            {project.problem && (<section>
              <h2 className="text-2xl font-bold mb-4">The Problem</h2>
              <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
            </section>)}
            {project.solution && (<section>
              <h2 className="text-2xl font-bold mb-4">The Solution</h2>
              <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
            </section>)}
            {project.architecture && (<section>
              <h2 className="text-2xl font-bold mb-4">Architecture</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{project.architecture}</p>
              {project.slug === "formpilot" ? (
                <figure className="space-y-2">
                  <Image
                    src="/architecture-image.png"
                    alt="FormPilot team project architecture diagram"
                    width={1200}
                    height={675}
                    className="w-full h-auto rounded-xl border border-border mb-2 bg-muted/5"
                  />
                  <figcaption className="text-xs text-muted-foreground text-center">
                    FormPilot System Architecture Diagram
                  </figcaption>
                </figure>
              ) : (
                <ImagePlaceholder height="300px" text="Architecture Diagram Placeholder" />
              )}
            </section>)}
          </div>

          <aside className="space-y-8">
            {project.timeline && (<div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Timeline</h3>
              <p className="text-muted-foreground">{project.timeline}</p>
            </div>)}
            {project.techStack.length > 0 && (<div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Tech Stack</h3>
              <ul className="flex flex-wrap gap-2">
                {project.techStack.map(tech => (
                  <li key={tech} className="bg-muted/10 border border-border px-3 py-1 rounded-md text-sm text-muted-foreground">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>)}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Key Features</h3>
              <ul className="list-disc pl-4 text-muted-foreground space-y-2 text-sm">
                {project.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <div className="space-y-12 border-t border-border pt-12">
          {project.challenges && (<section>
            <h2 className="text-2xl font-bold mb-4">Engineering Challenges</h2>
            <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
          </section>)}

          {project.results && (<section>
            <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
            <p className="text-muted-foreground leading-relaxed">{project.results}</p>
          </section>)}

          {project.lessons && (<section className="bg-muted/5 border border-border rounded-xl p-8">
            <h2 className="text-xl font-bold mb-3">Lessons Learned</h2>
            <p className="text-muted-foreground leading-relaxed">{project.lessons}</p>
          </section>)}
        </div>
      </article>
    </main>
  );
}

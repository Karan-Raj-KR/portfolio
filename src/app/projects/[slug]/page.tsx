import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

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
        title: `${project.title} — Case Study`,
        description: project.overview,
        alternates: {
            canonical: `/projects/${slug}`,
        },
    };
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main id="main" className="min-h-screen py-24">
            <BreadcrumbJsonLd
                items={[
                    { name: "Home", url: "https://www.karanrajkr.com/" },
                    { name: "Projects", url: "https://www.karanrajkr.com/projects" },
                    { name: project.title, url: `https://www.karanrajkr.com/projects/${project.slug}` },
                ]}
            />
            
            <article className="container mx-auto px-4 md:px-6 max-w-4xl">
                <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-12 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back to work
                </Link>

                <header className="mb-16">
                    <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">
                        {project.context} · {project.timeline}
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em]">{project.title}</h1>
                    {project.outcome && (
                        <p className="mt-4 text-sm font-semibold text-accent-signal">{project.outcome}</p>
                    )}
                    <p className="text-xl text-muted-foreground leading-relaxed mt-6 mb-8 max-w-[62ch]">
                        {project.overview}
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {project.links.store && (
                            <Link href={project.links.store} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90">
                                Chrome Web Store <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                        {project.links.demo && (
                            <Link href={project.links.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90">
                                View Live <ExternalLink className="h-4 w-4" />
                            </Link>
                        )}
                        {project.links.code && (
                            <Link href={project.links.code} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                                Source Code <Github className="h-4 w-4" />
                            </Link>
                        )}
                    </div>
                </header>

                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    <div className="md:col-span-2 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold mb-4">The Problem</h2>
                            <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
                            <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
                        </section>
                        <section>
                            <h2 className="text-2xl font-bold mb-4">Architecture</h2>
                            <p className="text-muted-foreground leading-relaxed">{project.architecture}</p>
                        </section>
                    </div>
                    
                    <aside className="space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Timeline</h3>
                            <p className="text-muted-foreground">{project.timeline}</p>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Tech Stack</h3>
                            <ul className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <li key={tech} className="bg-muted/10 border border-border px-3 py-1 rounded-md text-sm text-muted-foreground">
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </div>
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
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Engineering Challenges</h2>
                        <p className="text-muted-foreground leading-relaxed">{project.challenges}</p>
                    </section>
                    
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Results & Impact</h2>
                        <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                    </section>
                    
                    <section className="bg-muted/5 border border-border rounded-xl p-8">
                        <h2 className="text-xl font-bold mb-3">Lessons Learned</h2>
                        <p className="text-muted-foreground leading-relaxed">{project.lessons}</p>
                    </section>
                </div>
            </article>
        </main>
    );
}

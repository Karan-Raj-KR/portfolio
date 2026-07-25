import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectJsonLd } from "@/components/seo/json-ld";

export function Projects() {
    return (
        <section id="work" className="container mx-auto max-w-5xl px-6 py-16 md:py-20 lg:px-8">
            <ProjectJsonLd />
            <h2 className="text-3xl font-bold tracking-[-0.02em] md:text-4xl">Work</h2>

            <ul className="mt-12">
                {projects.map((project) => (
                    <li
                        key={project.slug}
                        className="reveal border-t border-border py-10 first:border-t-0 first:pt-0"
                    >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <h3 className="text-xl font-semibold md:text-2xl">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="underline-offset-4 hover:underline hover:decoration-accent-signal"
                                >
                                    {project.title}
                                </Link>
                            </h3>
                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                {project.context}
                            </span>
                        </div>

                        <p className="mt-3 max-w-[62ch] text-muted-foreground">
                            {project.description}
                        </p>

                        {project.outcome && (
                            <p className="mt-3 text-sm font-semibold text-accent-signal">
                                {project.outcome}
                            </p>
                        )}

                        <p className="mt-4 font-mono text-xs text-muted-foreground">
                            {project.techStack.join(" · ")}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                            <Link
                                href={`/projects/${project.slug}`}
                                className="font-medium underline-offset-4 hover:underline"
                            >
                                Case study
                            </Link>
                            {project.links.store && (
                                <a
                                    href={project.links.store}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                                >
                                    Chrome Web Store
                                </a>
                            )}
                            {project.links.demo && (
                                <a
                                    href={project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                                >
                                    Live demo
                                </a>
                            )}
                            {project.links.code && (
                                <a
                                    href={project.links.code}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                                >
                                    Source
                                </a>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            <p className="mt-12 text-sm text-muted-foreground">
                More at{" "}
                <a
                    href="https://github.com/Karan-Raj-KR"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground underline decoration-accent-signal underline-offset-4"
                >
                    github.com/Karan-Raj-KR
                </a>
                .
            </p>
        </section>
    );
}

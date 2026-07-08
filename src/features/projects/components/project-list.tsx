"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";
import { projects } from "@/data/projects";
import { ProjectJsonLd } from "@/components/seo/json-ld";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.07,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function Projects() {
    return (
        <section id="projects" className="container mx-auto px-4 py-24 md:px-6">
            <ProjectJsonLd />
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                    Selected Work
                </h2>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    Deep dives into the technical architecture, challenges, and measurable impact of my featured projects.
                </p>
            </motion.div>

            <motion.div
                className="grid gap-8 md:grid-cols-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
            >
                {projects.map((project) => (
                    <motion.div key={project.title} variants={itemVariants} className="flex h-full">
                        <Tilt className="group relative flex w-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted/10 p-8 hover:bg-muted/20 transition-colors">
                            <div>
                                <div className="mb-4 flex items-baseline justify-between">
                                    <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-medium text-muted-foreground">{project.subtitle}</span>
                                </div>
                                
                                {project.metrics && project.metrics.length > 0 && (
                                    <div className="mb-6 flex gap-4">
                                        {project.metrics.map((metric, idx) => (
                                            <div key={idx} className="flex flex-col">
                                                <span className="text-xs text-muted-foreground uppercase tracking-wider">{metric.label}</span>
                                                <span className="text-sm font-bold text-foreground">{metric.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p className="mb-6 text-muted-foreground leading-relaxed">
                                    {project.overview}
                                </p>

                                <div className="mb-8 flex flex-wrap gap-2">
                                    {project.tags.slice(0, 4).map((tag) => (
                                        <span key={tag} className="text-xs text-primary/80 font-mono">
                                            #{tag}
                                        </span>
                                    ))}
                                    {project.tags.length > 4 && (
                                        <span className="text-xs text-muted-foreground font-mono">
                                            +{project.tags.length - 4} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-6 mt-auto">
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                                    aria-label={`Read Case Study for ${project.title}`}
                                >
                                    Read Case Study <ArrowRight className="h-4 w-4" />
                                </Link>

                                <div className="flex gap-4">
                                    {project.links.demo && (
                                        <Link
                                            href={project.links.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            aria-label={`Live Demo of ${project.title}`}
                                        >
                                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                        </Link>
                                    )}
                                    {project.links.code && (
                                        <Link
                                            href={project.links.code}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            aria-label={`Source Code for ${project.title}`}
                                        >
                                            <Github className="h-4 w-4" aria-hidden="true" />
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Tilt>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

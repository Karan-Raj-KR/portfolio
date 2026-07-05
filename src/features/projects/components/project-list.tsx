"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";
import { projects } from "@/data/projects";

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
                    A selection of projects I&apos;ve built while experimenting with ideas and technologies.
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
                    <motion.div key={project.title} variants={itemVariants}>
                        <Tilt className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-border bg-muted/10 p-8 hover:bg-muted/20 transition-colors">
                            <div>
                                <div className="mb-6 flex items-baseline justify-between">
                                    <h3 className="text-2xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                                        {project.title}
                                    </h3>
                                    <span className="text-xs font-medium text-muted-foreground">{project.subtitle}</span>
                                </div>

                                <p className="mb-6 text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>

                                <div className="mb-8 flex flex-wrap gap-2">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="text-xs text-primary/80 font-mono">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                {project.links.demo && (
                                    <Link
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-4"
                                        aria-label={`Live Demo of ${project.title}`}
                                    >
                                        Live Demo <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                    </Link>
                                )}
                                {project.links.store && (
                                    <Link
                                        href={project.links.store}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-4"
                                        aria-label={`View ${project.title} on Chrome Web Store`}
                                    >
                                        Chrome Web Store <ExternalLink className="h-3 w-3" aria-hidden="true" />
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
                                        Source Code <Github className="h-3 w-3" aria-hidden="true" />
                                    </Link>
                                )}
                            </div>
                        </Tilt>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";
import { useHoverSound } from "@/components/providers/sound-provider";

const projects = [
    {
        title: "Modern Portfolio V1",
        subtitle: "A personal identity on the web",
        description: "A high-end, interactive portfolio website showcasing skills and projects with a focus on performant animations and clean typography.",
        tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
        links: { demo: "/", code: "https://github.com/Karan-Raj-KR" },
    },
    {
        title: "SaaS Landing Page",
        subtitle: "High-conversion marketing page",
        description: "A responsive landing page for a fictional SaaS product, featuring scroll-triggered animations and a modern pricing table.",
        tags: ["React", "TypeScript", "Vite"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR" },
    },
    {
        title: "Interactive Dashboard",
        subtitle: "Data visualization experiment",
        description: "A dark-mode dashboard exploring complex data visualization using D3.js wrapped in React components.",
        tags: ["React", "D3.js", "CSS Modules"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR" },
    },
    {
        title: "AI Chat Interface",
        subtitle: "Hackathon project runner-up",
        description: "An elegant chat interface for an LLM wrapper, focusing on streaming text effects and message states.",
        tags: ["Next.js", "OpenAI API", "Zustand"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR" },
    },
];

export function Projects() {
    const playHover = useHoverSound();
    
    return (
        <section id="projects" className="container mx-auto px-4 py-24 md:px-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-3xl font-bold tracking-tight md:text-5xl"
            >
                Selected Work
            </motion.h2>

            <div className="grid gap-8 md:grid-cols-2">
                {projects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
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
                                        onMouseEnter={() => playHover()}
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-4"
                                    >
                                        Live Demo <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                <Link
                                    href={project.links.code}
                                    target="_blank"
                                    onMouseEnter={() => playHover()}
                                    className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Source Code <Github className="h-3 w-3" />
                                </Link>
                            </div>
                        </Tilt>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

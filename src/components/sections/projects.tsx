"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";

const projects = [
    {
        title: "VoiceRx",
        subtitle: "HackBLR 2026",
        description: "AI voice health assistant for patients without doctor access — built at HackBLR 2026",
        tags: ["FastAPI", "Vapi", "Qdrant", "Groq", "RAG"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/VoiceRx" },
    },
    {
        title: "KĀRYO Lead Intelligence Agent",
        subtitle: "Agentathon 2026",
        description: "4-agent CrewAI pipeline that qualifies local business leads and drafts personalized cold outreach — built for KĀRYO's real sales workflow. Includes self-correction loop and structured .docx output.",
        tags: ["CrewAI", "Groq", "Pydantic", "Python"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/karyo-agent" },
    },
    {
        title: "Court Backlog Predictor",
        subtitle: "Databricks Hackathon — solo build",
        description: "ML model predicting court case backlog trends — built solo at Databricks Hackathon",
        tags: ["PySpark", "MLflow", "Delta Lake", "Unity Catalog", "Jupyter"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/court-backlog-predictor" },
    },
    {
        title: "Attendance App",
        subtitle: "Full-stack attendance system",
        description: "Full-stack student attendance management system",
        tags: ["Python", "FastAPI"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/Attendance-App" },
    },
    {
        title: "Smart Bank Queue Management",
        subtitle: "Intelligent queue routing",
        description: "Intelligent queue routing system for banks to reduce customer wait time",
        tags: ["Python"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/smart-bank-queue-management" },
    },
    {
        title: "FLUX — Hand Fluid Sim",
        subtitle: "Hand-tracking WebGL fluid simulation",
        description: "Hand-tracking WebGL fluid simulation using real-time webcam input",
        tags: ["MediaPipe", "WebGL", "JavaScript"],
        links: { demo: "https://karanrajkr-flux.vercel.app", code: "https://github.com/Karan-Raj-KR/FLUX" },
    },
];

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
                    A selection of projects I've built while experimenting with ideas and technologies.
                </p>
            </motion.div>

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
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-4"
                                    >
                                        Live Demo <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                <Link
                                        href={project.links.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
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

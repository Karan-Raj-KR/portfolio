"use client";

import { motion, Variants } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";

const projects = [
    {
        title: "FormPilot",
        subtitle: "Chrome Extension · 2026",
        description: "AI-powered Chrome extension that scans any web form, understands field context with LLMs, and autofills inputs (including long text) with multi-profile support — 100% local, bring-your-own API key.",
        tags: ["Manifest V3", "React", "TypeScript", "TailwindCSS", "Vite", "LLM"],
        links: {
            demo: "https://form-pilot.netlify.app/",
            store: "https://chromewebstore.google.com/detail/formpilot/ffkpekcnpbafklidejfbhinahahaabfi",
            code: "https://github.com/Karan-Raj-KR/FormPilot",
        },
    },
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
        description: "FastAPI backend with student attendance tracking, session management, and a web dashboard. Covers marking, reporting, and class-level views — early backend project built end-to-end.",
        tags: ["Python", "FastAPI"],
        links: { demo: null, code: "https://github.com/Karan-Raj-KR/Attendance-App" },
    },
    {
        title: "Smart Bank Queue Management",
        subtitle: "Intelligent queue routing",
        description: "Queue routing system that assigns bank customers to tellers based on transaction type, estimated service time, and current load — reduces average wait time through priority-aware scheduling.",
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
                                    >
                                        Live Demo <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {project.links.store && (
                                    <Link
                                        href={project.links.store}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary hover:underline hover:underline-offset-4"
                                    >
                                        Chrome Web Store <ExternalLink className="h-3 w-3" />
                                    </Link>
                                )}
                                {project.links.code && (
                                    <Link
                                        href={project.links.code}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        Source Code <Github className="h-3 w-3" />
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

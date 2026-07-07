"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import {
    Code, FileJson, Terminal, Wind,
    Database, Cpu, Server, Layers, Workflow,
    MonitorSmartphone, LayoutTemplate, Atom, Triangle, MessageSquare, Sparkles, Bot, Link as LinkIcon, Code2, GitBranch, Github, Cloud, Rocket, Network
} from "lucide-react";

const skillCategories = [
    {
        title: "Languages & Frameworks",
        description: "Python, JavaScript/TypeScript, React, Next.js, FastAPI. The core building blocks for scalable backends and highly interactive frontends.",
    },
    {
        title: "AI & Data Engineering",
        description: "LLM Integration, RAG Pipelines, Prompt Engineering, CrewAI, Qdrant, Databricks. Bridging generative AI with robust data infrastructures.",
    },
    {
        title: "Infrastructure & Tooling",
        description: "Git, Vercel, n8n, REST APIs, Chrome Extensions. Focused on seamless deployment, automated workflows, and developer productivity.",
    }
];

const skillRows = [
    [
        { name: "JavaScript", icon: <FileJson className="h-4 w-4" /> },
        { name: "Python", icon: <Terminal className="h-4 w-4" /> },
        { name: "React", icon: <Atom className="h-4 w-4" /> },
        { name: "Next.js", icon: <Triangle className="h-4 w-4" /> },
        { name: "Node.js", icon: <Server className="h-4 w-4" /> },
        { name: "Tailwind CSS", icon: <Wind className="h-4 w-4" /> },
    ],
    [
        { name: "Prompt Engineering", icon: <MessageSquare className="h-4 w-4" /> },
        { name: "Generative AI", icon: <Sparkles className="h-4 w-4" /> },
        { name: "AI Agents", icon: <Bot className="h-4 w-4" /> },
        { name: "LLM Integration", icon: <LinkIcon className="h-4 w-4" /> },
        { name: "Claude Code", icon: <Code2 className="h-4 w-4" /> },
    ],
    [
        { name: "Git", icon: <GitBranch className="h-4 w-4" /> },
        { name: "GitHub", icon: <Github className="h-4 w-4" /> },
        { name: "Vercel", icon: <Cloud className="h-4 w-4" /> },
        { name: "Antigravity", icon: <Rocket className="h-4 w-4" /> },
        { name: "n8n", icon: <Workflow className="h-4 w-4" /> },
        { name: "MySQL", icon: <Database className="h-4 w-4" /> },
        { name: "REST APIs", icon: <Network className="h-4 w-4" /> },
    ]
];

function SkillChip({ skill, index }: { skill: { name: string, icon: React.ReactNode }; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            whileTap={{ scale: 0.92 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative cursor-pointer select-none"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    boxShadow: isHovered
                        ? "0 8px 30px -4px hsl(var(--foreground) / 0.15)"
                        : "0 0px 0px 0px hsl(var(--foreground) / 0)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-2.5 rounded-full border border-border bg-muted/20 px-5 py-3 backdrop-blur-sm transition-colors group-hover:border-foreground/30 group-hover:bg-muted/40 whitespace-nowrap"
            >
                <motion.span
                    animate={{
                        rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-muted-foreground transition-colors group-hover:text-foreground"
                >
                    {skill.icon}
                </motion.span>
                <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground md:text-base">
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    );
}

export function Skills() {
    const shouldReduceMotion = useReducedMotion();


    return (
        <section id="skills" className="w-full flex flex-col justify-center overflow-hidden py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16"
            >
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl break-words">Technical Arsenal</h2>
                <p className="max-w-2xl text-lg text-muted-foreground mb-12">
                    Technologies and architectures I use to build scalable backends, deploy AI agents, and ship full-stack applications.
                </p>


            </motion.div>

            <div className="relative flex flex-col gap-6 overflow-hidden pt-8">
                {/* Gradient Fades */}
                <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent" />

                {skillRows.map((row, rowIdx) => (
                    <div key={rowIdx} className="marquee-row relative flex w-full overflow-hidden flex-nowrap">
                        <div
                            className="marquee-track flex w-max"
                            style={{
                                animationDuration: shouldReduceMotion ? "0s" : `${rowIdx % 2 === 0 ? 30 : 40}s`,
                                animationPlayState: shouldReduceMotion ? "paused" : "running",
                                willChange: "transform",
                                transform: "translateZ(0)",
                            }}
                        >
                            {[...Array(4)].map((_, dupIdx) => (
                                <div key={dupIdx} className="flex gap-4 px-2" aria-hidden={dupIdx > 0 ? "true" : undefined}>
                                    {row.map((skill, i) => (
                                        <SkillChip key={`${skill.name}-${dupIdx}-${i}`} skill={skill} index={i} />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

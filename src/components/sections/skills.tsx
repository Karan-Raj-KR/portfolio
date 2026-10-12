"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { Triangle, Atom, FileJson, Wind, Database, Server, Cpu, Bot, Network, Code2, Cloud, Layers } from "lucide-react";

const skillRows = [
    [
        { name: "Next.js", icon: <Triangle className="h-4 w-4" /> },
        { name: "React", icon: <Atom className="h-4 w-4" /> },
        { name: "TypeScript", icon: <FileJson className="h-4 w-4" /> },
        { name: "Tailwind", icon: <Wind className="h-4 w-4" /> },
        { name: "Supabase", icon: <Database className="h-4 w-4" /> },
        { name: "Python/FastAPI", icon: <Server className="h-4 w-4" /> }
    ],
    [
        { name: "Groq", icon: <Cpu className="h-4 w-4" /> },
        { name: "NVIDIA NIM", icon: <Cpu className="h-4 w-4" /> },
        { name: "CrewAI", icon: <Bot className="h-4 w-4" /> },
        { name: "MCP", icon: <Network className="h-4 w-4" /> },
        { name: "Claude Code", icon: <Code2 className="h-4 w-4" /> }
    ],
    [
        { name: "Vercel", icon: <Cloud className="h-4 w-4" /> },
        { name: "Docker", icon: <Layers className="h-4 w-4" /> },
        { name: "AWS Bedrock", icon: <Cloud className="h-4 w-4" /> }
    ]
];

function SkillChip({ skill }: { skill: { name: string, icon: React.ReactNode } }) {
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
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl break-words">Skills</h2>
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
                                        <SkillChip key={`${skill.name}-${dupIdx}-${i}`} skill={skill} />
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

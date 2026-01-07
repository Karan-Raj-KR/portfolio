"use client";

import { motion } from "framer-motion";
import { Code, FileJson, Layout, Palette, Terminal, Workflow, Wind } from "lucide-react";

const skills = {
    "Web Fundamentals": [
        { name: "HTML", icon: <Code className="h-4 w-4" /> },
        { name: "CSS", icon: <Palette className="h-4 w-4" /> },
        { name: "JavaScript", icon: <FileJson className="h-4 w-4" /> },
        { name: "Tailwind CSS", icon: <Wind className="h-4 w-4" /> },
    ],
    "Programming": [
        { name: "Python", icon: <Terminal className="h-4 w-4" /> },
    ],
    "Automation & Tools": [
        { name: "n8n (workflow automation)", icon: <Workflow className="h-4 w-4" /> },
    ],
};

export function Skills() {
    return (
        <section id="skills" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-4xl"
            >
                <h2 className="mb-12 text-3xl font-bold tracking-tight md:text-5xl">Skills</h2>
                <div className="grid gap-12 md:grid-cols-1">
                    {Object.entries(skills).map(([category, items], index) => (
                        <div key={category} className="space-y-6">
                            <h3 className="text-xl font-medium text-muted-foreground">{category}</h3>
                            <div className="flex flex-wrap gap-4">
                                {items.map((skill, i) => (
                                    <motion.div
                                        key={skill.name}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 + i * 0.05 }}
                                        whileHover={{
                                            scale: 1.05,
                                            y: -2,
                                            borderColor: "rgba(255,255,255,0.4)",
                                            backgroundColor: "rgba(255,255,255,0.05)",
                                            boxShadow: "0 4px 20px -2px rgba(255, 255, 255, 0.1)"
                                        }}
                                        className="group flex cursor-default items-center gap-2 rounded-full border border-border bg-muted/20 px-5 py-2.5 text-sm backdrop-blur-sm transition-colors hover:bg-muted/40 md:text-base"
                                    >
                                        <span className="text-muted-foreground transition-colors group-hover:text-foreground">
                                            {skill.icon}
                                        </span>
                                        <span className="text-foreground/80 transition-colors group-hover:text-foreground">
                                            {skill.name}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 1 }}
                    className="mt-16 text-sm font-light text-muted-foreground/40 text-center md:text-left"
                >
                    Currently expanding my stack through projects and hands-on learning.
                </motion.p>
            </motion.div>
        </section>
    );
}

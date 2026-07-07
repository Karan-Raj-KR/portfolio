"use client";

import { motion, Variants } from "framer-motion";
import { Tilt } from "@/components/ui/tilt";
import { Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

const hackathons = [
    {
        title: "1st Place Winner",
        organization: "Open Loop Hackathon",
        date: "April 2026",
        description: "Built FormPilot, an AI-powered Chrome extension, competing against 120+ teams from 100+ colleges.",
        metric: "Rank 1 / 121 teams · 109 colleges · 14 states",
        link: "/hackathons/open-loop-2026"
    },
    {
        title: "Finalist",
        organization: "HackBLR 2026",
        date: "April 2026",
        description: "Selected as a finalist out of 2,500+ participants. Built VoiceRx, a voice-first health AI assistant solo.",
        metric: "Top 40 / 2500+"
    },
    {
        title: "Participant",
        organization: "Agentathon 2026",
        date: "2026",
        description: "Built a 4-agent CrewAI pipeline that qualifies local business leads and drafts personalized cold outreach.",
        metric: "Multi-Agent"
    },
    {
        title: "Participant",
        organization: "Databricks Hackathon",
        date: "2026",
        description: "Built Court Backlog Predictor ML pipeline using PySpark, MLflow, and Delta Lake.",
        metric: "Solo Build"
    }
];

export function Hackathon() {
    const containerVariants: Variants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    return (
        <section id="hackathon" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 pt-16"
            >
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80">
                    <Terminal className="h-4 w-4" />
                    Hackathons
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Competitive Building</h2>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    A look at the projects and prototypes I've built under intense time constraints.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            >
                {hackathons.map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Tilt className="flex h-full flex-col justify-between rounded-xl border border-border bg-muted/10 p-6 transition-colors hover:bg-muted/20">
                            <div>
                                <h3 className="mb-1 text-xl font-semibold text-foreground">{item.title}</h3>
                                <p className="mb-4 text-sm font-medium text-primary/80">{item.organization}</p>
                                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-border pt-4">
                                <span className="text-sm font-medium text-foreground">{item.metric}</span>
                                <span className="text-xs text-muted-foreground">{item.date}</span>
                            </div>
                            {item.link && (
                                <div className="mt-4 border-t border-border/50 pt-4">
                                    <Link
                                        href={item.link}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                                    >
                                        View Details <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </div>
                            )}
                        </Tilt>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

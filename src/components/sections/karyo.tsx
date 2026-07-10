"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Users, Clock, Sparkles, Building2, Cpu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tilt } from "@/components/ui/tilt";

const capabilities = [
    {
        icon: <Globe className="h-5 w-5" />,
        title: "Digital Infrastructure",
        description: "Modern, SEO-optimized web platforms built for speed and lead conversion.",
    },
    {
        icon: <Users className="h-5 w-5" />,
        title: "Client Acquisition",
        description: "Direct B2B sales operations, onboarding, and full digital transformation.",
    },
    {
        icon: <Cpu className="h-5 w-5" />,
        title: "Automated Workflows",
        description: "Internal AI agents and automation pipelines that drastically reduce overhead.",
    },
];

export function Karyo() {
    return (
        <section id="karyo" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-5xl"
            >
                <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-border pb-12">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80 uppercase tracking-wider"
                        >
                            <Building2 className="h-4 w-4" />
                            Entrepreneurship
                        </motion.div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-6xl break-words leading-tight">KĀRYO</h2>
                        <p className="mt-3 max-w-lg text-lg text-muted-foreground">
                            Digital Agency · Bangalore
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="https://www.karyo.in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                        >
                            Visit KĀRYO <ExternalLink className="h-4 w-4" />
                        </Link>
                    </motion.div>
                </div>

                <div className="mb-24">
                    <div className="max-w-3xl">
                        <h3 className="text-2xl font-semibold mb-6">The Mission</h3>
                        <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                            KĀRYO was founded by Havinash and me to solve a critical disconnect: local businesses in Bangalore have massive potential but lack the technical literacy to establish a robust online presence. 
                        </p>
                        <p className="text-lg leading-relaxed text-muted-foreground">
                            As Founder, I lead the technical architecture and digital strategy. We bypass traditional agency bloat by combining direct door-to-door client acquisition with rapid, AI-assisted development pipelines.
                        </p>
                    </div>
                </div>

                <div className="mb-12">
                    <h3 className="text-2xl font-semibold mb-8">Core Capabilities</h3>
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                        {capabilities.map((cap, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                            >
                                <Tilt className="group flex h-full flex-col rounded-xl border border-border bg-muted/10 p-8 transition-colors hover:bg-muted/20">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        {cap.icon}
                                    </div>
                                    <h4 className="mb-3 text-xl font-semibold text-foreground">{cap.title}</h4>
                                    <p className="text-base leading-relaxed text-muted-foreground">{cap.description}</p>
                                </Tilt>
                            </motion.div>
                        ))}
                    </div>
                </div>
                
                {/* Visual Asset */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative w-full h-[500px] rounded-xl overflow-hidden border border-border"
                >
                    <Image 
                        src="/images/karyo-image.png" 
                        alt="KĀRYO Client Dashboard" 
                        fill
                        className="object-cover"
                    />
                </motion.div>

            </motion.div>
        </section>
    );
}

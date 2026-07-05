"use client";

import { motion } from "framer-motion";
import { Activity, ArrowRight, Github } from "lucide-react";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function BuildingNow() {
    return (
        <section id="building-now" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-border bg-muted/5 p-6 md:p-12 overflow-hidden relative"
            >
                {/* Background decorative elements */}
                <div className="absolute right-0 top-0 -z-10 h-[300px] w-[300px] -translate-y-1/2 translate-x-1/3 rounded-full bg-primary/5 blur-[100px]" />
                
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="relative flex h-3 w-3">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium tracking-wide text-foreground uppercase">Building Now</span>
                        </div>
                        
                        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                            Next-Gen Developer Tools
                        </h2>
                        
                        <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
                            I am currently engineering an AI-first workflow engine that bridges the gap between local LLM execution and cloud-based CI/CD pipelines. This project focuses on minimizing developer friction through autonomous agent orchestration.
                        </p>

                        <div className="mb-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <Activity className="h-5 w-5 text-primary" />
                                <span className="font-medium">Status:</span>
                                <span className="text-muted-foreground">Core engine architecture (Active Development)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="h-5 w-5 rounded-full border-2 border-primary flex items-center justify-center">
                                    <div className="h-2 w-2 rounded-full bg-primary" />
                                </div>
                                <span className="font-medium">Tech Stack:</span>
                                <span className="text-muted-foreground">Rust, Next.js, LangChain</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link 
                                href="https://github.com/Karan-Raj-KR" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                            >
                                Follow Progress <Github className="h-4 w-4" />
                            </Link>
                            <Link 
                                href="#contact" 
                                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                Get Early Access <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                    
                    <div className="relative w-full">
                        <ImagePlaceholder height="400px" text="Architecture Diagram Placeholder" />
                        <div className="absolute -bottom-6 -left-6 rounded-xl border border-border bg-background p-4 shadow-xl">
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                    <Activity className="h-6 w-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Commits this week</p>
                                    <p className="text-2xl font-bold text-foreground">32+</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}

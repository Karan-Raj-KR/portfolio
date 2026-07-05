"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clock, Map } from "lucide-react";
import { roadmap } from "@/data/roadmap";

export function Roadmap() {
    return (
        <section id="roadmap" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-center"
            >
                <div className="mb-3 flex items-center justify-center gap-2 text-sm font-medium text-primary/80">
                    <Map className="h-4 w-4" />
                    Vision
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                    What's Next
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                    A transparent look at my current goals, upcoming product launches, and deep-dive technical research.
                </p>
            </motion.div>

            <div className="mx-auto max-w-3xl">
                {roadmap.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="relative flex gap-6 pb-12 last:pb-0"
                    >
                        {/* Timeline Line */}
                        {index !== roadmap.length - 1 && (
                            <div className="absolute left-[19px] top-8 bottom-0 w-px bg-border" />
                        )}

                        {/* Status Icon */}
                        <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background border border-border">
                            {item.status === "completed" ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            ) : item.status === "in-progress" ? (
                                <Clock className="h-5 w-5 text-primary animate-pulse" />
                            ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 pt-1">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                                <h3 className={`text-xl font-semibold ${item.status === "planned" ? "text-muted-foreground" : "text-foreground"}`}>
                                    {item.title}
                                </h3>
                                <span className="text-sm font-medium text-primary/80 bg-primary/10 px-3 py-1 rounded-full w-fit mt-2 md:mt-0">
                                    {item.quarter}
                                </span>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

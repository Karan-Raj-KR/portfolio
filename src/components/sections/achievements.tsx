"use client";

import { motion, Variants } from "framer-motion";
import { Tilt } from "@/components/ui/tilt";
import { achievements } from "@/data/achievements";
import { Trophy } from "lucide-react";

export function Achievements() {
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
        <section id="achievements" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12"
            >
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80">
                    <Trophy className="h-4 w-4" />
                    Featured Highlights
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Milestones & Impact</h2>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    A snapshot of recent competitive and professional accomplishments.
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            >
                {achievements.map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <Tilt className="flex h-full flex-col justify-between rounded-xl border border-border bg-muted/10 p-4 sm:p-6 transition-colors hover:bg-muted/20">
                            <div>
                                <h3 className="mb-1 text-xl font-semibold text-foreground">{item.title}</h3>
                                <p className="mb-4 text-sm font-medium text-primary/80">{item.organization}</p>
                                <p className="mb-6 text-sm leading-relaxed text-muted-foreground break-words">
                                    {item.description}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-border pt-4 gap-2 sm:gap-0">
                                <span className="text-sm font-medium text-foreground break-words">{item.metric}</span>
                                <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
                            </div>
                        </Tilt>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}

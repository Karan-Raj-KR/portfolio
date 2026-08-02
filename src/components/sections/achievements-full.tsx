"use client";

import { motion, Variants } from "framer-motion";
import { Trophy } from "lucide-react";
import { AchievementCard } from "@/components/sections/achievement-card";
import { achievementCategories, achievements } from "@/data/achievements";

export function AchievementsFull() {
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

    const groups = achievementCategories
        .map((category) => ({
            ...category,
            items: achievements.filter((item) => item.category === category.id),
        }))
        .filter((group) => group.items.length > 0);

    return (
        <section id="achievements" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 pt-16"
            >
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80">
                    <Trophy className="h-4 w-4" />
                    Achievements
                </div>
                <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">Milestones & Impact</h1>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    A complete record of what I&apos;ve won, shipped, and built — from national hackathon wins and
                    open-source contributions to running my own agency while studying. Each entry lists the scale it was
                    measured against, so the numbers speak for themselves.
                </p>
            </motion.div>

            <div className="flex flex-col gap-12">
                {groups.map((group, groupIndex) => (
                    <div
                        key={group.id}
                        className={groupIndex > 0 ? "border-t border-border pt-12" : undefined}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-6 flex items-baseline justify-between gap-4"
                        >
                            <h2 className="text-sm font-bold uppercase tracking-wider text-primary">
                                {group.label}
                            </h2>
                            <span className="text-xs text-muted-foreground shrink-0">
                                {group.items.length} {group.items.length === 1 ? "entry" : "entries"}
                            </span>
                        </motion.div>

                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                        >
                            {group.items.map((item, index) => (
                                <motion.div key={index} variants={itemVariants}>
                                    <AchievementCard item={item} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>
        </section>
    );
}

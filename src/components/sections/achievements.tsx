"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { Trophy, ArrowRight } from "lucide-react";
import { AchievementCard } from "@/components/sections/achievement-card";
import { featuredAchievements } from "@/data/achievements";

interface AchievementsProps {
    titleAs?: "h1" | "h2";
    title?: string;
    showViewAll?: boolean;
}

export function Achievements({
    titleAs: Title = "h2",
    title = "Milestones & Impact",
    showViewAll = true,
}: AchievementsProps = {}) {
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
                <Title className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{title}</Title>
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
                {featuredAchievements.map((item, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <AchievementCard item={item} />
                    </motion.div>
                ))}
            </motion.div>

            {showViewAll && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8"
                >
                    <Link
                        href="/achievements"
                        className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                    >
                        View all achievements <ArrowRight className="h-4 w-4" />
                    </Link>
                </motion.div>
            )}
        </section>
    );
}

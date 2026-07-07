"use client";

import { motion, Variants } from "framer-motion";

export function About() {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section id="about" className="container mx-auto flex min-h-[60vh] flex-col justify-center px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mx-auto max-w-4xl space-y-8 text-xl font-light leading-relaxed md:text-3xl text-muted-foreground break-words"
            >
                <motion.p variants={itemVariants}>
                    I'm Karan Raj KR — 18 years old, based in Bengaluru, and I've been building things since before I knew what a stack was.
                </motion.p>
                <motion.p variants={itemVariants}>
                    I'm a B.Tech CSE (AI/ML) student at NIAT–S-VYASA University, but most of what I've learned came from shipping real projects, competing in hackathons, and running a digital agency while juggling exams.
                </motion.p>
                <motion.p variants={itemVariants}>
                    This past year I won 1st place at Open Loop 2026 — a national hackathon with 309 participants across 109 colleges and 14 states. We built FormPilot, an AI Chrome extension that auto-fills web forms using LLMs. 80/100 score, ₹20,000 cash prize, beat 120 other teams.
                </motion.p>
                <motion.p variants={itemVariants}>
                    Before that I went solo at HackBLR 2026 with VoiceRx — a RAG-based voice health assistant — and landed Top 40 out of 2,500+ teams.
                </motion.p>
                <motion.p variants={itemVariants}>
                    I also co-founded KĀRYO, a digital agency where we help businesses build their online presence. Paying clients, shipped production work, real revenue.
                </motion.p>
                <motion.p variants={itemVariants}>
                    I write about what I build at <a href="https://karanrajkr.hashnode.dev" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-muted-foreground/30 underline-offset-4 hover:decoration-foreground">karanrajkr.hashnode.dev</a>
                </motion.p>
            </motion.div>
        </section>
    );
}

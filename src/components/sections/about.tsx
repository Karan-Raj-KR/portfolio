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
        <section id="about" className="container mx-auto flex min-h-[50vh] flex-col justify-center px-4 py-24 md:px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mx-auto max-w-4xl space-y-8 text-2xl font-light leading-relaxed md:text-4xl"
            >
                <motion.p variants={itemVariants}>
                    I’m <span className="text-foreground font-normal">Karan Raj</span>, a developer and builder currently in my first year of BTech in AI/ML.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground">
                    I learn by <span className="text-foreground font-normal">shipping</span>. Whether it's experimenting with new AI tools, building full-stack web apps, or managing client projects through my agency Karyo, I'm passionate about creating real products.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground/80">
                    I focus on solving real problems, turning ideas into software, and constantly pushing my skills through hackathons and community projects.
                </motion.p>
            </motion.div>
        </section>
    );
}

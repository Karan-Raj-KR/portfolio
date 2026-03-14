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
                    I’m <span className="text-foreground font-normal">Karan Raj</span>, a developer and builder studying AI/ML.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground">
                    I learn by <span className="text-foreground font-normal">shipping projects</span> and experimenting with new technologies.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground/90">
                    I build full-stack applications and collaborate with local businesses to establish their online presence through my agency, <span className="text-foreground font-normal">Karyo</span>.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground/80">
                    My focus is on solving real problems, competing in hackathons, and turning ideas into functioning software products.
                </motion.p>
            </motion.div>
        </section>
    );
}

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
                    I’m <span className="text-foreground font-normal">Karan Raj</span>, a frontend-focused developer with an <span className="text-foreground font-normal">AIML background</span>, currently in my first year of BTech.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground">
                    I enjoy building <span className="text-foreground font-normal">clean, interactive</span> web experiences where performance, usability, and design work together.
                </motion.p>
                <motion.p variants={itemVariants} className="text-muted-foreground/80">
                    I focus on writing maintainable code, designing thoughtful interfaces, and creating subtle interactions that feel <span className="text-foreground font-normal">natural</span> rather than forced.
                </motion.p>
            </motion.div>
        </section>
    );
}

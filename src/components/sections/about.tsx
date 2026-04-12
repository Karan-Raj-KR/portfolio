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
                    I’m <span className="text-foreground font-normal">Karan Raj K R</span> — 18, backend developer, and co-founder of <span className="text-foreground font-normal">KĀRYO</span>. I build with Python and FastAPI, compete at hackathons, and ship projects across ML, AI, and web. I don’t wait for the right moment — I build to learn, and I learn by building things that actually work.
                </motion.p>
            </motion.div>
        </section>
    );
}

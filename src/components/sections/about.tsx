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
        <section id="about" className="container mx-auto flex min-h-[60vh] flex-col justify-center px-4 py-24 md:px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="mx-auto max-w-4xl space-y-8 text-xl font-light leading-relaxed md:text-3xl text-muted-foreground"
            >
                <motion.p variants={itemVariants}>
                    I’m <span className="text-foreground font-normal">Karan Raj K R</span> — a backend engineer, AI researcher, and co-founder of <span className="text-foreground font-normal">KĀRYO</span>. I bridge the gap between complex technical infrastructure and tangible business impact. 
                </motion.p>
                <motion.p variants={itemVariants}>
                    My expertise lies in designing scalable systems with <span className="text-foreground font-normal">Python and FastAPI</span>, orchestrating <span className="text-foreground font-normal">multi-agent LLM pipelines</span>, and deploying robust data architectures. Whether I'm building a predictive ML model at a Databricks hackathon or securing 1st place with a complex Chrome Extension, my philosophy remains the same: execution over theory.
                </motion.p>
                <motion.p variants={itemVariants}>
                    Beyond code, I actively contribute to the open-source community through GSSoC, scale digital presences for local businesses, and constantly push the boundaries of what small, highly-technical teams can build. I don't wait for the right moment — I build to learn, and I learn by shipping products that work.
                </motion.p>
            </motion.div>
        </section>
    );
}

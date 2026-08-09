"use client";

import { motion } from "framer-motion";
import { Hammer } from "lucide-react";

export function Now() {
    return (
        <section id="now" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mx-auto max-w-4xl"
            >
                <div className="mb-6 flex items-center gap-2 text-sm font-medium text-primary/80 uppercase tracking-wider">
                    <Hammer className="h-4 w-4" />
                    Now
                </div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-5xl">Currently Building</h2>
                <p className="text-xl leading-relaxed text-muted-foreground md:text-2xl">
                    Currently building a production SaaS that automates agency client onboarding
                    end-to-end — document generation, e-signing, GST invoicing, and payment tracking.
                </p>
            </motion.div>
        </section>
    );
}

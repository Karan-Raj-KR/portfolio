"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative flex h-screen min-h-[800px] flex-col items-center justify-center overflow-hidden px-4 text-center md:px-6"
        >
            <motion.div
                style={{ y, opacity }}
                className="z-10 flex max-w-[1000px] flex-col items-center space-y-8"
            >
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
                >
                    I build <span className="text-muted-foreground/80">fast</span>,{" "}
                    <span className="text-muted-foreground/80">interactive</span>, and{" "}
                    <span className="text-muted-foreground/80">modern</span> web
                    experiences.
                </motion.h1>


                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="max-w-[600px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
                >
                    Frontend Developer · Interactive UI
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-sm font-light tracking-wide text-muted-foreground/60"
                >
                    First-year BTech AIML student passionate about clean design, performance, and interactivity.
                </motion.p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center gap-2">
                    <span className="text-xs font-light text-muted-foreground">SCROLL</span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <ArrowDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}

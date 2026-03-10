"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { useRef } from "react";
import { Magnetic } from "@/components/ui/magnetic";

const words = [
    { text: "I build ", highlight: false },
    { text: "fast", highlight: true },
    { text: ", ", highlight: false },
    { text: "interactive", highlight: true },
    { text: ", and ", highlight: false },
    { text: "modern", highlight: true },
    { text: " web experiences.", highlight: false },
];

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
                    className="text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl"
                >
                    {words.map((word, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{
                                duration: 0.6,
                                delay: 0.1 + i * 0.08,
                                ease: "easeOut",
                            }}
                            className={word.highlight ? "text-muted-foreground/80" : ""}
                        >
                            {word.text}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                    className="max-w-[600px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
                >
                    Frontend Developer · Interactive UI
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-sm font-light tracking-wide text-muted-foreground/60"
                >
                    First-year BTech AIML student passionate about clean design, performance, and interactivity.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex gap-8 pt-2"
                >
                    <Magnetic>
                        <a
                            href="#projects"
                            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                        >
                            View My Work
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a
                            href="#contact"
                            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-sm font-medium text-foreground transition-colors hover:bg-muted/30"
                        >
                            Get in Touch
                        </a>
                    </Magnetic>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
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

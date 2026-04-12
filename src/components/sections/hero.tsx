"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Github, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";

const words = [
    { text: "From ideas ", highlight: false },
    { text: "to real ", highlight: true },
    { text: "products.", highlight: false },
];

export function Hero() {
    const ref = useRef<HTMLDivElement>(null);
    const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

    const socialLinks = [
        {
            name: "GitHub",
            icon: <Github className="h-6 w-6" />,
            href: "https://github.com/Karan-Raj-KR",
            info: "github.com/Karan-Raj-KR",
        },
        {
            name: "LinkedIn",
            icon: <Linkedin className="h-6 w-6" />,
            href: "https://www.linkedin.com/in/karanrajkr/",
            info: "linkedin.com/in/karanrajkr",
        },
        {
            name: "Instagram",
            icon: <Instagram className="h-6 w-6" />,
            href: "https://www.instagram.com/karan.rajkr/",
            info: "@karan.rajkr",
        },
        {
            name: "Email",
            icon: <Mail className="h-6 w-6" />,
            href: "mailto:karanrajkr2008@gmail.com",
            info: "karanrajkr2008@gmail.com",
        },
    ];
    
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
                    className="pt-6 max-w-[600px] text-lg text-muted-foreground sm:text-xl md:text-2xl"
                >
                    Developer · Builder · Founder
                </motion.p>

                <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                    className="text-sm font-light tracking-wide text-muted-foreground/60"
                >
                    CSE student building backends, competing at hackathons, and shipping real products.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="flex gap-10 pb-20 pt-2"
                >
                    <Magnetic>
                        <a
                            href="#projects"
                            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full bg-foreground px-7 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
                        >
                            View Projects
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a
                            href="https://github.com/Karan-Raj-KR"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-7 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                        >
                            GitHub
                        </a>
                    </Magnetic>
                    <Magnetic>
                        <a
                            href="#contact"
                            className="relative z-10 inline-flex h-12 items-center justify-center rounded-full px-7 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                        >
                            Contact
                        </a>
                    </Magnetic>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-4 pt-12"
                >
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.name}
                                href={social.href}
                                target={social.name === "Email" ? undefined : "_blank"}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                onMouseEnter={() => setHoveredInfo(social.info)}
                                onMouseLeave={() => setHoveredInfo(null)}
                            >
                                {social.icon}
                                <span className="sr-only">{social.name}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="h-6">
                        <AnimatePresence mode="wait">
                            {hoveredInfo && (
                                <motion.span
                                    key={hoveredInfo}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-sm font-medium text-muted-foreground"
                                >
                                    {hoveredInfo}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2"
            >
                <div className="flex flex-col items-center">
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

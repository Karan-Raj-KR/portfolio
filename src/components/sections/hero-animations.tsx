"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { socialLinks } from "@/lib/social";

export function HeroAnimations({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section
            ref={ref}
            className="relative flex h-screen min-h-[800px] flex-col items-center justify-center overflow-hidden px-4 sm:px-8 md:px-6 lg:px-8 text-center"
        >
            <motion.div
                style={{ y, opacity }}
                className="z-10 flex max-w-[1000px] flex-col items-center space-y-8 mt-16 md:mt-24"
            >
                {children}

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col items-center gap-4 pt-2"
                >
                    <div className="flex items-center gap-6">
                        {socialLinks.map((social) => {
                            const Icon = social.icon;
                            return (
                                <Link
                                    key={social.name}
                                    href={social.href}
                                    target={social.name === "Email" ? undefined : "_blank"}
                                    rel={social.name === "Email" ? undefined : "noopener noreferrer"}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                    onMouseEnter={() => setHoveredInfo(social.info)}
                                    onMouseLeave={() => setHoveredInfo(null)}
                                >
                                    <Icon className="h-6 w-6" />
                                    <span className="sr-only">{social.name}</span>
                                </Link>
                            );
                        })}
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

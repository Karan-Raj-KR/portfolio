"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Magnetic } from "@/components/ui/magnetic";
import { socialLinks } from "@/lib/social";

export function Contact() {
    const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

    return (
        <section id="contact" className="container mx-auto px-4 py-32 md:px-6">
            <div className="flex flex-col items-center text-center space-y-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold tracking-tighter sm:text-6xl md:text-7xl"
                >
                    Let’s Build Something
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="max-w-[600px] text-lg text-muted-foreground md:text-xl space-y-4"
                >
                    <span className="block">I build backends, compete at hackathons, and co-run a digital agency in Bangalore. If you have something worth building — let's talk.</span>
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <Magnetic>
                        <Link
                            href="mailto:karanrajkr2008@gmail.com"
                            className="inline-flex h-14 items-center justify-center rounded-full bg-foreground px-8 text-base font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            Get in Touch
                        </Link>
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
            </div>
        </section>
    );
}

"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Users, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { Tilt } from "@/components/ui/tilt";

const services = [
    {
        icon: <Globe className="h-5 w-5" />,
        title: "Website Development",
        description: "Modern, mobile-responsive websites built for speed, trust, and local discoverability.",
    },
    {
        icon: <Users className="h-5 w-5" />,
        title: "Online Presence",
        description: "Google Business setup, Instagram, WhatsApp Business — we handle everything so the business owner doesn't have to.",
    },
    {
        icon: <Clock className="h-5 w-5" />,
        title: "Fast Delivery",
        description: "From first conversation to live website in 7–10 days. No agency bloat, no back-and-forth.",
    },
];

export function Karyo() {
    return (
        <section id="karyo" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-5xl"
            >
                <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80"
                        >
                            <Sparkles className="h-4 w-4" />
                            Co-founder — Your partner in building online presence
                        </motion.div>
                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl">KĀRYO</h2>
                        <p className="mt-3 max-w-lg text-lg text-muted-foreground">
                            Co-founder — Your partner in building online presence
                        </p>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="https://linktr.ee/Karyo"
                            target="_blank"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/20 px-6 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted/40"
                        >
                            Learn More <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.8 }}
                    className="mb-12 max-w-3xl text-xl font-light leading-relaxed text-muted-foreground md:text-2xl"
                >
                    <span className="text-foreground font-normal">KĀRYO</span> is a digital agency co-founded in Bangalore to solve a simple problem — most local businesses have no online presence, not because they don't want one, but because the process is overwhelming.
                    <br /><br />
                    We go directly to businesses, understand their needs, and build their online presence from scratch. Websites, social media, Google Business — end to end.
                </motion.p>

                <div className="grid gap-6 md:grid-cols-3">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                        >
                            <Tilt className="group flex h-full flex-col rounded-xl border border-border bg-muted/10 p-8 transition-colors hover:bg-muted/20">
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-muted/30 text-foreground transition-colors group-hover:text-primary">
                                    {service.icon}
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-foreground">{service.title}</h3>
                                <p className="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                            </Tilt>
                        </motion.div>
                    ))}
                </div>

            </motion.div>
        </section>
    );
}

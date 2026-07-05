"use client";

import { motion } from "framer-motion";
import { Mic, MapPin, Calendar } from "lucide-react";
import { communityEvents } from "@/data/community";

export function Community() {
    return (
        <section id="community" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
            >
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80">
                    <Mic className="h-4 w-4" />
                    Community & Leadership
                </div>
                <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
                    Speaking & Events
                </h2>
                <p className="max-w-2xl text-lg text-muted-foreground">
                    Hackathons, open-source contributions, and community involvement.
                </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {communityEvents.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="group relative overflow-hidden rounded-xl border border-border bg-muted/5 p-6 hover:bg-muted/10 transition-colors"
                    >
                        <div className="mb-4 flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                {event.role}
                            </span>
                        </div>
                        <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {event.title}
                        </h3>
                        <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                            {event.description}
                        </p>
                        <div className="mt-auto flex flex-col gap-2 border-t border-border/50 pt-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

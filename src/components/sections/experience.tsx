"use client";

import { motion } from "framer-motion";

const experience = [
    {
        role: "BTech Student (Artificial Intelligence & Machine Learning)",
        period: "2025 – 2029",
        company: "Engineering",
        description: [
            "Pursuing a Bachelor's degree in Artificial Intelligence & Machine Learning",
            "Building web and AI projects alongside academic coursework",
            "Exploring automation tools, AI agents, and modern developer workflows",
            "Participating in hackathons and developer communities",
        ],
    },
    {
        role: "Freelance Web Developer",
        period: "2021 – 2023",
        company: "Self-Employed",
        description: [
            "Designed and delivered websites for individuals and small businesses",
            "Built responsive websites using modern web technologies",
            "Collaborated directly with clients to understand requirements and deliver solutions",
            "Completed multiple freelance projects independently",
        ],
    },
    {
        role: "Freelance Video Editor & Graphic Designer",
        period: "2021 – 2023",
        company: "Self-Employed",
        description: [
            "Worked with clients on video editing and graphic design projects",
            "Produced visual content based on client requirements and feedback",
            "Gained early experience managing client relationships and deadlines",
        ],
    },
];

export function Experience() {
    return (
        <section id="experience" className="container mx-auto px-4 py-24 md:px-6">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 text-3xl font-bold tracking-tight md:text-5xl"
            >
                Work & Experience
            </motion.h2>

            <div className="relative border-l border-border ml-3 md:ml-6 space-y-16">
                {experience.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="relative pl-8 md:pl-12"
                    >
                        <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-muted-foreground ring-4 ring-background" />
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <h3 className="text-xl font-semibold text-foreground">{item.role}</h3>
                            <span className="text-sm font-light text-muted-foreground">{item.period}</span>
                        </div>
                        <div className="mb-4 text-base font-medium text-muted-foreground/80">{item.company}</div>
                        <ul className="max-w-2xl text-muted-foreground dark:text-gray-400 list-disc pl-4 space-y-1">
                            {item.description.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
    Code, FileJson, Palette, Terminal, Wind,
    Database, Cpu, Server, Layers, Workflow,
} from "lucide-react";

const allSkills = [
    { name: "HTML", icon: <Code className="h-4 w-4" /> },
    { name: "CSS", icon: <Palette className="h-4 w-4" /> },
    { name: "JavaScript", icon: <FileJson className="h-4 w-4" /> },
    { name: "React.js", icon: <Layers className="h-4 w-4" /> },
    { name: "Node.js", icon: <Server className="h-4 w-4" /> },
    { name: "Tailwind CSS", icon: <Wind className="h-4 w-4" /> },
    { name: "Python", icon: <Terminal className="h-4 w-4" /> },
    { name: "C++", icon: <Cpu className="h-4 w-4" /> },
    { name: "MySQL", icon: <Database className="h-4 w-4" /> },
    { name: "n8n", icon: <Workflow className="h-4 w-4" /> },
];

function SkillChip({ skill, index }: { skill: typeof allSkills[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 300, damping: 20 });
    const springY = useSpring(y, { stiffness: 300, damping: 20 });

    const rotateX = useTransform(springY, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(springX, [-0.5, 0.5], ["-8deg", "8deg"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(px);
        y.set(py);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0, rotate: -10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: index * 0.06,
            }}
            whileTap={{ scale: 0.92 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className="group relative cursor-pointer select-none"
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.12 : 1,
                    boxShadow: isHovered
                        ? "0 8px 30px -4px hsl(var(--foreground) / 0.15)"
                        : "0 0px 0px 0px hsl(var(--foreground) / 0)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="flex items-center gap-2.5 rounded-full border border-border bg-muted/20 px-5 py-3 backdrop-blur-sm transition-colors group-hover:border-foreground/30 group-hover:bg-muted/40"
            >
                <motion.span
                    animate={{
                        rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                        scale: isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-muted-foreground transition-colors group-hover:text-foreground"
                >
                    {skill.icon}
                </motion.span>
                <span className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-foreground md:text-base">
                    {skill.name}
                </span>
            </motion.div>
        </motion.div>
    );
}

export function Skills() {
    return (
        <section id="skills" className="container mx-auto px-4 py-24 md:px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mx-auto max-w-4xl"
            >
                <h2 className="mb-10 text-3xl font-bold tracking-tight md:text-5xl">Skills</h2>

                <div className="flex flex-wrap gap-3 md:gap-4">
                    {allSkills.map((skill, i) => (
                        <SkillChip key={skill.name} skill={skill} index={i} />
                    ))}
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-10 text-sm font-light text-muted-foreground/40 text-center md:text-left"
                >
                    Currently expanding my stack through projects and hands-on learning.
                </motion.p>
            </motion.div>
        </section>
    );
}

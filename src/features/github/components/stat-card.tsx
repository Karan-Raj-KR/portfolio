"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
    value: number;
    label: string;
    hint: string;
    index: number;
}

function useCountUp(target: number, start: boolean, reduced: boolean): number {
    const [value, setValue] = useState(target);

    useEffect(() => {
        if (!start || reduced || target === 0) return;
        let frameId = 0;
        const begin = performance.now();
        const duration = 500;
        const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
        const step = (now: number) => {
            const progress = Math.min(1, (now - begin) / duration);
            setValue(Math.round(target * easeOutCubic(progress)));
            if (progress < 1) frameId = requestAnimationFrame(step);
        };
        frameId = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frameId);
    }, [start, target, reduced]);

    return value;
}

export function StatCard({ value, label, hint, index }: StatCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const reduced = useReducedMotion();

    const [glow, setGlow] = useState(false);

    const display = useCountUp(value, inView, reduced ?? false);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: index * 0.07, ease: "easeOut" }}
            onMouseEnter={() => setGlow(true)}
            onMouseLeave={() => setGlow(false)}
            onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--gx", `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty("--gy", `${event.clientY - rect.top}px`);
            }}
            className="relative overflow-hidden rounded-2xl border border-border bg-muted/20 px-5 py-6"
        >
            <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                    glow ? "opacity-100" : "opacity-0"
                }`}
                style={{
                    background:
                        "radial-gradient(140px circle at var(--gx, 50%) var(--gy, 50%), hsl(var(--foreground) / 0.08), transparent 70%)",
                }}
            />
            <div className="relative">
                <div className="mb-1 text-4xl font-bold tracking-tight tabular-nums md:text-5xl">
                    {display.toLocaleString("en-US")}
                </div>
                <div className="text-sm font-medium text-foreground/80">{label}</div>
                <div className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {hint}
                </div>
            </div>
        </motion.div>
    );
}
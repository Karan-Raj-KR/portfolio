"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const clientX = e.clientX - left;
        const clientY = e.clientY - top;

        const xPct = clientX / width - 0.5;
        const yPct = clientY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                transformPerspective: 1000,
            }}
            className={className}
        >
            <motion.div
                style={{
                    translateZ: useTransform(mouseX, (v) => Math.abs(v) > 0 ? 30 : 0)
                }}
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

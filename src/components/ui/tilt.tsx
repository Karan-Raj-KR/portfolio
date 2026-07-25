"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import React, { useRef } from "react";

const spring = { stiffness: 150, damping: 18, mass: 0.3 };

export function Tilt({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const shouldReduceMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const hover = useMotionValue(0);

    const mouseX = useSpring(x, spring);
    const mouseY = useSpring(y, spring);
    const lift = useSpring(hover, spring);

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["6deg", "-6deg"]);
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-6deg", "6deg"]);
    const translateZ = useTransform(lift, [0, 1], [0, 16]);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;

        const { left, top, width, height } = ref.current.getBoundingClientRect();
        x.set((e.clientX - left) / width - 0.5);
        y.set((e.clientY - top) / height - 0.5);
        hover.set(1);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
        hover.set(0);
    }

    if (shouldReduceMotion) {
        return <div className={className}>{children}</div>;
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
            <motion.div style={{ translateZ }} className="w-full h-full">
                {children}
            </motion.div>
        </motion.div>
    );
}

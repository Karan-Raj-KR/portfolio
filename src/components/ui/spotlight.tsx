"use client";

import { motion, useMotionValue, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export function Spotlight() {
    // Driven straight from motion values — a React state update per mousemove
    // re-rendered this component on every pointer event.
    const smoothX = useSpring(0, { damping: 20, stiffness: 300, mass: 0.5 });
    const smoothY = useSpring(0, { damping: 20, stiffness: 300, mass: 0.5 });
    // Hidden until the pointer first moves, so touch devices don't get a
    // permanent glow stuck in the top-left corner.
    const opacity = useMotionValue(0);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            smoothX.set(e.clientX);
            smoothY.set(e.clientY);
            opacity.set(1);
        };

        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, [smoothX, smoothY, opacity]);

    const background = useMotionTemplate`radial-gradient(600px circle at ${smoothX}px ${smoothY}px, var(--spotlight-color, rgba(255, 255, 255, 0.06)), transparent 40%)`;

    return (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 z-30"
            style={{ background, opacity }}
        />
    );
}

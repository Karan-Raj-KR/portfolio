"use client";

import { useMousePosition } from "@/hooks/use-mouse";
import { motion, useSpring, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export function Spotlight() {
    const { x, y } = useMousePosition();

    // Smooth out the mouse movement
    const smoothX = useSpring(0, { damping: 20, stiffness: 300, mass: 0.5 });
    const smoothY = useSpring(0, { damping: 20, stiffness: 300, mass: 0.5 });

    useEffect(() => {
        smoothX.set(x);
        smoothY.set(y);
    }, [x, y, smoothX, smoothY]);

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
            style={{
                background: useMotionTemplate`
          radial-gradient(
            600px circle at ${smoothX}px ${smoothY}px,
            rgba(255, 255, 255, 0.06),
            transparent 40%
          )
        `,
            }}
        />
    );
}

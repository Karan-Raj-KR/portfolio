"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useEffect, useState } from "react";

function GlitchText({ text }: { text: string }) {
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => setIsGlitching(false), 200);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="relative inline-block">
            <span className="relative z-10">{text}</span>
            {isGlitching && (
                <>
                    <span
                        className="absolute inset-0 z-20 text-primary/60"
                        style={{ clipPath: "inset(20% 0 40% 0)", transform: "translateX(-4px)" }}
                        aria-hidden
                    >
                        {text}
                    </span>
                    <span
                        className="absolute inset-0 z-20 text-destructive/40"
                        style={{ clipPath: "inset(60% 0 5% 0)", transform: "translateX(4px)" }}
                        aria-hidden
                    >
                        {text}
                    </span>
                </>
            )}
        </span>
    );
}

function FloatingParticle({ delay, x, y, size }: { delay: number; x: number; y: number; size: number }) {
    return (
        <motion.div
            className="absolute rounded-full bg-foreground/[0.03]"
            style={{ width: size, height: size, left: `${x}%`, top: `${y}%` }}
            animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1],
            }}
            transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
            }}
        />
    );
}

export default function NotFound() {
    const particles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: i * 0.3,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 4 + Math.random() * 8,
    }));

    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4">
            {/* Background particles */}
            <div className="pointer-events-none absolute inset-0">
                {particles.map((p) => (
                    <FloatingParticle key={p.id} {...p} />
                ))}
            </div>

            {/* Subtle radial glow */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[600px] w-[600px] rounded-full bg-primary/[0.03] blur-3xl" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
                {/* 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-6"
                >
                    <h1 className="text-[8rem] font-bold leading-none tracking-tighter sm:text-[12rem] md:text-[14rem]">
                        <GlitchText text="404" />
                    </h1>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="mb-8 h-px w-24 bg-border"
                />

                {/* Message */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-4"
                >
                    <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        Page not found
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="mb-12 max-w-md text-base text-muted-foreground"
                >
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </motion.p>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col gap-3 sm:flex-row"
                >
                    <Link
                        href="/"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Home className="h-4 w-4" />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => history.back()}
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-muted/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Go Back
                    </button>
                </motion.div>
            </div>
        </main>
    );
}

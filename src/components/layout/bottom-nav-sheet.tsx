"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Code2, Mail } from "lucide-react";

interface BottomNavSheetProps {
    isOpen: boolean;
    onClose: () => void;
}

const sheetLinks = [
    { href: "#skills", label: "Skills", icon: Code2 },
    { href: "#contact", label: "Contact", icon: Mail },
];

export function BottomNavSheet({ isOpen, onClose }: BottomNavSheetProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm lg:hidden"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "100%" }}
                        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        drag="y"
                        dragConstraints={{ top: 0, bottom: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                            if (info.offset.y > 100 || info.velocity.y > 500) {
                                onClose();
                            }
                        }}
                        className="fixed bottom-0 left-0 right-0 z-[101] flex flex-col rounded-t-[20px] bg-background border-t border-border/40 pb-[env(safe-area-inset-bottom)] lg:hidden"
                    >
                        <div className="flex h-12 w-full items-center justify-center cursor-grab active:cursor-grabbing">
                            <div className="h-1 w-8 rounded-full bg-muted-foreground/30" />
                        </div>
                        <div className="flex flex-col px-4 pb-6">
                            {sheetLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={onClose}
                                        className="flex h-14 items-center gap-4 border-b border-border/30 px-2 text-base font-medium text-foreground/80 hover:text-foreground last:border-0 transition-colors"
                                    >
                                        <Icon className="h-5 w-5" />
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}

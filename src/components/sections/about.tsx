"use client";

import { motion, Variants } from "framer-motion";
import { experience } from "@/data/experience";

export function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section id="about" className="container mx-auto flex min-h-[60vh] flex-col justify-center px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-4xl space-y-8 text-xl font-light leading-relaxed md:text-3xl text-muted-foreground break-words"
      >
        <motion.p variants={itemVariants}>
          Karan Raj KR. Founder, KĀRYO. From Gubbi, Tumkur; based in Bengaluru.
        </motion.p>
        <motion.p variants={itemVariants}>
          B.Tech CSE (AI/ML), NIAT–S-VYASA, Bengaluru. Batch 2025–29.
          Builder, hackathon winner, open-source contributor and content creator.
        </motion.p>
        {experience.filter((item) => !item.role.startsWith("B.Tech")).map((item) => (
          <motion.div key={item.role} variants={itemVariants} className="space-y-3 text-base md:text-lg font-normal">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">{item.role}</h3>
            <p className="text-sm">{item.period}{item.company ? ` · ${item.company}` : ""}</p>
            <ul className="list-disc pl-5 space-y-2">
              {item.description.map((point) => <li key={point}>{point}</li>)}
            </ul>
          </motion.div>
        ))}
        {/* TODO(karan): confirm the exact ED Club best-member award title. */}
        <motion.div variants={itemVariants} className="space-y-3 text-base md:text-lg font-normal">
          <h3 className="text-xl md:text-2xl font-semibold text-foreground">Content and recognition</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Instagram and LinkedIn creator; selected for SPARK 2026, the NIAT creator programme.</li>
            <li>3× awards: 2 GRIT Awards 2026 (Content, Hackathons) and Technology Innovators Award (10 Aug 2026).</li>
            <li>Past: Google Campus Ambassador, ended Jan 2026.</li>
            <li>Past: Top Prompt Creator at Google Pitch Night.</li>
          </ul>
          <a href="https://karanrajkr.hashnode.dev" target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4">Read on Hashnode</a>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-20 pt-12 border-t border-border/40">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-foreground mb-8">Frequently Asked Questions</h3>
          <div className="space-y-8 text-base md:text-lg text-muted-foreground/90 font-normal">
            <div>
              <h4 className="font-semibold text-foreground">What does Karan Raj KR do?</h4>
              <p className="mt-2">Karan Raj KR is Founder, KĀRYO. He builds products, contributes to open source and creates content.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">What is Karan Raj KR&apos;s background?</h4>
              <p className="mt-2">He is from Gubbi, Tumkur, and studies B.Tech CSE (AI/ML) at NIAT–S-VYASA, Bengaluru, in the 2025–29 batch.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground">What projects has Karan Raj KR built?</h4>
              <p className="mt-2">His projects include the KĀRYO Client Onboarding Manager, School ERP demo and FormPilot, built with Havinash and Saagnik for Open Loop 2026.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

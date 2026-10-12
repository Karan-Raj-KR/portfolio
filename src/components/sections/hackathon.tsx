"use client";

import { motion, Variants } from "framer-motion";
import { Tilt } from "@/components/ui/tilt";
import { Terminal, ArrowRight } from "lucide-react";
import Link from "next/link";

const hackathons = [
  {
    "title": "1st place",
    "organization": "Open Loop 2026",
    "date": "25–26 Apr 2026",
    "description": "FormPilot, an AI Chrome extension, built by Karan Raj KR, Havinash and Saagnik. Yenepoya, Mangaluru.",
    "summary": "309 participants · 121 teams · 109 colleges · 14 states",
    "metric": "80/100 vs 60/100 · ₹20,000 prize",
    "link": "/hackathons/open-loop-2026"
  },
  {
    "title": "Top 40",
    "organization": "Hack BLR 2026",
    "date": "2026",
    "description": "VoiceRx, a voice health assistant built solo with Vapi, FastAPI, Qdrant and Groq.",
    "summary": "Solo build",
    "metric": "Top 40 of 2,500+ teams"
  },
  {
    "title": "Top 50",
    "organization": "OpenAI DevDay Exchange community hackathon",
    "date": "10 Oct 2026",
    "description": "Top 50 at the OpenAI DevDay Exchange community hackathon in Bengaluru.",
    "summary": "Bengaluru",
    "metric": "Top 50"
  },
  {
    "title": "Winner",
    "organization": "Ideathon",
    "date": "2026",
    "description": "Won an Ideathon.",
    "summary": "Ideathon winner",
    "metric": "Win"
  },
  {
    "title": "Participated",
    "organization": "TakeOver’26",
    "date": "2026",
    "description": "24-hour live build session with Havinash and Saagnik at NIAT KKH, Hyderabad.",
    "summary": "Team build session",
    "metric": "24 hours"
  },
  {
    "title": "Internal round",
    "organization": "Smart India Hackathon 2026",
    "date": "2026",
    "description": "Presented EdgeWake for an ISRO problem statement at the internal round.",
    "summary": "EdgeWake · ISRO problem statement",
    "metric": "Presented"
  },
  {
    "title": "Participated",
    "organization": "Agentathon",
    "date": "2026",
    "description": "Participated with the KĀRYO Lead Intelligence Agent, a CrewAI multi-agent pipeline.",
    "summary": "KĀRYO Lead Intelligence Agent · CrewAI",
    "metric": "Participated"
  }
];

interface HackathonProps {
  titleAs?: "h1" | "h2";
  title?: string;
}

export function Hackathon({ titleAs: Title = "h2", title = "Competitive Building" }: HackathonProps = {}) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="hackathon" className="container mx-auto px-4 py-24 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 pt-16"
      >
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary/80">
          <Terminal className="h-4 w-4" />
          Hackathons
        </div>
        <Title className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">{title}</Title>
        <p className="max-w-2xl text-lg text-muted-foreground">
          2× wins: Open Loop 2026 and an Ideathon. Results, team builds and participation below.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {hackathons.map((item, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Tilt className="flex h-full flex-col justify-between rounded-xl border border-border bg-muted/10 p-4 sm:p-6 transition-colors hover:bg-muted/20">
              <div>
                <h3 className="mb-1 text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="mb-4 text-sm font-medium text-primary/80">{item.organization}</p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground break-words">
                  {item.description}
                </p>
                <p className="mb-6 text-xs font-medium text-foreground bg-muted/50 p-2 rounded-md">
                  {item.summary}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-border pt-4 gap-2 sm:gap-0">
                <span className="text-sm font-medium text-foreground break-words">{item.metric}</span>
                <span className="text-xs text-muted-foreground shrink-0">{item.date}</span>
              </div>
              {item.link && (
                <div className="mt-4 border-t border-border/50 pt-4">
                  <Link
                    href={item.link}
                    className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </Tilt>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

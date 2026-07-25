import { Metadata } from "next";
import { Hackathon } from "@/components/sections/hackathon";

export const metadata: Metadata = {
  title: "Hackathons",
  description:
    "Hackathon results and what I built at each — 1st of 121 teams at Open Loop 2026, top 40 of 2,500+ at HackBLR 2026.",
  alternates: {
    canonical: "/hackathons",
  },
};

export default function HackathonsPage() {
  return (
    <main id="main" className="flex min-h-screen flex-col">
      <Hackathon />
    </main>
  );
}

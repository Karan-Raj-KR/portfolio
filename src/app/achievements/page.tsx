import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { AchievementsFull } from "@/components/sections/achievements-full";
import { Spotlight } from "@/components/ui/spotlight";
import { ClickSparkWrapper } from "@/components/ui/click-spark-wrapper";
import { Contact } from "@/components/sections/contact";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Hackathon wins, open-source contributions, and milestones — a complete record of what I've won, shipped, and built.",
  alternates: {
    canonical: "/achievements",
  },
};

export default function AchievementsPage() {
  return (
    <ClickSparkWrapper>
      <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
        <Spotlight />
        <Header />

        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: "https://www.karanrajkr.com/" },
            { name: "Achievements", url: "https://www.karanrajkr.com/achievements" },
          ]}
        />

        <AchievementsFull />

        <Contact />
      </main>
    </ClickSparkWrapper>
  );
}

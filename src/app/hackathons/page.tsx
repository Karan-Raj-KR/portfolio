import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Hackathon } from "@/components/sections/hackathon";
import { Spotlight } from "@/components/ui/spotlight";
import { ClickSparkWrapper } from "@/components/ui/click-spark-wrapper";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Hackathons | Karan Raj KR",
  description: "A look at the projects and prototypes I've built under intense time constraints.",
  alternates: {
    canonical: "/hackathons",
  },
};

export default function HackathonsPage() {
  return (
    <ClickSparkWrapper>
      <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
        <Spotlight />
        <Header />
        
        <Hackathon />
        
        <Contact />
      </main>
    </ClickSparkWrapper>
  );
}

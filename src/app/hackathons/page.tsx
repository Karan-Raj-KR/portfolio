import { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Hackathon } from "@/components/sections/hackathon";
import { Spotlight } from "@/components/ui/spotlight";
import { ClickSparkWrapper } from "@/components/ui/click-spark-wrapper";
import { Contact } from "@/components/sections/contact";

import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Hackathons",
  description: "National hackathon wins and prototypes built under intense time constraints by Karan Raj KR.",
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
        <BreadcrumbJsonLd
          items={[
            { name: "Home", url: "https://www.karanrajkr.com/" },
            { name: "Hackathons", url: "https://www.karanrajkr.com/hackathons" },
          ]}
        />

        <Hackathon titleAs="h1" title="Hackathons" />

        <Contact />
      </main>
    </ClickSparkWrapper>
  );
}

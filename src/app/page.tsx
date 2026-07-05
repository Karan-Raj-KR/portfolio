import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Spotlight } from "@/components/ui/spotlight";
import { ClickSparkWrapper } from "@/components/ui/click-spark-wrapper";

// Dynamically import sections below the fold to reduce initial bundle size
const Achievements = dynamic(() => import("@/components/sections/achievements").then(mod => mod.Achievements));
const About = dynamic(() => import("@/components/sections/about").then(mod => mod.About));
const BuildingNow = dynamic(() => import("@/components/sections/building-now").then(mod => mod.BuildingNow));
const Projects = dynamic(() => import("@/features/projects/components/project-list").then(mod => mod.Projects));
const Karyo = dynamic(() => import("@/components/sections/karyo").then(mod => mod.Karyo));
const Skills = dynamic(() => import("@/components/sections/skills").then(mod => mod.Skills));
const Community = dynamic(() => import("@/components/sections/community").then(mod => mod.Community));
const Roadmap = dynamic(() => import("@/components/sections/roadmap").then(mod => mod.Roadmap));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <ClickSparkWrapper>
      <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
        <Spotlight />
        <Header />
        
        {/* 15-Second Information Hierarchy */}
        <Hero />
        <Achievements />
        <About />
        <BuildingNow />
        <Projects />
        <Karyo />
        <Skills />
        <Community />
        <Roadmap />
        
        <Contact />
      </main>
    </ClickSparkWrapper>
  );
}

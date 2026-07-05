import dynamic from "next/dynamic";
import { Header } from "@/components/layout/header";
import { Hero } from "@/components/sections/hero";
import { Spotlight } from "@/components/ui/spotlight";
import { ClickSparkWrapper } from "@/components/ui/click-spark-wrapper";

// Dynamically import sections below the fold to reduce initial bundle size
const About = dynamic(() => import("@/components/sections/about").then(mod => mod.About));
const Skills = dynamic(() => import("@/components/sections/skills").then(mod => mod.Skills));
const Projects = dynamic(() => import("@/features/projects/components/project-list").then(mod => mod.Projects));
const Experience = dynamic(() => import("@/features/experience/components/experience-timeline").then(mod => mod.Experience));
const Karyo = dynamic(() => import("@/components/sections/karyo").then(mod => mod.Karyo));
const Contact = dynamic(() => import("@/components/sections/contact").then(mod => mod.Contact));

export default function Home() {
  return (
    <ClickSparkWrapper>
      <main className="relative flex min-h-screen flex-col overflow-hidden selection:bg-primary/20">
        <Spotlight />
        <Header />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Karyo />
        <Contact />
      </main>
    </ClickSparkWrapper>
  );
}

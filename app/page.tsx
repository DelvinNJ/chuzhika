import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Founders from "@/components/Founders";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative flex flex-col w-full overflow-hidden bg-[#05050a]">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Section */}
      <About />

      {/* 3. Services Section */}
      <Services />

      {/* 4. Projects Section (Pinned Horizontal Scroll) */}
      <Projects />

      {/* 5. Process Section (Vertical Timeline) */}
      <Process />

      {/* 6. Founders Section */}
      <Founders />

      {/* 7. Contact Section */}
      <Contact />
    </main>
  );
}

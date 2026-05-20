import {
  About,
  Contact,
  Footer,
  Hero,
  Journey,
  Knowledge,
  Navigation,
  Projects,
  Skills,
} from '@/components/sections';
import { AmbientGlow } from '@/components/ambient-glow';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative overflow-hidden">
        {/* Global animated Aurora & Cyber Grid background */}
        <AmbientGlow />
        
        <Hero />
        <About />
        <Projects />
        <Knowledge />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

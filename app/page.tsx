import { AmbientGlow } from '@/components/ambient-glow';
import {
  About,
  Awards,
  Contact,
  Footer,
  Hero,
  Journey,
  Knowledge,
  Navigation,
  Projects,
  Skills,
} from '@/components/sections';

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
        <Awards />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

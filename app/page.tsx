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

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
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

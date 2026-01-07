import {
  About,
  Contact,
  Footer,
  Hero,
  Journey,
  Navigation,
  Projects,
  Skills,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

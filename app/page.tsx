import { home } from "@/lib/content";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/sections/Hero";
import { Band } from "@/components/sections/Band";
import { Bring } from "@/components/sections/Bring";
import { About } from "@/components/sections/About";
import { Solution } from "@/components/sections/Solution";
import { Benefits } from "@/components/sections/Benefits";
import { Technology } from "@/components/sections/Technology";
import { Team } from "@/components/sections/Team";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Band text={home.band} />
        <Bring />
        <About />
        <Solution />
        <Benefits />
        <Technology />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import { About } from "@/components/sections/About";
import { BehindTheScenes } from "@/components/sections/BehindTheScenes";
import { Clients } from "@/components/sections/Clients";
import { Hero } from "@/components/sections/Hero";
import { MainCTA } from "@/components/sections/MainCTA";
import { Metrics } from "@/components/sections/Metrics";
import { Portfolio } from "@/components/sections/Portfolio";
import { Services } from "@/components/sections/Services";
import { Showreel } from "@/components/sections/Showreel";
import { Statement } from "@/components/sections/Statement";

export default function Home() {
  return (
    <main>
      <Hero />
      <Statement />
      <Portfolio />
      <Showreel />
      <Services />
      <Metrics />
      <Clients />
      <About />
      <BehindTheScenes />
      <MainCTA />
    </main>
  );
}

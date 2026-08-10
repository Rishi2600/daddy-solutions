import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyDaddy } from "@/components/sections/WhyDaddy";
import { Process } from "@/components/sections/Process";
import { Solana } from "@/components/sections/Solana";
import { TechStack } from "@/components/sections/TechStack";
import { ContactCta } from "@/components/sections/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyDaddy />
      <Process />
      <Solana />
      <TechStack />
      <ContactCta />
    </>
  );
}

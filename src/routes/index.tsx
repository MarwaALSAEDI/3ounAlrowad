import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { useLenis } from "@/hooks/use-lenis";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ExclusiveAgency } from "@/components/site/ExclusiveAgency";
import { CollectionsStory } from "@/components/site/CollectionsStory";
import { Features } from "@/components/site/Features";
import { NewArrivals } from "@/components/site/NewArrivals";
import { Newsletter } from "@/components/site/Newsletter";
import { Footer } from "@/components/site/Footer";

const TITLE = "عيون الرواد | أوانٍ وصحون بتفاصيل تليق بكل مائدة";
const DESC = "عيون الرواد شركة متخصصة في الأواني والصحون ومستلزمات المائدة، والوكيل الحصري لشركة ليبرونك.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/og.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og.png" },
    ],
  }),
  component: Index,
});

function Index() {
  useLenis();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.25 });

  return (
    <motion.div dir="rtl" lang="ar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.45 }} className="min-h-screen bg-background">
      <a href="#main-content" className="fixed right-4 top-3 z-[100] -translate-y-24 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-lift transition-transform focus:translate-y-0">
        انتقل إلى المحتوى
      </a>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-right bg-gradient-to-l from-primary to-accent" />
      <Navbar />
      <main id="main-content">
        <Hero />
        <ExclusiveAgency />
        <Features />
        <CollectionsStory />
        <NewArrivals />
        <Newsletter />
      </main>
      <Footer />
    </motion.div>
  );
}

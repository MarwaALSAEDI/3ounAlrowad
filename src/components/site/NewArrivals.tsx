import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import g1 from "@/assets/g-1.jpg";
import g2 from "@/assets/g-2.jpg";
import g3 from "@/assets/g-3.jpg";
import g4 from "@/assets/g-4.jpg";
import { dinnerSetUrl } from "@/data/catalog";
import { Reveal } from "./Reveal";

const items = [
  { src: g1, alt: "طقم صحون سيراميك أنيق", span: "sm:row-span-2", w: 900, h: 1200 },
  { src: g2, alt: "أدوات مطبخ خشبية", span: "", w: 900, h: 700 },
  { src: dinnerSetUrl, alt: "طقم صحون ملوّن بنقوش تقليدية", span: "", w: 1280, h: 1280 },
  { src: g4, alt: "أدوات مائدة فاخرة", span: "", w: 900, h: 800 },
  { src: g3, alt: "مزهريات سيراميك", span: "sm:row-span-2", w: 900, h: 1100 },
];

export function NewArrivals() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="new" ref={ref} dir="rtl" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">وصل حديثاً</span>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-extrabold tracking-tight">
            قطع جديدة تُضيف دفئاً لبيتك
          </h2>
        </Reveal>

        <motion.div
          style={{ y: drift }}
          className="mt-14 grid auto-rows-[220px] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.figure
              key={item.alt}
              initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, delay: (i % 3) * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className={`group relative overflow-hidden rounded-[2rem] bg-sand shadow-soft ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={item.w}
                height={item.h}
                className="h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:brightness-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-primary/80 to-transparent p-5 text-sm font-semibold text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

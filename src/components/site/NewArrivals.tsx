import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import cupsGreen from "@/assets/tableware-cups-green.png";
import cupsBeige from "@/assets/tableware-cups-beige.png";
import cupsBlack from "@/assets/tableware-cups-black.png";
import ornateSet from "@/assets/tableware-ornate-set.png";
import ornateOriginal from "@/assets/tableware-ornate-original.jpeg";
import mandalaSet from "@/assets/tableware-mandala-set.png";
import yellowSet from "@/assets/tableware-yellow-set.png";
import orangeSet from "@/assets/tableware-orange-set.png";
import blackSet from "@/assets/tableware-black-set.png";
import { Reveal } from "./Reveal";

const items = [
  { src: cupsGreen, alt: "طقم فناجين رخامي أخضر مع صحون قلب", w: 1122, h: 1402 },
  { src: cupsBeige, alt: "طقم فناجين رخامي بيج مع صحون قلب", w: 1122, h: 1402 },
  { src: cupsBlack, alt: "طقم فناجين وصحون بنقشة رخامية", w: 1122, h: 1402 },
  { src: ornateSet, alt: "طقم سفرة مزخرف بألوان تراثية", w: 1122, h: 1402 },
  { src: ornateOriginal, alt: "طقم صحون وزبدية مزخرف", w: 1280, h: 1280 },
  { src: mandalaSet, alt: "طقم سفرة أسود بنقوش ماندالا", w: 1122, h: 1402 },
  { src: yellowSet, alt: "طقم سفرة أصفر وأزرق مزخرف", w: 1122, h: 1402 },
  { src: orangeSet, alt: "طقم سفرة برتقالي مزخرف بالورود", w: 1122, h: 1402 },
  { src: blackSet, alt: "طقم سفرة أسود بنقوش تراثية", w: 1122, h: 1402 },
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
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item, i) => (
            <motion.figure
              key={item.alt}
              initial={{ opacity: 0, y: 60, scale: 0.96, filter: "blur(12px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.95, delay: (i % 3) * 0.1, ease: [0.22, 0.61, 0.36, 1] }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-soft-blush shadow-soft"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width={item.w}
                height={item.h}
                className="h-full w-full object-cover transition-all duration-[900ms] ease-out group-hover:scale-110 group-hover:brightness-110"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-3 bg-gradient-to-t from-primary/95 to-transparent p-5 text-sm font-semibold text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.alt}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

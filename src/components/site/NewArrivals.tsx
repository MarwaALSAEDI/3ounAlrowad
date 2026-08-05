import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "./Reveal";

const items = [
  {
    src: "/oyoun-collection/marble-cups-green.webp",
    alt: "طقم فناجين رخامية خضراء",
    span: "sm:row-span-2",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/heritage-dinnerware.webp",
    alt: "طقم سفرة بنقوش تراثية",
    span: "",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/marble-cups-caramel.webp",
    alt: "طقم فناجين رخامية بلون الكراميل",
    span: "",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/mandala-dinnerware.webp",
    alt: "طقم سفرة ملوّن بزخارف ماندالا",
    span: "sm:row-span-2",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/marble-espresso-set.webp",
    alt: "طقم فناجين إسبريسو رخامية",
    span: "sm:row-span-2",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/blue-yellow-dinnerware.webp",
    alt: "طقم صحون أزرق وأصفر مزخرف",
    span: "",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/orange-dinnerware.webp",
    alt: "طقم صحون برتقالي مزخرف",
    span: "",
    w: 1122,
    h: 1536,
  },
  {
    src: "/oyoun-collection/heritage-dinnerware-wide.webp",
    alt: "طقم صحون تراثي داكن",
    span: "sm:row-span-2",
    w: 1122,
    h: 1536,
  },
];

export function NewArrivals() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="gallery" ref={ref} dir="rtl" className="py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">من تفاصيلنا</span>
          <h2 className="font-display mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-bold leading-tight tracking-tight">
            حضور يليق بكل مائدة
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

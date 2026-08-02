import { motion } from "motion/react";

const brands = ["SAMSUNG", "LG", "PHILIPS", "Bosch", "Tefal", "Kenwood", "De'Longhi"];

export function Brands() {
  return (
    <section aria-labelledby="brands-title" className="border-y border-border/80 bg-card py-9">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <motion.p id="brands-title" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mb-7 text-center text-xs font-bold tracking-wide text-muted-foreground">
          علامات عالمية موثوقة في بيتك
        </motion.p>
        <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
          <div className="brand-marquee flex w-max flex-row-reverse items-center">
            {[0, 1].map((group) => (
              <div key={group} aria-hidden={group === 1} className="flex shrink-0 items-center gap-12 px-6 sm:gap-20 sm:px-10">
                {brands.map((brand) => (
                  <span key={brand} className="select-none whitespace-nowrap font-sans text-lg font-black tracking-[-0.04em] text-secondary/60 grayscale transition-colors hover:text-primary sm:text-xl">
                    {brand}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

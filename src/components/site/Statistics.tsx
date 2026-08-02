import { animate, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 60, suffix: " ألف+", label: "عميل سعيد" },
  { value: 2500, suffix: "+", label: "منتج أصلي" },
  { value: 85, suffix: " ألف+", label: "طلب مكتمل" },
  { value: 42, suffix: "+", label: "علامة عالمية" },
];

export function Statistics() {
  return (
    <section aria-label="أرقام بيت الراحة" className="px-5 pb-12 sm:px-8 sm:pb-16">
      <div className="dark relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-background px-6 py-12 text-foreground shadow-lift sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute inset-0 dot-grid opacity-30" />
        <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-primary/30 blur-[100px]" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-64 w-64 rounded-full bg-accent/15 blur-[100px]" />
        <div className="relative grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="text-center lg:border-l lg:border-border last:lg:border-0">
              <p className="font-display text-[clamp(2.1rem,5vw,3.8rem)] font-black tracking-tight"><Counter to={stat.value} />{stat.suffix}</p>
              <p className="mt-2 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.6, ease: [0.22, 0.61, 0.36, 1], onUpdate: (latest) => setValue(Math.round(latest)) });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{value.toLocaleString("ar-SA")}</span>;
}

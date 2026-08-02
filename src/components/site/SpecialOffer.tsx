import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, CheckCircle2, Timer } from "lucide-react";
import airfryer from "@/assets/p-airfryer.png";
import kettle from "@/assets/p-kettle.png";
import cookware from "@/assets/p-cookware.png";

export function SpecialOffer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const productY = useTransform(scrollYProgress, [0, 1], [65, -65]);
  const productYSlow = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section id="offer" ref={ref} className="px-5 py-20 sm:px-8 sm:py-28">
      <div className="dark relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] bg-background px-6 py-12 text-foreground shadow-lift sm:rounded-[2.5rem] sm:px-12 sm:py-16 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-16">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/30 blur-[110px]" />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />

        <motion.div initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: 0.8 }} className="relative z-10">
          <span className="eyebrow rounded-full border border-soft-blush-900/10 bg-soft-blush-900/5 px-4 py-2"><Timer className="h-4 w-4" /> عرض الموسم لفترة محدودة</span>
          <h2 className="font-display mt-6 text-[clamp(2.2rem,5vw,4.4rem)] font-black leading-[1.12] tracking-tight">
            وفّر حتى <span className="text-accent">٣٠٪</span><br />على أساسيات منزلك
          </h2>
          <p className="mt-5 max-w-lg leading-8 text-muted-foreground">جدّد مطبخك بأجهزة وأوانٍ مختارة، بضمان رسمي وشحن مجاني للطلبات المؤهلة.</p>
          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-soft-blush-900/75 sm:text-sm">
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> شحن مجاني</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> ضمان سنتين</span>
            <span className="inline-flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-accent" /> كمية محدودة</span>
          </div>
          <motion.a href="#best" whileHover={{ scale: 1.035 }} whileTap={{ scale: 0.97 }} className="group mt-9 inline-flex min-h-14 items-center gap-3 rounded-2xl bg-accent px-8 font-bold text-accent-foreground transition-shadow hover:shadow-success">
            تسوّق العرض <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          </motion.a>
        </motion.div>

        <div className="relative z-10 mt-14 h-[320px] lg:mt-0 lg:h-[430px]">
          <div className="absolute inset-4 rounded-full border border-soft-blush-900/10 bg-soft-blush-900/[0.04]" />
          <div className="absolute inset-16 rounded-full border border-soft-blush-900/10" />
          <motion.img src={airfryer} alt="قلاية هوائية ضمن العرض" loading="lazy" decoding="async" width={1024} height={1024} style={{ y: productYSlow }} className="drop-shadow-brand absolute right-0 top-0 w-[58%]" />
          <motion.img src={cookware} alt="طقم أواني ضمن العرض" loading="lazy" decoding="async" width={1024} height={1024} style={{ y: productY }} className="drop-shadow-brand absolute bottom-0 left-0 w-[59%]" />
          <motion.img src={kettle} alt="غلاية كهربائية ضمن العرض" loading="lazy" decoding="async" width={1024} height={1024} animate={{ y: [0, -12, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }} className="drop-shadow-brand absolute left-[33%] top-[7%] w-[30%]" />
          <motion.div initial={{ scale: 0, rotate: -12 }} whileInView={{ scale: 1, rotate: 5 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.3 }} className="absolute bottom-6 right-4 grid h-24 w-24 place-items-center rounded-full bg-accent text-center font-display text-lg font-black leading-5 text-accent-foreground shadow-lift sm:h-28 sm:w-28">
            وفر<br /><span className="text-2xl">٣٠٪</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

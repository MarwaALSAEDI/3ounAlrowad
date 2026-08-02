import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowLeft, BadgeCheck, Sparkles, Star, Truck } from "lucide-react";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import airfryer from "@/assets/p-airfryer.png";
import kettle from "@/assets/p-kettle.png";

const EASE = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <section id="hero" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden pb-20 pt-32 sm:pt-40 lg:flex lg:items-center lg:py-36">
      <div className="dot-grid pointer-events-none absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black,transparent_78%)]" />
      <div className="pointer-events-none absolute -right-40 top-20 -z-10 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[30rem] w-[30rem] rounded-full bg-accent/10 blur-[110px]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div style={{ y: copyY }} className="relative z-10 order-2 lg:order-1">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }} className="eyebrow rounded-full border border-primary/15 bg-card/80 px-4 py-2 shadow-soft backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" />
            اختيارات أذكى لمنزل أجمل
          </motion.span>

          <h1 className="font-display mt-7 max-w-2xl text-[clamp(2.7rem,6.4vw,5.3rem)] font-black leading-[1.08] tracking-[-0.035em]">
            <motion.span className="block" initial={{ opacity: 0, y: 46, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.08, ease: EASE }}>
              كل ما يحتاجه منزلك
            </motion.span>
            <motion.span className="text-gilded block" initial={{ opacity: 0, y: 46, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.9, delay: 0.2, ease: EASE }}>
              في مكان واحد.
            </motion.span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38, ease: EASE }} className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            أجهزة منزلية ومستلزمات مطبخ أصلية من أفضل العلامات العالمية—مختارة بعناية، مضمونة، وتصل إلى بابك بسرعة.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.52, ease: EASE }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <motion.a href="#best" whileHover={{ scale: 1.035, boxShadow: "var(--shadow-glow)" }} whileTap={{ scale: 0.97 }} className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-soft">
              تسوق الآن
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
            </motion.a>
            <a href="#categories" className="inline-flex min-h-14 items-center justify-center rounded-2xl border border-border bg-card/80 px-8 text-base font-bold shadow-soft backdrop-blur transition-colors hover:border-primary/30 hover:bg-blue-soft/40 hover:text-primary">
              استكشف الأقسام
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.76, duration: 0.8 }} className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2"><BadgeCheck className="h-4 w-4 text-accent" /> منتجات أصلية ١٠٠٪</span>
            <span className="inline-flex items-center gap-2"><Truck className="h-4 w-4 text-primary" /> شحن سريع وآمن</span>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: -55, scale: 0.96 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="relative order-1 mx-auto w-full max-w-2xl lg:order-2">
          <div className="absolute -inset-5 -z-10 rounded-[2.75rem] bg-gradient-to-br from-primary/16 via-transparent to-accent/16 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white p-2 shadow-lift sm:rounded-[2.5rem] sm:p-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.65rem] sm:rounded-[2rem]">
              <motion.img src={heroKitchen} alt="مطبخ عصري مجهز بأجهزة منزلية حديثة" width={1920} height={1280} fetchPriority="high" style={{ y: imageY, scale: imageScale }} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/35 via-transparent to-transparent" />
              <div className="absolute bottom-4 right-4 rounded-2xl border border-white/30 bg-white/88 px-4 py-3 shadow-soft backdrop-blur-md sm:bottom-6 sm:right-6">
                <div className="flex items-center gap-1 text-amber-400">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-3.5 w-3.5 fill-current" />)}</div>
                <p className="mt-1 text-xs font-bold text-secondary">تقييم ٤.٩ من عملائنا</p>
              </div>
            </div>
          </div>

          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }} className="absolute -bottom-8 -left-1 z-10 hidden w-44 items-center gap-3 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-lift backdrop-blur sm:flex">
            <img src={airfryer} alt="" aria-hidden="true" width={60} height={60} className="h-14 w-14 rounded-xl bg-muted object-contain p-1" />
            <div><p className="text-xs text-muted-foreground">الأكثر مبيعاً</p><p className="mt-1 text-sm font-extrabold text-secondary">قلاية هوائية</p></div>
          </motion.div>
          <motion.div animate={{ y: [0, 11, 0] }} transition={{ duration: 5.6, delay: 0.5, repeat: Infinity, ease: "easeInOut" }} className="absolute -right-3 -top-7 z-10 hidden w-40 items-center gap-2 rounded-2xl border border-white/70 bg-white/90 p-3 shadow-lift backdrop-blur sm:flex">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success-soft"><img src={kettle} alt="" aria-hidden="true" width={44} height={44} className="h-10 w-10 object-contain" /></span>
            <p className="text-xs font-bold leading-5 text-secondary">ضمان رسمي<br /><span className="text-accent">لمدة سنتين</span></p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

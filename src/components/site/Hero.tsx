import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, BadgeCheck, Sparkles, UtensilsCrossed } from "lucide-react";
import galleryDishes from "@/assets/g-1.jpg";
import galleryUtensils from "@/assets/g-2.jpg";
import galleryVases from "@/assets/g-3.jpg";
import galleryGlassware from "@/assets/g-4.jpg";
import cookware from "@/assets/p-cookware.png";

const EASE = [0.22, 0.61, 0.36, 1] as const;

const productVisuals = [
  {
    src: galleryDishes,
    label: "أطقم صحون أنيقة",
    alt: "مجموعة صحون وأوعية خزفية مرتبة بأناقة",
    fit: "cover",
  },
  {
    src: galleryUtensils,
    label: "أدوات المطبخ",
    alt: "أدوات مطبخ وألواح تقديم خشبية",
    fit: "cover",
  },
  {
    src: galleryDishes,
    label: "سفرة متكاملة",
    alt: "طقم سفرة وصحون متكامل",
    fit: "cover",
  },
  {
    src: galleryGlassware,
    label: "زجاجيات الضيافة",
    alt: "كؤوس وزجاجيات فاخرة لطاولة الضيافة",
    fit: "cover",
  },
  {
    src: cookware,
    label: "أواني الطهي",
    alt: "طقم أواني طهي أسود متين",
    fit: "contain",
  },
  {
    src: galleryVases,
    label: "تفاصيل المنزل",
    alt: "مجموعة فازات خزفية بتصميم هادئ",
    fit: "cover",
  },
] as const;

type ProductRailProps = {
  reverse?: boolean;
  duration: number;
};

function ProductRail({ reverse = false, duration }: ProductRailProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      dir="ltr"
      className="flex w-max will-change-transform"
      animate={shouldReduceMotion ? undefined : { x: reverse ? ["-25%", "0%"] : ["0%", "-25%"] }}
      transition={{ duration, ease: "linear", repeat: Infinity }}
    >
      {Array.from({ length: 4 }).map((_, setIndex) => (
        <div
          key={setIndex}
          className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4"
          aria-hidden={setIndex === 0 ? undefined : true}
        >
          {productVisuals.map((product, productIndex) => (
            <motion.figure
              key={`${setIndex}-${product.label}`}
              className="group relative h-[136px] w-[176px] shrink-0 overflow-hidden rounded-[1.35rem] border border-dark-wine-800/70 bg-soft-blush-900 p-1.5 shadow-lift sm:h-[172px] sm:w-[224px] sm:rounded-[1.75rem] lg:h-[188px] lg:w-[246px]"
              whileHover={
                shouldReduceMotion ? undefined : { y: -8, rotate: productIndex % 2 === 0 ? -1 : 1 }
              }
              transition={{ duration: 0.3, ease: EASE }}
            >
              <div className="relative h-full overflow-hidden rounded-[1.05rem] bg-soft-blush-900 sm:rounded-[1.42rem]">
                <img
                  src={product.src}
                  alt={setIndex === 0 ? product.alt : ""}
                  width={492}
                  height={376}
                  loading={setIndex === 0 && productIndex < 2 ? "eager" : "lazy"}
                  fetchPriority={setIndex === 0 && productIndex < 2 ? "high" : "auto"}
                  decoding="async"
                  className={`h-full w-full transition-transform duration-700 group-hover:scale-[1.04] ${
                    product.fit === "contain" ? "object-contain p-3" : "object-cover"
                  }`}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-dark-garnet-100/70 via-transparent to-transparent" />
                <figcaption className="absolute inset-x-3 bottom-2.5 text-right text-[11px] font-extrabold text-soft-blush-900 drop-shadow-[0_2px_3px_rgba(18,0,0,0.7)] sm:inset-x-4 sm:bottom-3 sm:text-sm">
                  {product.label}
                </figcaption>
              </div>
            </motion.figure>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = (delay: number, distance = 28) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance, filter: "blur(8px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.85, delay, ease: EASE },
  });

  return (
    <section
      id="hero"
      dir="rtl"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[940px] overflow-hidden pb-20 pt-28 sm:min-h-[980px] sm:pb-24 sm:pt-36 lg:min-h-[1000px]"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 -z-30 [mask-image:linear-gradient(to_bottom,black_0%,black_72%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-28 -z-20 h-[34rem] w-[52rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-36 top-[38%] -z-20 h-80 w-80 rounded-full bg-brick-ember-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-12 -z-20 h-80 w-80 rounded-full bg-accent/10 blur-[105px]" />

      <div className="relative mx-auto min-h-[760px] w-full max-w-[1600px]">
        <motion.div
          dir="ltr"
          className="absolute left-1/2 top-3 w-[152vw] -translate-x-1/2 -rotate-[3deg] overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] sm:top-0 sm:w-[132vw] lg:w-[116vw]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: -40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.08, ease: EASE }}
        >
          <ProductRail duration={34} />
        </motion.div>

        <div className="relative z-20 mx-auto flex max-w-7xl justify-center px-5 pb-48 pt-[11rem] text-center sm:px-8 sm:pb-52 sm:pt-[11.5rem] lg:pt-[10rem]">
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[34rem] w-[min(96vw,76rem)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,var(--color-background)_0%,rgb(255_251_251/0.94)_54%,transparent_76%)] blur-sm" />

          <div className="flex max-w-6xl flex-col items-center">
            <motion.div {...reveal(0.18, 18)}>
              <span className="eyebrow rounded-full border border-dark-wine-800/70 bg-soft-blush-900/90 px-4 py-2 shadow-soft backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                خبرة تُرى في كل تفصيل
              </span>
            </motion.div>

            <h1
              id="hero-title"
              className="font-display mt-6 text-[clamp(2.05rem,4.7vw,4.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-secondary"
            >
              <motion.span className="block" {...reveal(0.27, 42)}>
                عيون الرواد
              </motion.span>
              <motion.span className="text-gilded mt-3 block" {...reveal(0.38, 42)}>
                ذوقٌ يليق بكل مائدة.
              </motion.span>
            </h1>

            <motion.p
              {...reveal(0.52, 24)}
              className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9"
            >
              شركة متخصصة في الأواني والصحون ومستلزمات المائدة، ننتقي تشكيلات تجمع الجودة
              والمتانة والتصميم الذي يصنع فرقاً في كل بيت.
            </motion.p>

            <motion.div
              {...reveal(0.64, 22)}
              className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row"
            >
              <motion.a
                href="#libronic"
                whileHover={shouldReduceMotion ? undefined : { y: -3, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-primary px-7 text-sm font-extrabold text-primary-foreground shadow-soft transition-shadow hover:shadow-glow sm:text-base"
              >
                اكتشف شراكتنا مع ليبرونك
                <ArrowLeft
                  className="h-5 w-5 transition-transform group-hover:-translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-dark-wine-800/80 bg-soft-blush-900/90 px-7 text-sm font-extrabold text-secondary shadow-soft backdrop-blur-md transition-colors hover:border-primary/40 hover:bg-brand-soft sm:text-base"
              >
                تواصل معنا
                <UtensilsCrossed className="h-4.5 w-4.5 text-primary" aria-hidden="true" />
              </motion.a>
            </motion.div>

            <motion.div
              {...reveal(0.75, 14)}
              className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-muted-foreground sm:text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-accent" aria-hidden="true" />
                تشكيلات مختارة بعناية
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-primary" aria-hidden="true" />
                جودة موثوقة للبيت والضيافة
              </span>
            </motion.div>
          </div>
        </div>

        <motion.div
          dir="ltr"
          className="absolute bottom-0 left-1/2 w-[152vw] -translate-x-1/2 rotate-[3deg] overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] sm:w-[132vw] lg:w-[116vw]"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.05, delay: 0.22, ease: EASE }}
        >
          <ProductRail reverse duration={39} />
        </motion.div>
      </div>
    </section>
  );
}

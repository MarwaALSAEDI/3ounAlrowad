import { motion } from "motion/react";
import {
  BadgeCheck,
  CookingPot,
  Globe2,
  HandPlatter,
  PlugZap,
  ShieldCheck,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import mixer from "@/assets/p-mixer.png";
import { Reveal, Stagger, itemVariants } from "./Reveal";

const worlds = [
  {
    Icon: PlugZap,
    eyebrow: "الأجهزة الكهربائية",
    title: "قوة ذكية لكل مهمة",
    description:
      "من التحضير والخلط إلى الطهي اليومي، أجهزة عملية تجمع الأداء الموثوق مع تصميم ينسجم مع مطبخك.",
    image: mixer,
    imageAlt: "عجانة كهربائية حديثة للمطبخ",
    imageClassName: "object-contain p-8 sm:p-10",
    imageBackground: "bg-gradient-to-br from-soft-blush-700 via-soft-blush-900 to-honeydew-700",
    tags: ["تحضير", "خلط", "طهي"],
  },
  {
    Icon: UtensilsCrossed,
    eyebrow: "الأدوات اليدوية",
    title: "تفاصيل صغيرة، فرق كبير",
    description:
      "أدوات يومية مدروسة تجعل التحضير والتقديم أكثر سهولة، وتبقى دائماً في متناول اليد.",
    image: "/oyoun-collection/marble-cups-caramel.webp",
    imageAlt: "طقم فناجين وصحون ضيافة رخامية",
    imageClassName: "object-cover",
    imageBackground: "bg-soft-blush-700",
    tags: ["تقطيع", "تحضير", "تقديم"],
  },
  {
    Icon: CookingPot,
    eyebrow: "الأواني والسيراميك",
    title: "تشكيلة لكل وصفة ومائدة",
    description:
      "مقالي وأواني طهي، قطع تقديم، وأطباق حساء وسيراميك تجمع الاستخدام اليومي مع حضور أنيق على المائدة.",
    image: "/oyoun-collection/heritage-dinnerware.webp",
    imageAlt: "تشكيلة صحون وأوعية سيراميك للمائدة",
    imageClassName: "object-cover",
    imageBackground: "bg-soft-blush-700",
    tags: ["مقالي", "أواني تقديم", "أطباق حساء"],
  },
] as const;

export function KitchenWorld() {
  return (
    <section
      id="kitchen-world"
      dir="rtl"
      aria-labelledby="kitchen-world-title"
      className="relative isolate overflow-hidden bg-background py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-36 bg-gradient-to-b from-dark-garnet-100 via-dark-wine-900/15 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 -z-20 h-80 w-80 rounded-full bg-primary/10 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-36 bottom-16 -z-20 h-72 w-72 rounded-full bg-accent/10 blur-[105px]"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            عالم متكامل للمطبخ
          </span>
          <h2
            id="kitchen-world-title"
            className="font-display mt-4 text-[clamp(1.65rem,3.2vw,2.85rem)] font-bold leading-[1.2] tracking-tight"
          >
            مطبخك من الألف إلى الياء
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            في عيون الرواد للتجارة العامة والوكالات التجارية، نجمع الأجهزة الكهربائية وأدوات المطبخ
            اليدوية والأواني والسيراميك ضمن تشكيلة تجعل التحضير أسهل والمائدة أكثر حضوراً.
          </p>
        </Reveal>

        <Stagger gap={0.09} className="mt-14 grid gap-5 lg:grid-cols-3">
          {worlds.map((world) => (
            <motion.article
              key={world.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 230, damping: 24 }}
              className="group overflow-hidden rounded-[1.9rem] border border-border bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
            >
              <figure
                className={`relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-[1.45rem] ${world.imageBackground}`}
              >
                <img
                  src={world.image}
                  alt={world.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={900}
                  height={700}
                  className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${world.imageClassName}`}
                />
                <span className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-2xl border border-soft-blush-900/55 bg-soft-blush-900/88 text-primary shadow-soft backdrop-blur-md">
                  <world.Icon className="h-5 w-5" strokeWidth={1.9} aria-hidden="true" />
                </span>
              </figure>

              <div className="p-6 sm:p-7">
                <p className="text-xs font-black tracking-wide text-primary">{world.eyebrow}</p>
                <h3 className="font-display mt-2 text-xl font-extrabold leading-snug text-secondary">
                  {world.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{world.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`يشمل ${world.eyebrow}`}>
                  {world.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-dark-wine-800/70 bg-brand-soft px-3 py-1.5 text-[11px] font-extrabold text-primary"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </Stagger>

        <Reveal mode="fade" className="mt-16 sm:mt-20">
          <div className="overflow-hidden rounded-[1.9rem] border border-dark-wine-800/70 bg-soft-blush-900/85 p-4 shadow-soft backdrop-blur-xl sm:p-5">
            <div className="flex flex-col gap-3 px-2 pb-4 sm:flex-row sm:items-center sm:justify-between sm:px-3">
              <div>
                <p className="flex items-center gap-2 text-sm font-black text-secondary">
                  <HandPlatter className="h-4 w-4 text-primary" aria-hidden="true" />
                  أشهر العلامات العالمية
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  أسماء موثوقة، وفي مقدمتها ليبرونك بتمثيل حصري من عيون الرواد.
                </p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-success-soft px-3 py-1.5 text-[11px] font-black text-india-green-500">
                <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />
                اختيار موثوق
              </span>
            </div>

            <div
              role="list"
              aria-label="اختياراتنا من العلامات العالمية"
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4"
            >
              <motion.div
                role="listitem"
                whileHover={{ y: -3 }}
                className="flex min-h-20 items-center justify-center gap-3 rounded-2xl bg-dark-garnet-100 px-4 text-soft-blush-900 shadow-soft"
              >
                <img
                  src="/libronic-logo.png"
                  alt="شعار ليبرونك"
                  loading="lazy"
                  decoding="async"
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <span dir="ltr" className="font-display text-sm font-black tracking-[0.12em]">
                  LIBRONIC
                </span>
              </motion.div>

              <motion.div
                role="listitem"
                whileHover={{ y: -3 }}
                className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 text-sm font-bold text-secondary"
              >
                <Globe2 className="h-5 w-5 text-primary" aria-hidden="true" />
                تقنيات عالمية
              </motion.div>
              <motion.div
                role="listitem"
                whileHover={{ y: -3 }}
                className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 text-sm font-bold text-secondary"
              >
                <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
                تصاميم مبتكرة
              </motion.div>
              <motion.div
                role="listitem"
                whileHover={{ y: -3 }}
                className="flex min-h-20 items-center justify-center gap-3 rounded-2xl border border-border bg-card px-4 text-sm font-bold text-secondary"
              >
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
                جودة وأداء
              </motion.div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

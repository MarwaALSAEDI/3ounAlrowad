import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  Leaf,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

import { Reveal, Stagger, itemVariants } from "./Reveal";

const principles = [
  {
    Icon: BadgeCheck,
    title: "الجودة والموثوقية",
    description: "جودة واضحة وخدمات موثوقة تضع رضا العملاء في صميم العمل.",
    tone: "bg-brand-soft text-primary",
  },
  {
    Icon: ShieldCheck,
    title: "الأمان",
    description: "حلول تلتزم بمتطلبات الأمان ومعايير الصناعة ذات الصلة.",
    tone: "bg-dark-garnet-100 text-dark-wine-900",
  },
  {
    Icon: Leaf,
    title: "المسؤولية البيئية",
    description: "اهتمام بالمعايير البيئية ضمن القرارات والحلول التي نقدّمها.",
    tone: "bg-success-soft text-accent",
  },
] as const;

export function CompanyProfile() {
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="company-profile"
      dir="rtl"
      aria-labelledby="company-profile-title"
      className="relative isolate overflow-hidden px-5 pb-10 pt-24 sm:px-8 sm:pb-16 sm:pt-32"
    >
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 -z-20 opacity-30 [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-[105px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-72 w-72 rounded-full bg-accent/10 blur-[105px]" />

      <div className="mx-auto max-w-7xl">
        <div className="grid items-end gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal className="max-w-3xl">
            <span className="eyebrow">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              من نحن
            </span>
            <h2
              id="company-profile-title"
              className="font-display mt-4 text-[clamp(1.65rem,3.35vw,3rem)] font-bold leading-[1.22] tracking-tight text-secondary"
            >
              خبرة تجارية تقودها
              <span className="text-gilded mt-2 block">الجودة والثقة.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
              عيون الرواد شركة رائدة في تجارة الأجهزة الكهربائية والوكالات التجارية،
              تبني أعمالها على الجودة، كفاءة الخدمات، ورضا العملاء.
            </p>
          </Reveal>

          <Reveal mode="blur" delay={0.1}>
            <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/15 bg-card/85 p-6 shadow-soft backdrop-blur-xl sm:p-8">
              <span aria-hidden="true" className="absolute -left-10 -top-12 h-36 w-36 rounded-full bg-primary/10 blur-3xl" />
              <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow">
                <UsersRound className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="font-display relative mt-5 text-lg font-extrabold text-secondary sm:text-xl">
                فريق محترف، ومهمة واضحة
              </h3>
              <p className="relative mt-3 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
                يعمل فريقنا المحترف على تقديم حلول شاملة وموثوقة، متوافقة مع
                معايير الصناعة ومتطلبات البيئة والأمان.
              </p>
            </div>
          </Reveal>
        </div>

        <Stagger gap={0.1} className="mt-12 grid gap-4 md:grid-cols-3 sm:mt-16">
          {principles.map(({ Icon, title, description, tone }) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover={reducedMotion ? undefined : { y: -6 }}
              className="group rounded-[1.6rem] border border-border/70 bg-card p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-7"
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tone}`}>
                <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="font-display mt-5 text-base font-extrabold text-secondary sm:text-lg">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
            </motion.article>
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-10 flex flex-col gap-5 rounded-[1.5rem] border border-primary/15 bg-brand-soft/50 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <p className="max-w-2xl text-sm font-bold leading-7 text-secondary sm:text-base">
            لنتحدث عن احتياجك والحلول التي يمكن لعيون الرواد تقديمها.
          </p>
          <motion.a
            href="#contact"
            whileHover={reducedMotion ? undefined : { x: -4, scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="group inline-flex min-h-13 shrink-0 items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-sm font-extrabold text-primary-foreground shadow-soft transition-shadow hover:shadow-glow"
          >
            تواصل معنا
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}

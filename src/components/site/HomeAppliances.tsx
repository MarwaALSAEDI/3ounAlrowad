import { motion } from "motion/react";
import {
  ArrowLeft,
  BadgeCheck,
  Microwave,
  Refrigerator,
  Sparkles,
  UtensilsCrossed,
  WashingMachine,
  Wind,
  Zap,
} from "lucide-react";
import { Reveal, Stagger, itemVariants } from "./Reveal";

const categories = [
  {
    Icon: Refrigerator,
    title: "الثلاجات",
    description: "تبريد موثوق يحافظ على الطزاجة وينسجم مع تفاصيل مطبخك.",
  },
  {
    Icon: WashingMachine,
    title: "الغسالات",
    description: "عناية فعّالة بالملابس، بأداء هادئ واستهلاك مدروس.",
  },
  {
    Icon: Microwave,
    title: "الأفران",
    description: "حرارة دقيقة وأداء ثابت لنتائج متقنة في كل وصفة.",
  },
  {
    Icon: Wind,
    title: "المكانس",
    description: "قوة تنظيف عملية تمنحك بيتاً أنظف بوقت وجهد أقل.",
  },
  {
    Icon: UtensilsCrossed,
    title: "الصحون السيراميكية",
    description: "تشكيلات تجمع أناقة المائدة بجودة تناسب الاستخدام اليومي والضيافة.",
  },
];

const advantages = [
  {
    Icon: Zap,
    title: "كفاءة الطاقة والأداء",
    description:
      "أجهزة مختارة لتقدّم أداءً قوياً ومستقراً مع استهلاك مدروس للطاقة، فتنجز مهام البيت بكفاءة أكبر كل يوم.",
  },
  {
    Icon: Sparkles,
    title: "التصميم العصري",
    description:
      "خطوط أنيقة، تفاصيل عملية، وتشطيبات تنسجم مع البيت الحديث من دون أن تتنازل عن سهولة الاستخدام.",
  },
  {
    Icon: BadgeCheck,
    title: "أسعار تنافسية وجودة موثوقة",
    description:
      "نوازن بين القيمة والجودة عبر خيارات مدروسة من علامات عالمية، لتستثمر في منتج يرافق بيتك بثقة.",
  },
];

export function HomeAppliances() {
  return (
    <section
      id="appliances"
      aria-labelledby="appliances-title"
      dir="rtl"
      className="relative overflow-hidden bg-soft-blush-900 py-24 sm:py-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="pointer-events-none absolute -right-32 top-16 h-72 w-72 rounded-full bg-primary/8 blur-[100px]" />
      <div className="pointer-events-none absolute -left-32 bottom-10 h-72 w-72 rounded-full bg-accent/8 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-end lg:gap-16">
          <div className="max-w-3xl">
            <span className="eyebrow">تقنية تخدم يومك</span>
            <h2
              id="appliances-title"
              className="font-display mt-4 text-[clamp(1.55rem,3.15vw,2.8rem)] font-bold leading-[1.24] tracking-tight"
            >
              أجهزة عالمية لبيتٍ يعمل بسلاسة.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              في عيون الرواد نختار من العلامات العالمية أجهزة تجمع الاعتمادية، الأداء، والتصميم
              العصري، لتجعل كل مهمة يومية أبسط وأكثر راحة.
            </p>
          </div>

          <motion.a
            href="https://wa.me/9647713340229"
            target="_blank"
            rel="noreferrer"
            whileHover={{ x: -4, boxShadow: "var(--shadow-glow)" }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-2xl bg-primary px-6 text-sm font-bold text-primary-foreground shadow-soft"
          >
            تواصل معنا
            <ArrowLeft
              className="h-4 w-4 transition-transform group-hover:-translate-x-1"
              aria-hidden="true"
            />
          </motion.a>
        </Reveal>

        <Stagger gap={0.07} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ Icon, title, description }, index) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className={`group rounded-[1.6rem] border border-border/70 p-5 shadow-soft transition-colors duration-500 hover:border-primary/45 ${
                index === categories.length - 1
                  ? "bg-success-soft sm:col-span-2 lg:col-span-1"
                  : "bg-card"
              }`}
            >
              <span
                className={`grid h-11 w-11 place-items-center rounded-2xl ${
                  index === categories.length - 1
                    ? "bg-accent text-accent-foreground"
                    : index % 2
                      ? "bg-success-soft text-accent"
                      : "bg-brand-soft text-primary"
                }`}
              >
                <Icon
                  className="h-5 w-5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <h3 className="font-display mt-5 text-base font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </motion.article>
          ))}
        </Stagger>

        <Reveal className="mt-16 border-t border-border/60 pt-12 sm:mt-20 sm:pt-14">
          <div className="max-w-2xl">
            <span className="eyebrow">اختيار أذكى للبيت</span>
            <h3 className="font-display mt-3 text-[clamp(1.45rem,2.6vw,2.3rem)] font-bold leading-tight tracking-tight">
              قيمة واضحة في كل جهاز تختاره.
            </h3>
          </div>
        </Reveal>

        <Stagger gap={0.1} className="mt-8 grid gap-4 lg:grid-cols-3">
          {advantages.map(({ Icon, title, description }, index) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-6 shadow-soft transition-all duration-500 hover:border-primary/40 hover:shadow-lift sm:p-7"
            >
              <span
                className="font-display absolute left-5 top-3 text-5xl font-black text-primary/[0.055]"
                aria-hidden="true"
              >
                ٠{index + 1}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-primary">
                <Icon
                  className="h-6 w-6 transition-transform duration-500 group-hover:scale-110"
                  strokeWidth={1.8}
                  aria-hidden="true"
                />
              </span>
              <h4 className="font-display mt-6 text-lg font-extrabold">{title}</h4>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

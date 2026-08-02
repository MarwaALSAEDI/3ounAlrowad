import { motion } from "motion/react";
import { BadgeCheck, CookingPot, Gem, Handshake, Sparkles } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "./Reveal";

const pillars = [
  { Icon: CookingPot, title: "اختصاص نعرفه", desc: "تركيز واضح على الأواني، الصحون، وتفاصيل المائدة التي تصنع الفرق." },
  { Icon: Gem, title: "اختيار بعين خبيرة", desc: "تشكيلات منتقاة لتجمع بين الحضور البصري، العملية، وجودة الاستخدام." },
  { Icon: Handshake, title: "شراكات راسخة", desc: "نبني حضور العلامات التي نمثلها بعلاقة مهنية طويلة المدى." },
  { Icon: BadgeCheck, title: "وكالة حصرية", desc: "عيون الرواد هي الوكيل الحصري لشركة ليبرونك." },
  { Icon: Sparkles, title: "تفاصيل تُرى", desc: "من العرض إلى التواصل، نصنع تجربة تعبّر عن قيمة كل مجموعة." },
];

export function Features() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      <div className="pointer-events-none absolute -left-28 bottom-12 h-72 w-72 rounded-full bg-accent/10 blur-[100px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">عن عيون الرواد</span>
          <h2 className="font-display mt-4 text-[clamp(1.55rem,3.15vw,2.8rem)] font-bold leading-[1.24] tracking-tight">
            نعرف المائدة.<br /><span className="text-gilded">ونعرف ما يجعلها استثنائية.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">عيون الرواد شركة متخصصة في الأواني والصحون ومستلزمات المائدة، تجمع بين الاختيار المدروس والحضور الذي يليق بالمنزل والضيافة.</p>
        </Reveal>

        <Stagger gap={0.08} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(({ Icon, title, desc }, index) => (
            <motion.article
              key={title}
              variants={itemVariants}
              whileHover={{ y: -8, rotate: index % 2 ? 0.6 : -0.6 }}
              className={`group rounded-[1.75rem] border p-6 shadow-soft transition-all duration-500 hover:shadow-lift ${index === 3 ? "dark border-primary/25 bg-background text-foreground" : "border-border bg-card"}`}
            >
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 3 ? "bg-accent text-accent-foreground" : index % 2 ? "bg-success-soft text-accent" : "bg-brand-soft text-primary"}`}>
                <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.8} />
              </span>
              <h3 className="font-display mt-6 text-lg font-extrabold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { BadgeDollarSign, BadgeCheck, Headphones, ShieldCheck, Truck } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "./Reveal";

const features = [
  { Icon: BadgeCheck, title: "منتجات أصلية", desc: "مصادر معتمدة وعلامات عالمية موثوقة." },
  { Icon: Truck, title: "شحن سريع", desc: "توصيل آمن وسريع إلى جميع المناطق." },
  { Icon: ShieldCheck, title: "ضمان رسمي", desc: "ضمان شامل يحفظ حقك بعد الشراء." },
  { Icon: BadgeDollarSign, title: "أفضل الأسعار", desc: "قيمة حقيقية وعروض تتجدد باستمرار." },
  { Icon: Headphones, title: "دعم متواصل", desc: "فريق متخصص معك قبل وبعد الطلب." },
];

export function Features() {
  return (
    <section id="why-us" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">لماذا عيون الرواد؟</span>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-black tracking-tight">تجربة شراء يمكنك الوثوق بها</h2>
          <p className="mt-4 leading-7 text-muted-foreground">من أول نقرة وحتى وصول طلبك، نهتم بكل تفصيل.</p>
        </Reveal>

        <Stagger gap={0.08} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {features.map(({ Icon, title, desc }, index) => (
            <motion.article key={title} variants={itemVariants} whileHover={{ y: -8 }} className={`group rounded-3xl border p-6 shadow-soft transition-all duration-500 hover:shadow-lift ${index === 2 ? "border-primary/20 bg-primary text-primary-foreground" : "border-border bg-card"}`}>
              <span className={`grid h-12 w-12 place-items-center rounded-2xl ${index === 2 ? "bg-soft-blush-900/15" : index % 2 ? "bg-success-soft text-accent" : "bg-brand-soft text-primary"}`}>
                <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" strokeWidth={1.8} />
              </span>
              <h3 className="font-display mt-6 text-lg font-extrabold">{title}</h3>
              <p className={`mt-2 text-sm leading-6 ${index === 2 ? "text-soft-blush-900/75" : "text-muted-foreground"}`}>{desc}</p>
            </motion.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

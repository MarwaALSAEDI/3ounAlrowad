import { motion } from "motion/react";
import { Blend, CookingPot, Cpu, PlugZap, SprayCan, WashingMachine } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "./Reveal";

const categories = [
  { label: "أجهزة المطبخ", desc: "تحضير أسرع كل يوم", Icon: Blend },
  { label: "أجهزة المنزل", desc: "راحة لكل غرفة", Icon: WashingMachine },
  { label: "أواني الطهي", desc: "نتائج احترافية", Icon: CookingPot },
  { label: "الإلكترونيات", desc: "تقنيات ذكية", Icon: Cpu },
  { label: "التنظيف", desc: "منزل أنظف بسهولة", Icon: SprayCan },
  { label: "الإكسسوارات", desc: "كل ما يكمل منزلك", Icon: PlugZap },
];

export function Categories() {
  return (
    <section id="categories" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">تسوّق بطريقتك</span>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.6vw,3.7rem)] font-black leading-tight tracking-tight">كل ما يحتاجه المنزل</h2>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted-foreground">أقسام متكاملة، مرتبة بعناية لتصل إلى ما تبحث عنه في لحظات.</p>
        </Reveal>

        <Stagger gap={0.08} className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map(({ label, desc, Icon }, index) => (
            <motion.a key={label} href="#best" variants={itemVariants} whileHover={{ y: -8 }} className="group relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-soft transition-all duration-500 hover:border-primary/25 hover:shadow-lift sm:p-6">
              <span className="absolute -left-8 -top-8 h-20 w-20 rounded-full bg-primary/0 blur-xl transition-colors group-hover:bg-primary/12" />
              <span className={`relative grid h-12 w-12 place-items-center rounded-2xl ${index % 3 === 1 ? "bg-success-soft text-accent" : "bg-blue-soft text-primary"}`}>
                <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" strokeWidth={1.8} />
              </span>
              <h3 className="font-display relative mt-7 text-base font-extrabold leading-snug sm:text-lg">{label}</h3>
              <p className="relative mt-2 text-xs leading-5 text-muted-foreground">{desc}</p>
              <span className="relative mt-5 inline-flex text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100">اكتشف الآن ←</span>
            </motion.a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { Reveal, Stagger, itemVariants } from "./Reveal";

const reviews = [
  { name: "سارة العتيبي", role: "عميلة منذ ٢٠٢٣", initials: "س ع", color: "bg-blue-100 text-primary", review: "وصلت القلاية في اليوم التالي والتغليف ممتاز. المنتج أصلي وخدمة العملاء تابعت معي حتى بعد الاستلام." },
  { name: "محمد الشمري", role: "أكثر من ٧ طلبات", initials: "م ش", color: "bg-emerald-100 text-emerald-700", review: "الأسعار واضحة والتجربة سلسة جداً. جهزت أغلب أجهزة مطبخي من عيون الرواد ولم أواجه أي مشكلة." },
  { name: "نورة القحطاني", role: "عميلة موثّقة", initials: "ن ق", color: "bg-violet-100 text-violet-700", review: "أكثر ما أعجبني هو سرعة الرد والضمان الرسمي. التفاصيل في الموقع مطابقة تماماً للمنتج الذي وصلني." },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">ثقة تُبنى مع كل طلب</span>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-black tracking-tight">ماذا يقول عملاؤنا؟</h2>
          <p className="mt-4 leading-7 text-muted-foreground">تجارب حقيقية من بيوت اختارت الراحة والجودة.</p>
        </Reveal>

        <Stagger gap={0.1} className="mt-14 grid gap-5 lg:grid-cols-3">
          {reviews.map((review) => (
            <motion.figure key={review.name} variants={itemVariants} whileHover={{ y: -8 }} className="relative rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift sm:p-8">
              <Quote className="absolute left-7 top-7 h-9 w-9 fill-blue-soft text-blue-soft" aria-hidden="true" />
              <div className="flex items-center gap-1 text-amber-400" aria-label="5 من 5 نجوم">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
              <blockquote className="mt-7 min-h-32 text-base leading-8 text-foreground/80">“{review.review}”</blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-border pt-6">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-full text-sm font-black ${review.color}`}>{review.initials}</span>
                <span><strong className="font-display block text-sm font-extrabold">{review.name}</strong><small className="mt-1 block text-xs text-muted-foreground">{review.role}</small></span>
                <span className="mr-auto inline-flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[10px] font-bold text-emerald-700">✓ موثّق</span>
              </figcaption>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

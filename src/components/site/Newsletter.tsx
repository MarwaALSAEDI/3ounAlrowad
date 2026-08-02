import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Check, Mail, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section className="px-5 pb-24 sm:px-8 sm:pb-32">
      <Reveal mode="blur" className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/10 bg-gradient-to-br from-blue-50 via-white to-emerald-50 px-6 py-14 text-center shadow-soft sm:rounded-[2.5rem] sm:px-12 sm:py-20">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
        <div className="pointer-events-none absolute -right-28 top-0 h-72 w-72 rounded-full bg-primary/12 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-accent/12 blur-[90px]" />
        <div className="relative mx-auto max-w-2xl">
          <span className="mx-auto grid h-13 w-13 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><Mail className="h-6 w-6" /></span>
          <span className="eyebrow mt-6 justify-center"><Sparkles className="h-4 w-4" /> عروض مختارة لك</span>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.2vw,3.4rem)] font-black tracking-tight">كن أول من يعرف بالجديد</h2>
          <p className="mx-auto mt-4 max-w-lg leading-7 text-muted-foreground">اشترك لتصلك أحدث المنتجات والعروض الحصرية. رسالة مفيدة، بلا إزعاج.</p>

          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl border border-border bg-white p-2 shadow-soft sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">البريد الإلكتروني</label>
            <input id="newsletter-email" type="email" autoComplete="email" required disabled={sent} placeholder="أدخل بريدك الإلكتروني" className="min-h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60" />
            <motion.button type="submit" disabled={sent} whileHover={sent ? undefined : { scale: 1.025 }} whileTap={sent ? undefined : { scale: 0.97 }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-bold text-primary-foreground disabled:bg-accent disabled:text-accent-foreground">
              {sent ? <Check className="h-4 w-4" /> : null}{sent ? "تم الاشتراك" : "اشترك الآن"}{!sent ? <ArrowLeft className="h-4 w-4" /> : null}
            </motion.button>
          </form>
          <AnimatePresence>{sent && <motion.p role="status" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-sm font-semibold text-emerald-700">شكراً لك! أضفناك إلى قائمتنا بنجاح.</motion.p>}</AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

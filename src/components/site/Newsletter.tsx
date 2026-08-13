import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowUpLeft, Check, Mail, Phone, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

export function Newsletter() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32 sm:pt-16">
      <Reveal mode="blur" className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-primary/15 bg-gradient-to-br from-soft-blush-700 via-soft-blush-900 to-honeydew-700 px-6 py-14 shadow-lift sm:rounded-[2.75rem] sm:px-12 sm:py-20 lg:px-20">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
        <div className="pointer-events-none absolute -right-28 top-0 h-72 w-72 rounded-full bg-primary/14 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-28 left-0 h-72 w-72 rounded-full bg-accent/14 blur-[90px]" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-glow"><Mail className="h-6 w-6" /></span>
            <span className="eyebrow mt-7"><Sparkles className="h-4 w-4" /> لنبدأ حواراً</span>
            <h2 className="font-display mt-4 text-[clamp(1.55rem,3.15vw,2.8rem)] font-bold leading-[1.24] tracking-tight">للتوزيع، التوريد،<br />أو معرفة المزيد عن ليبرونك.</h2>
            <p className="mt-5 max-w-xl leading-8 text-muted-foreground">اترك بريدك، وسيتواصل معك فريق عيون الرواد لمناقشة ما تحتاجه.</p>
            <div className="mt-7 flex flex-col gap-3 text-sm font-bold sm:flex-row sm:flex-wrap">
              <a href="mailto:info@aounalruwad.com" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary/15 bg-soft-blush-900/70 px-4 text-primary transition-colors hover:bg-soft-blush-900">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">info@aounalruwad.com</span>
              </a>
              <a href="tel:+9647722664218" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary/15 bg-soft-blush-900/70 px-4 text-primary transition-colors hover:bg-soft-blush-900">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">+964 772 266 4218</span>
              </a>
              <a href="tel:+9647700511286" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-primary/15 bg-soft-blush-900/70 px-4 text-primary transition-colors hover:bg-soft-blush-900">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">+964 770 051 1286</span>
              </a>
            </div>
          </div>

          <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="rounded-[1.5rem] border border-border bg-soft-blush-900/90 p-3 shadow-soft backdrop-blur-xl">
            <label htmlFor="contact-email" className="sr-only">البريد الإلكتروني</label>
            <input id="contact-email" type="email" autoComplete="email" required disabled={sent} placeholder="البريد الإلكتروني" className="min-h-14 w-full rounded-xl bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60" />
            <motion.button type="submit" disabled={sent} whileHover={sent ? undefined : { scale: 1.015 }} whileTap={sent ? undefined : { scale: 0.98 }} className="mt-2 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-7 text-sm font-black text-primary-foreground disabled:bg-accent disabled:text-accent-foreground">
              {sent ? <Check className="h-4 w-4" /> : null}{sent ? "شكراً لتواصلك" : "اطلب تواصلاً"}{!sent ? <ArrowUpLeft className="h-4 w-4" /> : null}
            </motion.button>
            <AnimatePresence>{sent && <motion.p role="status" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="px-3 pb-2 pt-4 text-center text-sm font-bold text-india-green-500">وصل اهتمامك، ويسعدنا الحديث معك.</motion.p>}</AnimatePresence>
          </form>
        </div>
      </Reveal>
    </section>
  );
}

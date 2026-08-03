import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowUpLeft, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { label: "من نحن", href: "/#about" },
  { label: "ليبرونك", href: "/#libronic" },
  { label: "مجالاتنا", href: "/#collections" },
  { label: "معرضنا", href: "/#gallery" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 180], [1, 0.97]);
  const navY = useTransform(scrollY, [0, 180], [0, -2]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      dir="rtl"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6"
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <motion.nav
        aria-label="التنقل الرئيسي"
        style={{ scale: navScale, y: navY }}
        className="mx-auto flex max-w-7xl items-start justify-between gap-3"
      >
        <div className="pointer-events-auto flex min-h-14 items-center gap-2 rounded-2xl border border-dark-wine-600/55 bg-dark-garnet-100/95 p-1.5 text-soft-blush-900 shadow-lift backdrop-blur-xl">
          <a href="/#hero" className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-xl px-2 py-1" aria-label="عيون الرواد - الرئيسية">
            <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-soft-blush-900 shadow-glow">
              <img src="/oyoun-alrowad-logo.png" alt="" width={44} height={44} decoding="async" fetchPriority="high" className="h-full w-full object-cover" />
            </span>
            <span className="font-display truncate text-base font-black tracking-tight sm:text-lg">عيون الرواد</span>
          </a>

          <span className="mx-1 hidden h-6 w-px bg-soft-blush-900/15 lg:block" />
          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="block rounded-xl px-3 py-2 text-xs font-bold text-soft-blush-900/65 transition-colors hover:bg-soft-blush-900/10 hover:text-soft-blush-900">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open} className="grid h-10 w-10 place-items-center rounded-xl transition-colors hover:bg-soft-blush-900/10 lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <motion.a
          href="/#contact"
          whileHover={{ y: -2, scale: 1.025 }}
          whileTap={{ scale: 0.97 }}
          className="pointer-events-auto inline-flex min-h-14 items-center gap-2 rounded-2xl bg-accent px-4 text-sm font-black text-accent-foreground shadow-success sm:px-6"
        >
          تواصل معنا <ArrowUpLeft className="h-4 w-4" />
        </motion.a>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -10, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.98 }} className="pointer-events-auto mx-auto mt-2 max-w-7xl lg:hidden">
            <ul className="w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-border bg-card/95 p-2 shadow-lift backdrop-blur-xl">
              {links.map((link) => (
                <li key={link.href}>
                  <a onClick={() => setOpen(false)} href={link.href} className="block rounded-xl px-4 py-3 text-sm font-bold transition-colors hover:bg-muted hover:text-primary">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

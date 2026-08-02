import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ShoppingBag, Search, Menu, X, Heart } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png.asset.json";

const links = [
  { label: "الرئيسية", href: "#hero" },
  { label: "الأقسام", href: "#categories" },
  { label: "المنتجات", href: "#best" },
  { label: "لماذا نحن", href: "#why-us" },
  { label: "آراء العملاء", href: "#testimonials" },
  { label: "الأسئلة", href: "#faq" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const pad = useTransform(scrollY, [0, 140], ["1.25rem", "0.7rem"]);
  const border = useTransform(scrollY, [0, 120], [0, 1]);
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="glass-nav fixed inset-x-0 top-0 z-50"
      style={{ paddingTop: pad, paddingBottom: pad, borderBottomWidth: border }}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
    >
      <nav aria-label="التنقل الرئيسي" className="mx-auto flex max-w-7xl items-center gap-5 px-5 sm:px-8">
        <a href="#hero" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="عيون الرواد - الرئيسية">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-2xl bg-primary shadow-glow">
            <img src={logo.url} alt="" width={44} height={44} className="h-full w-full object-contain" />
          </span>
          <span className="font-display truncate text-lg font-extrabold tracking-tight sm:text-xl">عيون الرواد</span>
        </a>

        <ul className="mx-auto hidden items-center gap-7 text-sm font-semibold lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="relative py-2 text-foreground/65 transition-colors hover:text-primary after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-primary after:transition-transform hover:after:origin-right hover:after:scale-x-100">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mr-auto flex shrink-0 items-center gap-1">
          {[Search, Heart].map((Icon, index) => (
            <motion.button key={index} type="button" whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} aria-label={["بحث", "المفضلة"][index]} className="hidden h-10 w-10 place-items-center rounded-xl text-foreground/70 transition-colors hover:bg-muted hover:text-primary sm:grid">
              <Icon className="h-[18px] w-[18px]" />
            </motion.button>
          ))}
          <motion.button type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="relative inline-flex h-11 items-center gap-2 rounded-xl bg-secondary px-3.5 text-sm font-bold text-secondary-foreground shadow-soft transition-shadow hover:shadow-lift" aria-label="سلة التسوق، 3 منتجات">
            <ShoppingBag className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">السلة</span>
            <span className="grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-black text-accent-foreground">٣</span>
          </motion.button>
          <button type="button" onClick={() => setOpen((value) => !value)} aria-label={open ? "إغلاق القائمة" : "فتح القائمة"} aria-expanded={open} className="grid h-11 w-11 place-items-center rounded-xl hover:bg-muted lg:hidden">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden lg:hidden">
            <ul className="mx-5 mt-3 rounded-2xl border border-border bg-card p-2 shadow-lift sm:mx-8">
              {links.map((link) => (
                <li key={link.href}>
                  <a onClick={() => setOpen(false)} href={link.href} className="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-muted hover:text-primary">
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

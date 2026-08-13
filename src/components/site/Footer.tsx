import { motion } from "motion/react";
import { ArrowUpLeft, Mail, Phone } from "lucide-react";
import { Stagger, itemVariants } from "./Reveal";

const links = [
  { label: "من نحن", href: "/#about" },
  { label: "الوكالة الحصرية", href: "/#libronic" },
  { label: "مجالاتنا", href: "/#collections" },
  { label: "معرضنا", href: "/#gallery" },
];

export function Footer() {
  return (
    <footer id="footer" className="dark bg-background text-foreground">
      <Stagger gap={0.08} className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_0.8fr] lg:items-start">
          <motion.div variants={itemVariants}>
            <a href="/#hero" className="inline-flex items-center gap-3" aria-label="عيون الرواد - الرئيسية">
              <span className="grid h-14 w-14 place-items-center overflow-hidden rounded-full bg-soft-blush-900 shadow-glow">
                <img src="/oyoun-alrowad-logo.png" alt="" loading="lazy" decoding="async" width={56} height={56} className="h-full w-full object-cover" />
              </span>
              <span className="font-display text-xl font-black">عيون الرواد</span>
            </a>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">شركة متخصصة في الأواني والصحون ومستلزمات المائدة، والوكيل الحصري لشركة ليبرونك.</p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-display text-sm font-extrabold text-soft-blush-900/55">اكتشف</h3>
            <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
              {links.map((link) => <li key={link.href}><a href={link.href} className="transition-colors hover:text-primary">{link.label}</a></li>)}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="font-display text-sm font-extrabold text-soft-blush-900/55">تعاون معنا</h3>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">للتوزيع، التوريد، وفرص الشراكة.</p>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a href="mailto:info@aounalruwad.com" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  <span dir="ltr">info@aounalruwad.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+9647722664218" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span dir="ltr">+964 772 266 4218</span>
                </a>
              </li>
              <li>
                <a href="tel:+9647700511286" className="inline-flex items-center gap-2 transition-colors hover:text-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  <span dir="ltr">+964 770 051 1286</span>
                </a>
              </li>
            </ul>
            <motion.a href="https://wa.me/9647713340229" target="_blank" rel="noreferrer" whileHover={{ x: -4 }} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-black text-accent-foreground">
              تواصل معنا <ArrowUpLeft className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-14 flex flex-col gap-3 border-t border-border pt-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© ٢٠٢٦ عيون الرواد. جميع الحقوق محفوظة.</p>
          <p className="font-semibold text-soft-blush-900/55">OYOUN ALROWAD × LIBRONIC</p>
        </motion.div>
      </Stagger>
    </footer>
  );
}

import { motion } from "motion/react";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { Stagger, itemVariants } from "./Reveal";

const columns = [
  { title: "التسوق", links: ["أجهزة المطبخ", "أجهزة المنزل", "أواني الطهي", "الإلكترونيات", "العروض"] },
  { title: "بيت الراحة", links: ["من نحن", "علاماتنا", "الفروع", "الوظائف", "تواصل معنا"] },
  { title: "خدمة العملاء", links: ["الشحن والتوصيل", "الاستبدال والإرجاع", "الضمان", "طرق الدفع", "الأسئلة الشائعة"] },
];

export function Footer() {
  return (
    <footer className="dark bg-background text-foreground">
      <Stagger gap={0.08} className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.45fr_repeat(3,1fr)]">
          <motion.div variants={itemVariants}>
            <a href="#hero" className="inline-flex items-center gap-3" aria-label="بيت الراحة - الرئيسية">
              <span className="grid h-12 w-12 place-items-center overflow-hidden rounded-2xl bg-primary shadow-glow"><img src={logo.url} alt="" loading="lazy" width={48} height={48} className="h-full w-full object-contain" /></span>
              <span className="font-display text-xl font-black">بيت الراحة</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">وجهتك الموثوقة للأجهزة المنزلية وأدوات المطبخ الأصلية—جودة تدوم، وخدمة تجعل التسوق أسهل.</p>
            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li><a href="tel:+966500000000" className="inline-flex items-center gap-3 transition-colors hover:text-primary"><Phone className="h-4 w-4" /> +٩٦٦ ٥٠ ٠٠٠ ٠٠٠٠</a></li>
              <li><a href="mailto:info@baitalraha.com" className="inline-flex items-center gap-3 transition-colors hover:text-primary"><Mail className="h-4 w-4" /> info@baitalraha.com</a></li>
              <li className="flex items-center gap-3"><MapPin className="h-4 w-4 shrink-0" /> الرياض، المملكة العربية السعودية</li>
            </ul>
          </motion.div>

          {columns.map((column) => (
            <motion.div key={column.title} variants={itemVariants}>
              <h3 className="font-display text-base font-extrabold">{column.title}</h3>
              <ul className="mt-5 space-y-3.5 text-sm text-muted-foreground">
                {column.links.map((link) => <li key={link}><a href={link === "الأسئلة الشائعة" ? "#faq" : "#categories"} className="transition-colors hover:text-primary">{link}</a></li>)}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-14 flex flex-col-reverse items-center justify-between gap-6 border-t border-border pt-7 sm:flex-row">
          <p className="text-center text-xs text-muted-foreground sm:text-right">© ٢٠٢٦ بيت الراحة. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-2">
            {[Instagram, Facebook, Linkedin].map((Icon, index) => (
              <motion.a key={index} href="#hero" aria-label={["إنستغرام", "فيسبوك", "لينكدإن"][index]} whileHover={{ y: -3, scale: 1.05 }} className="grid h-10 w-10 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"><Icon className="h-[18px] w-[18px]" /></motion.a>
            ))}
          </div>
        </motion.div>
      </Stagger>
    </footer>
  );
}

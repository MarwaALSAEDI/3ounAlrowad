import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CircleHelp, MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const questions = [
  { question: "هل جميع المنتجات أصلية؟", answer: "نعم. نتعامل مع الموردين والوكلاء المعتمدين فقط، وتأتي المنتجات بضمان رسمي وفاتورة شراء تحفظ حقك." },
  { question: "كم يستغرق توصيل الطلب؟", answer: "يصل معظم الطلبات داخل المدن الرئيسية خلال ٢٤–٤٨ ساعة، ومن ٣ إلى ٥ أيام عمل لبقية المناطق. يظهر الموعد المتوقع قبل إتمام الطلب." },
  { question: "ما سياسة الاستبدال والإرجاع؟", answer: "يمكنك طلب الاستبدال أو الإرجاع خلال ١٤ يوماً من الاستلام، بشرط بقاء المنتج في حالته الأصلية وفق الشروط الموضحة في سياسة المتجر." },
  { question: "هل يمكن الدفع عند الاستلام؟", answer: "نوفر الدفع الإلكتروني الآمن وخيارات دفع مرنة، إضافة إلى الدفع عند الاستلام في المناطق والطلبات المؤهلة." },
  { question: "كيف أستفيد من الضمان؟", answer: "تواصل مع فريق الدعم برقم الطلب، وسننسق معك خطوات الفحص والصيانة عبر الوكيل المعتمد بكل سهولة." },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <Reveal>
          <span className="eyebrow"><CircleHelp className="h-4 w-4" /> الأسئلة الشائعة</span>
          <h2 className="font-display mt-4 text-[clamp(2rem,4.3vw,3.5rem)] font-black leading-tight tracking-tight">كل ما تحتاج معرفته قبل الطلب</h2>
          <p className="mt-5 max-w-md leading-8 text-muted-foreground">لم تجد إجابتك؟ فريقنا جاهز لمساعدتك والإجابة عن أي استفسار.</p>
          <a href="mailto:info@oyoonalrowad.com" className="mt-8 inline-flex items-center gap-2 rounded-2xl border border-primary/15 bg-brand-soft/55 px-5 py-3 text-sm font-bold text-primary transition-colors hover:bg-brand-soft"><MessageCircle className="h-4 w-4" /> تواصل مع الدعم</a>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="space-y-3">
            {questions.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`} className="rounded-2xl border border-border bg-card px-5 shadow-soft data-[state=open]:border-primary/25 data-[state=open]:shadow-lift sm:px-6">
                <AccordionTrigger className="py-5 text-right font-display text-base font-extrabold hover:no-underline sm:text-lg">{item.question}</AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-7 text-muted-foreground sm:text-base">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}

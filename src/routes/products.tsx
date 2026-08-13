import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowUpLeft, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { libronicCatalog } from "@/data/libronicCatalog";
import { useLenis } from "@/hooks/use-lenis";

const TITLE = "منتجات ليبرونك | عيون الرواد";
const DESC =
  "اكتشف مجموعة مختارة من أجهزة ليبرونك المنزلية والكهربائية لدى عيون الرواد، الوكيل الحصري لليبرونك.";

type Category =
  "الكل" | "الأجهزة المنزلية" | "الطهي" | "التهوية" | "التبريد" | "التدفئة" | "التنظيف" | "الشاشات";

type Product = {
  category: Exclude<Category, "الكل">;
  detail: string;
  id: string;
  image: string;
  model: string;
  name: string;
};

const filters: Category[] = [
  "الكل",
  "الأجهزة المنزلية",
  "الطهي",
  "التهوية",
  "التبريد",
  "التدفئة",
  "التنظيف",
  "الشاشات",
];

function getCatalogCategory(name: string, categoryId: number): Exclude<Category, "الكل"> {
  if (name.includes("شاشة") || name.toUpperCase().includes("QLED")) return "الشاشات";
  if (/غسالة|جلاية|مكنسة|اوتي|مكواة|منظف|ممسحة/.test(name)) return "التنظيف";
  if (/صوبة|مدفأة|هيتر/.test(name)) return "التدفئة";
  if (/مبردة|مكيف|براد ماء/.test(name)) return "التبريد";
  if (/مروحة|مرشحة|ساحبة|شفاط|قاطع هواء/.test(name)) return "التهوية";
  if (categoryId === 14) return "الطهي";
  if (categoryId === 17) return "التبريد";
  return "الأجهزة المنزلية";
}

const categoryDetails: Record<Exclude<Category, "الكل">, string> = {
  "الأجهزة المنزلية": "أداء عملي موثوق للاستخدام المنزلي اليومي.",
  الطهي: "جهاز مطبخ من ليبرونك يجمع العملية مع سهولة الاستخدام.",
  التهوية: "تدفق هواء فعّال وتصميم مناسب للمساحات المنزلية.",
  التبريد: "حل تبريد عملي مصمم لأجواء أكثر راحة.",
  التدفئة: "تدفئة متوازنة وتحكم مريح للاستخدام اليومي.",
  التنظيف: "أداء تنظيف عملي يساعد على توفير الوقت والجهد.",
  الشاشات: "تجربة مشاهدة ذكية وصورة واضحة بتصميم عصري.",
};

const catalogProducts: Product[] = libronicCatalog
  .map((product) => {
    const category = getCatalogCategory(product.name, product.categoryId);
    const model =
      product.name.match(/[A-Z]{1,6}(?:[-\s]?[A-Z0-9]+)+/i)?.[0] ??
      product.name.match(/\d+[A-Z0-9-]*/i)?.[0] ??
      `LC-${product.id}`;

    return {
      id: `catalog-${product.id}`,
      name: product.name,
      model,
      category,
      detail: categoryDetails[category],
      image: product.image,
    };
  });

const products: Product[] = catalogProducts;

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/libronic-catalog/originals/206-prod_1777301461.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/libronic-catalog/originals/206-prod_1777301461.jpg" },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  useLenis();
  const reducedMotion = useReducedMotion() ?? false;
  const [activeFilter, setActiveFilter] = useState<Category>("الكل");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.25,
  });

  const visibleProducts =
    activeFilter === "الكل"
      ? products
      : products.filter((product) => product.category === activeFilter);

  return (
    <motion.div
      dir="rtl"
      lang="ar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45 }}
      className="min-h-screen bg-background"
    >
      <a
        href="#main-content"
        className="fixed right-4 top-3 z-[100] -translate-y-24 rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground shadow-lift transition-transform focus:translate-y-0"
      >
        انتقل إلى المحتوى
      </a>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-right bg-gradient-to-l from-brick-ember-600 to-bright-fern-700"
      />

      <Navbar />

      <main id="main-content">
        <section
          aria-labelledby="products-title"
          className="relative isolate overflow-hidden bg-dark-garnet-100 px-5 pb-20 pt-36 text-soft-blush-900 sm:px-8 sm:pb-28 sm:pt-44"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,171,171,0.28)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-24 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(186,12,12,0.35),transparent_68%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(39,163,0,0.16),transparent_70%)] blur-2xl"
          />

          <div className="relative mx-auto max-w-4xl text-center">
            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-soft-blush-900/15 bg-soft-blush-900/[0.07] px-4 py-2 text-xs font-extrabold text-dark-wine-900 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-bright-fern-700" aria-hidden="true" />
                مجموعة ليبرونك
              </span>
              <h1
                id="products-title"
                className="font-display mx-auto mt-5 max-w-2xl text-[clamp(1.85rem,4.4vw,3.65rem)] font-bold leading-[1.18] tracking-[-0.025em]"
              >
                أجهزة صُمّمت لتجعل
                <span className="mt-1.5 block bg-gradient-to-l from-soft-blush-900 via-dark-wine-900 to-brick-ember-800 bg-clip-text text-transparent">
                  يومك أسهل وأجمل
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-dark-wine-900 sm:text-lg">
                تشكيلة مختارة من أجهزة ليبرونك المنزلية والكهربائية، تجمع بين الأداء الموثوق
                والتفاصيل العملية والتصميم العصري.
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <motion.a
                  href="#collection"
                  whileHover={reducedMotion ? undefined : { x: -4, scale: 1.02 }}
                  whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                  className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-2xl bg-bright-fern-700 px-6 text-sm font-black text-olive-leaf-100 shadow-success transition-colors hover:bg-bright-fern-800"
                >
                  تصفّح المجموعة
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </motion.a>
                <a
                  href="/#libronic"
                  className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-soft-blush-900/15 bg-soft-blush-900/[0.07] px-6 text-sm font-bold text-soft-blush-900 backdrop-blur-xl transition-colors hover:bg-soft-blush-900/12"
                >
                  عن الوكالة الحصرية
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section
          id="collection"
          aria-labelledby="collection-title"
          className="relative overflow-hidden bg-soft-blush-900 px-5 py-20 sm:px-8 sm:py-28"
        >
          <div
            aria-hidden="true"
            className="dot-grid pointer-events-none absolute inset-0 opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent_65%)]"
          />
          <div className="relative mx-auto max-w-7xl">
            <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <span className="eyebrow">كتالوج المنتجات</span>
                <h2
                  id="collection-title"
                  className="font-display mt-3 max-w-2xl text-[clamp(1.65rem,3.4vw,2.85rem)] font-bold leading-tight tracking-tight text-dark-garnet-100"
                >
                  اكتشف أجهزة ليبرونك حسب احتياجك
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-dark-wine-500 sm:text-base">
                  الكتالوج الرسمي الكامل مع جميع صور المنتجات الأصلية كما نُشرت على موقع ليبرونك، من دون قصّ أو تعديل.
                </p>
              </div>
              <p aria-live="polite" className="text-sm font-bold text-dark-wine-500">
                {visibleProducts.length} {visibleProducts.length === 1 ? "منتج" : "منتجات"}
              </p>
            </Reveal>

            <div
              role="group"
              aria-label="تصفية المنتجات حسب الفئة"
              className="mt-8 flex flex-wrap gap-2"
            >
              {filters.map((filter) => {
                const active = activeFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setActiveFilter(filter)}
                    className={`min-h-11 rounded-full border px-5 text-sm font-extrabold transition-all duration-300 ${
                      active
                        ? "border-dark-garnet-500 bg-dark-garnet-500 text-soft-blush-900 shadow-glow"
                        : "border-dark-wine-800/70 bg-soft-blush-900 text-dark-wine-500 hover:border-dark-garnet-500 hover:text-dark-garnet-500"
                    }`}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>

            <motion.div
              layout
              className="mt-10 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => (
                  <motion.article
                    layout
                    key={product.id}
                    initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
                    transition={{
                      duration: 0.42,
                      delay: reducedMotion ? 0 : Math.min(index, 12) * 0.025,
                    }}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.9rem] border border-dark-wine-800/65 bg-card shadow-soft transition-[border-color,box-shadow] duration-500 hover:border-dark-garnet-500/40 hover:shadow-lift"
                  >
                    <div className="aspect-square overflow-hidden bg-white">
                      <img
                        src={product.image}
                        alt={`${product.name} من ليبرونك`}
                        width={800}
                        height={800}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div>
                        <h3 className="font-display text-lg font-black leading-7 text-dark-garnet-100">
                          {product.name}
                        </h3>
                      </div>
                      <p className="mt-3 min-h-12 text-sm leading-6 text-dark-wine-500">
                        {product.detail}
                      </p>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </motion.div>

            <p className="mt-8 text-center text-xs leading-6 text-dark-wine-500">
              الصور والمواصفات مأخوذة من كتالوج منتجات ليبرونك.
            </p>
          </div>
        </section>

        <section className="bg-soft-blush-900 px-5 pb-20 sm:px-8 sm:pb-28">
          <Reveal>
            <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-dark-garnet-100 px-6 py-10 text-soft-blush-900 shadow-lift sm:rounded-[2.6rem] sm:px-10 sm:py-14 lg:px-14">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,171,171,0.26)_1px,transparent_1px)] [background-size:24px_24px]"
              />
              <div
                aria-hidden="true"
                className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-brick-ember-600/20 blur-3xl"
              />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <span className="inline-flex items-center gap-2 text-xs font-extrabold text-bright-fern-700">
                    <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    تمثيل حصري موثوق
                  </span>
                  <h2 className="font-display mt-3 max-w-2xl text-[clamp(1.55rem,3vw,2.6rem)] font-bold leading-tight">
                    عيون الرواد، الوكيل الحصري لليبرونك
                  </h2>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-dark-wine-900 sm:text-base">
                    للاستفسار عن المنتجات، التوزيع، أو فرص الشراكة، تواصل مع فريقنا وسنساعدك في
                    اختيار الحل الأنسب.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  <motion.a
                    href="https://wa.me/9647713340229"
                    target="_blank"
                    rel="noreferrer"
                    whileHover={reducedMotion ? undefined : { y: -3, scale: 1.02 }}
                    whileTap={reducedMotion ? undefined : { scale: 0.98 }}
                    className="inline-flex min-h-13 items-center gap-2 rounded-2xl bg-bright-fern-700 px-6 text-sm font-black text-olive-leaf-100 shadow-success"
                  >
                    تواصل معنا
                    <ArrowUpLeft className="h-4 w-4" aria-hidden="true" />
                  </motion.a>
                  <a
                    href="/"
                    className="inline-flex min-h-13 items-center rounded-2xl border border-soft-blush-900/15 bg-soft-blush-900/[0.07] px-6 text-sm font-bold text-soft-blush-900 transition-colors hover:bg-soft-blush-900/12"
                  >
                    العودة للرئيسية
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}

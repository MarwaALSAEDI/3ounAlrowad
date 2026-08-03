import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowUpLeft, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { Footer } from "@/components/site/Footer";
import { Navbar } from "@/components/site/Navbar";
import { Reveal } from "@/components/site/Reveal";
import { useLenis } from "@/hooks/use-lenis";

const TITLE = "منتجات ليبرونك | عيون الرواد";
const DESC =
  "اكتشف مجموعة مختارة من أجهزة ليبرونك المنزلية والكهربائية لدى عيون الرواد، الوكيل الحصري لليبرونك.";

type Category = "الكل" | "الطهي" | "التهوية" | "التبريد" | "التدفئة";

type Product = {
  category: Exclude<Category, "الكل">;
  detail: string;
  image: string;
  model: string;
  name: string;
};

const filters: Category[] = ["الكل", "الطهي", "التهوية", "التبريد", "التدفئة"];

const products: Product[] = [
  {
    name: "طباخ صالون 4 مشاعل 600G01",
    model: "LC-600G01",
    category: "الطهي",
    detail: "60 سم · ستانلس ستيل · إشعال ذاتي",
    image: "/libronic-products/cooker-600g01.jpg",
  },
  {
    name: "طباخ 5 مشاعل 9001",
    model: "9001",
    category: "الطهي",
    detail: "خمسة مشاعل · تصميم عصري",
    image: "/libronic-products/cooker-9001.jpg",
  },
  {
    name: "مرشحة 90B",
    model: "LCT90B",
    category: "التهوية",
    detail: "90 سم · 180 واط · إضاءة LED",
    image: "/libronic-products/hood-90b.jpg",
  },
  {
    name: "مرشحة كاسيت 600",
    model: "LC600",
    category: "التهوية",
    detail: "60 سم · شفط 1000 م³/ساعة · LED",
    image: "/libronic-products/hood-cassette-600.jpg",
  },
  {
    name: "مبردة كونفيرا 60MA",
    model: "LC-60MA",
    category: "التبريد",
    detail: "خزان 55 لتر · 180 واط · حركة سهلة",
    image: "/libronic-products/air-cooler-60ma.jpg",
  },
  {
    name: "مبردة دكت 60",
    model: "LC-60M3",
    category: "التبريد",
    detail: "تدفق هواء قوي · خزان ماء كبير",
    image: "/libronic-products/duct-cooler-60.jpg",
  },
  {
    name: "مروحة سقفية 626",
    model: "LC-626",
    category: "التهوية",
    detail: "تصميم سقفي أنيق · توزيع هواء متوازن",
    image: "/libronic-products/ceiling-fan-626.jpg",
  },
  {
    name: "صوبة زيتية 13 ريشة",
    model: "13 ريشة",
    category: "التدفئة",
    detail: "حرارة متوازنة · عجلات لسهولة الحركة",
    image: "/libronic-products/oil-heater-13.jpg",
  },
];

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/libronic-products/cooker-600g01.jpg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/libronic-products/cooker-600g01.jpg" },
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

          <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
            <div className="relative order-2 min-h-[22rem] sm:min-h-[29rem] lg:order-1">
              <motion.figure
                initial={reducedMotion ? false : { opacity: 0, y: 36, rotate: -4 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="absolute inset-y-0 right-0 m-0 w-[72%] overflow-hidden rounded-[2rem] border border-soft-blush-900/15 bg-soft-blush-900 p-2 shadow-[0_38px_90px_-36px_rgba(255,88,88,0.5)] sm:rounded-[2.4rem]"
              >
                <img
                  src="/libronic-products/cooker-600g01.jpg"
                  alt="طباخ ليبرونك LC-600G01"
                  width={800}
                  height={886}
                  decoding="async"
                  fetchPriority="high"
                  className="h-full w-full rounded-[1.55rem] object-cover sm:rounded-[1.95rem]"
                />
              </motion.figure>

              <motion.figure
                initial={reducedMotion ? false : { opacity: 0, x: -38, y: 24, rotate: 7 }}
                animate={{ opacity: 1, x: 0, y: 0, rotate: 4 }}
                transition={{ duration: 0.9, delay: 0.28 }}
                className="absolute bottom-3 left-0 m-0 w-[45%] overflow-hidden rounded-[1.55rem] border-4 border-dark-garnet-100 bg-soft-blush-900 p-1.5 shadow-lift sm:bottom-6 sm:rounded-[2rem]"
              >
                <img
                  src="/libronic-products/air-cooler-60ma.jpg"
                  alt="مبردة ليبرونك LC-60MA"
                  width={800}
                  height={800}
                  decoding="async"
                  className="aspect-square w-full rounded-[1.1rem] object-cover sm:rounded-[1.55rem]"
                />
              </motion.figure>

              <motion.div
                aria-hidden="true"
                animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-[7%] top-[5%] grid h-16 w-16 place-items-center rounded-2xl border border-soft-blush-900/15 bg-dark-garnet-200/80 shadow-glow backdrop-blur-xl sm:h-20 sm:w-20"
              >
                <img
                  src="/libronic-logo.png"
                  alt=""
                  width={80}
                  height={80}
                  className="h-full w-full rounded-2xl object-cover"
                />
              </motion.div>
            </div>

            <motion.div
              initial={reducedMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-soft-blush-900/15 bg-soft-blush-900/[0.07] px-4 py-2 text-xs font-extrabold text-dark-wine-900 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-bright-fern-700" aria-hidden="true" />
                مجموعة ليبرونك
              </span>
              <h1
                id="products-title"
                className="font-display mt-5 max-w-2xl text-[clamp(1.85rem,4.4vw,3.65rem)] font-bold leading-[1.18] tracking-[-0.025em]"
              >
                أجهزة صُمّمت لتجعل
                <span className="mt-1.5 block bg-gradient-to-l from-soft-blush-900 via-dark-wine-900 to-brick-ember-800 bg-clip-text text-transparent">
                  يومك أسهل وأجمل
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-dark-wine-900 sm:text-lg">
                تشكيلة مختارة من أجهزة ليبرونك المنزلية والكهربائية، تجمع بين الأداء الموثوق
                والتفاصيل العملية والتصميم العصري.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
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
                <span className="eyebrow">منتجات مختارة</span>
                <h2
                  id="collection-title"
                  className="font-display mt-3 max-w-2xl text-[clamp(1.65rem,3.4vw,2.85rem)] font-bold leading-tight tracking-tight text-dark-garnet-100"
                >
                  اكتشف أجهزة ليبرونك حسب احتياجك
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-dark-wine-500 sm:text-base">
                  مجموعة بصرية من المنتجات المتوفرة على موقع ليبرونك الرسمي، مع أهم المواصفات
                  للتعرّف عليها بسرعة.
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
              className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map((product, index) => (
                  <motion.article
                    layout
                    key={product.name}
                    initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.97 }}
                    transition={{ duration: 0.42, delay: reducedMotion ? 0 : index * 0.035 }}
                    className="group overflow-hidden rounded-[1.9rem] border border-dark-wine-800/65 bg-card shadow-soft transition-[border-color,box-shadow] duration-500 hover:border-dark-garnet-500/40 hover:shadow-lift"
                  >
                    <div className="relative mx-3 mt-3 aspect-square overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-soft-blush-700 via-soft-blush-900 to-honeydew-700">
                      <img
                        src={product.image}
                        alt={`${product.name} من ليبرونك`}
                        width={800}
                        height={800}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                      />
                      <span className="absolute right-3 top-3 rounded-full border border-soft-blush-900/70 bg-soft-blush-900/90 px-3 py-1.5 text-[11px] font-extrabold text-dark-garnet-500 shadow-soft backdrop-blur-md">
                        {product.category}
                      </span>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="font-display text-lg font-black leading-7 text-dark-garnet-100">
                          {product.name}
                        </h3>
                        <span
                          dir="ltr"
                          className="shrink-0 rounded-full bg-brand-soft px-2.5 py-1 text-[10px] font-black tracking-wide text-dark-garnet-500"
                        >
                          {product.model}
                        </span>
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
                    href="/#contact"
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

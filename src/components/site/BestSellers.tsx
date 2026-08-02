import { motion } from "motion/react";
import { ArrowLeft, Heart, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { products, type Product } from "@/data/catalog";
import { Reveal, Stagger, itemVariants } from "./Reveal";

export function BestSellers() {
  return (
    <section id="best" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-32 top-16 h-80 w-80 rounded-full bg-primary/5 blur-[90px]" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="eyebrow">منتجات تستحق مكاناً في بيتك</span>
            <h2 className="font-display mt-4 text-[clamp(2rem,4.6vw,3.7rem)] font-black tracking-tight">الأكثر طلباً هذا الأسبوع</h2>
            <p className="mt-4 max-w-xl leading-7 text-muted-foreground">اختيارات أحبّها عملاؤنا، بجودة موثوقة وأسعار لا تفوّت.</p>
          </div>
          <a href="#new" className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold transition-all hover:border-primary/30 hover:text-primary hover:shadow-soft">
            عرض كل المنتجات <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          </a>
        </Reveal>

        <Stagger gap={0.08} className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </Stagger>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const discount = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : null;

  return (
    <motion.article variants={itemVariants} whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 220, damping: 24 }} className="group relative overflow-hidden rounded-[1.75rem] border border-border bg-card p-4 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:p-5">
      <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="absolute right-3 top-3 z-10 flex flex-wrap gap-2">
          {discount && <span className="rounded-full bg-accent px-3 py-1.5 text-[11px] font-black text-accent-foreground">خصم {discount}٪</span>}
          {product.tag && <span className="rounded-full bg-secondary/92 px-3 py-1.5 text-[11px] font-bold text-secondary-foreground backdrop-blur">{product.tag}</span>}
        </div>
        <motion.button type="button" onClick={() => setLiked((value) => !value)} whileTap={{ scale: 0.84 }} aria-label={liked ? "إزالة من المفضلة" : "إضافة إلى المفضلة"} aria-pressed={liked} className="absolute left-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-xl border border-white/70 bg-white/85 shadow-soft backdrop-blur transition-colors hover:text-primary">
          <Heart className={`h-[18px] w-[18px] transition-colors ${liked ? "fill-primary text-primary" : "text-secondary/60"}`} />
        </motion.button>
        <img src={product.image} alt={product.name} loading="lazy" decoding="async" width={1024} height={1024} className="h-full w-full object-contain p-7 transition-transform duration-700 ease-out group-hover:scale-110" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/55 to-transparent" />
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1 text-amber-400">
          {Array.from({ length: 5 }).map((_, index) => <Star key={index} className={`h-3.5 w-3.5 ${index < Math.round(product.rating) ? "fill-current" : "text-border"}`} />)}
          <span className="mr-1 text-xs font-semibold text-muted-foreground">{product.rating} ({product.reviews})</span>
        </div>
        <span className="text-[11px] font-bold text-accent">متوفر</span>
      </div>

      <h3 className="font-display mt-3 min-h-14 text-lg font-extrabold leading-7">{product.name}</h3>
      <div className="mt-4 flex items-center justify-between gap-3 border-t border-border/80 pt-4">
        <p className="flex flex-wrap items-baseline gap-2">
          <span className="font-display text-xl font-black text-primary sm:text-2xl">{product.price} ر.س</span>
          {product.oldPrice && <span className="text-xs text-muted-foreground line-through">{product.oldPrice} ر.س</span>}
        </p>
        <motion.button type="button" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.94 }} aria-label={`إضافة ${product.name} إلى السلة`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-secondary px-4 text-sm font-bold text-secondary-foreground transition-colors hover:bg-primary">
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">أضف</span>
        </motion.button>
      </div>
    </motion.article>
  );
}

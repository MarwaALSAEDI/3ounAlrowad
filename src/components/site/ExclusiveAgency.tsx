import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowLeft, CircleCheck, Sparkles } from "lucide-react";
import { useRef } from "react";

import airfryer from "@/assets/p-airfryer.png";
import blender from "@/assets/p-blender.png";
import cookware from "@/assets/p-cookware.png";
import kettle from "@/assets/p-kettle.png";
import mixer from "@/assets/p-mixer.png";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type ArcProductProps = {
  alt: string;
  className: string;
  depth: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
  src: string;
  x: [number, number, number];
  y: [number, number, number];
  rotation: [number, number, number];
  delay: number;
};

function ArcProduct({
  alt,
  className,
  depth,
  progress,
  reducedMotion,
  src,
  x: xRange,
  y: yRange,
  rotation,
  delay,
}: ArcProductProps) {
  const x = useTransform(progress, [0, 0.5, 1], reducedMotion ? [xRange[1], xRange[1], xRange[1]] : xRange);
  const y = useTransform(progress, [0, 0.5, 1], reducedMotion ? [yRange[1], yRange[1], yRange[1]] : yRange);
  const rotate = useTransform(progress, [0, 0.5, 1], reducedMotion ? [rotation[1], rotation[1], rotation[1]] : rotation);
  const scale = useTransform(progress, [0, 0.52, 1], reducedMotion ? [1, 1, 1] : [0.82, 1, 0.93]);
  const opacity = useTransform(progress, [0, 0.18, 0.88, 1], reducedMotion ? [1, 1, 1, 1] : [0.18, 1, 1, 0.5]);

  return (
    <figure style={{ zIndex: depth }} className={`absolute left-1/2 top-1/2 m-0 ${className}`}>
      <div className="h-full w-full -translate-x-1/2 -translate-y-1/2">
        <motion.div style={{ x, y, rotate, scale, opacity }} className="h-full w-full will-change-transform">
          <motion.img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            width={640}
            height={640}
            animate={reducedMotion ? undefined : { y: [0, -9, 0] }}
            transition={{ duration: 5.2 + delay, delay, repeat: Infinity, ease: "easeInOut" }}
            className="h-full w-full object-contain drop-shadow-[0_28px_34px_rgba(18,0,0,0.58)]"
          />
        </motion.div>
      </div>
    </figure>
  );
}

export function ExclusiveAgency() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const haloScale = useTransform(scrollYProgress, [0, 0.48, 1], reducedMotion ? [1, 1, 1] : [0.74, 1.08, 0.9]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.28, 0.8, 1], reducedMotion ? [0.7, 0.7, 0.7, 0.7] : [0, 0.75, 0.52, 0]);
  const libronicX = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [120, -120]);
  const copyY = useTransform(scrollYProgress, [0.15, 0.55, 0.92], reducedMotion ? [0, 0, 0] : [42, 0, -28]);
  const copyOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.88, 0.98], reducedMotion ? [1, 1, 1, 1] : [0, 1, 1, 0.35]);

  return (
    <section
      id="libronic"
      ref={sectionRef}
      dir="rtl"
      aria-labelledby="exclusive-agency-title"
      className="relative isolate min-h-[205svh] overflow-clip bg-dark-garnet-100 text-soft-blush-900 motion-reduce:min-h-0"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-40 bg-gradient-to-b from-soft-blush-900 via-soft-blush-900/55 to-transparent"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(rgba(255,171,171,0.28)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_80%,transparent)]" />

      <div className="sticky top-0 flex min-h-[100svh] items-center overflow-hidden px-5 py-20 sm:px-8 sm:py-24 motion-reduce:relative">
        <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[12%] -translate-x-1/2">
          <motion.div
            style={{ x: libronicX }}
            className="whitespace-nowrap font-display text-[clamp(5rem,18vw,16rem)] font-black leading-none tracking-[-0.08em] text-soft-blush-900/[0.035]"
          >
            LIBRONIC
          </motion.div>
        </div>

        <div aria-hidden="true" className="pointer-events-none absolute left-[58%] top-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            style={{ scale: haloScale, opacity: haloOpacity }}
            className="h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(186,12,12,0.38)_0%,rgba(92,0,0,0.2)_42%,transparent_72%)] blur-2xl sm:h-[42rem] sm:w-[42rem]"
          />
        </div>

        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:gap-12">
          <motion.div style={{ y: copyY, opacity: copyOpacity }} className="relative z-20 order-2 lg:order-1">
            <motion.span
              initial={reducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.65, ease: EASE }}
              className="inline-flex items-center gap-2 rounded-full border border-soft-blush-900/15 bg-soft-blush-900/[0.07] px-4 py-2 text-xs font-extrabold tracking-wide text-dark-wine-900 backdrop-blur-xl"
            >
              <Sparkles className="h-4 w-4 text-bright-fern-700" aria-hidden="true" />
              شراكة حصرية
            </motion.span>

            <h2 id="exclusive-agency-title" className="font-display mt-6 max-w-2xl text-[clamp(1.95rem,4.1vw,4rem)] font-black leading-[1.13] tracking-[-0.025em]">
              عيون الرواد
              <span className="mt-2 block bg-gradient-to-l from-soft-blush-900 via-dark-wine-900 to-brick-ember-800 bg-clip-text text-transparent">
                — الوكيل الحصري لشركة ليبرونك
              </span>
            </h2>

            <div className="mt-7 flex items-center gap-4" dir="ltr" aria-label="ليبرونك">
              <motion.div
                whileHover={reducedMotion ? undefined : { y: -4, rotate: -1.5, scale: 1.03 }}
                className="relative grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-[1.6rem] border border-brick-ember-700/30 bg-dark-garnet-200/75 shadow-glow sm:h-28 sm:w-28"
              >
                <img
                  src="/libronic-logo.png"
                  alt="شعار ليبرونك"
                  loading="lazy"
                  decoding="async"
                  width={112}
                  height={112}
                  className="h-full w-full scale-[1.05] object-cover [mask-image:radial-gradient(circle_at_center,black_52%,transparent_86%)]"
                />
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-soft-blush-900/10" />
              </motion.div>
              <div>
                <span className="block h-px w-10 bg-brick-ember-700/70" aria-hidden="true" />
                <p className="font-display mt-3 text-xl font-black tracking-[0.22em] text-soft-blush-900 sm:text-2xl">LIBRONIC</p>
                <p className="mt-1 text-xs font-bold tracking-normal text-dark-wine-900" dir="rtl">العلامة التي نمثلها حصرياً</p>
              </div>
            </div>

            <p className="mt-7 max-w-xl text-base leading-8 text-dark-wine-900 sm:text-lg">
              ليبرونك شركة متخصصة في بيع الأجهزة المنزلية الكهربائية وأدوات المطبخ العصرية، وتقدّم تشكيلة متكاملة تجمع بين الأداء الموثوق والجودة والتصميم الأنيق، لتجعل تفاصيل الحياة اليومية أسهل وأكثر راحة.
            </p>

            <div className="mt-7 grid max-w-lg grid-cols-2 gap-3" aria-label="مجالات عيون الرواد وليبرونك">
              <div className="rounded-2xl border border-soft-blush-900/12 bg-soft-blush-900/[0.065] p-4 backdrop-blur-xl">
                <CircleCheck className="h-5 w-5 text-bright-fern-700" aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-soft-blush-900">عيون الرواد</p>
                <p className="mt-1 text-xs text-dark-wine-900">أوانٍ وصحون</p>
              </div>
              <div className="rounded-2xl border border-soft-blush-900/12 bg-soft-blush-900/[0.065] p-4 backdrop-blur-xl">
                <CircleCheck className="h-5 w-5 text-bright-fern-700" aria-hidden="true" />
                <p className="mt-3 text-sm font-extrabold text-soft-blush-900" dir="ltr">LIBRONIC</p>
                <p className="mt-1 text-xs text-dark-wine-900">أجهزة منزلية كهربائية</p>
              </div>
            </div>

            <motion.a
              href="#contact"
              whileHover={reducedMotion ? undefined : { x: -5, scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className="group mt-8 inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl bg-bright-fern-700 px-7 font-bold text-olive-leaf-100 shadow-[0_20px_54px_-22px_rgba(95,255,47,0.8)] transition-colors hover:bg-bright-fern-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bright-fern-700"
            >
              تواصل معنا
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            </motion.a>
          </motion.div>

          <div className="relative order-1 h-[42svh] min-h-[300px] max-h-[510px] scale-[0.72] sm:scale-[0.88] lg:order-2 lg:h-[70svh] lg:min-h-[540px] lg:max-h-[720px] lg:scale-100" aria-label="مجموعة من منتجات ليبرونك">
            <div aria-hidden="true" className="absolute left-1/2 top-[58%] h-[62%] w-[82%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-brick-ember-700/20 [transform:translate(-50%,-50%)_rotateX(68deg)]" />
            <div aria-hidden="true" className="absolute left-1/2 top-[58%] h-[45%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-soft-blush-900/10 [transform:translate(-50%,-50%)_rotateX(68deg)]" />

            <ArcProduct
              src={cookware}
              alt="طقم أواني ليبرونك"
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
              x={[-45, -62, -88]}
              y={[8, -4, -18]}
              rotation={[-5, 0, 5]}
              delay={0.3}
              depth={50}
              className="h-52 w-52 sm:h-64 sm:w-64 lg:h-80 lg:w-80"
            />
            <ArcProduct
              src={airfryer}
              alt="قلاية هوائية من ليبرونك"
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
              x={[12, 82, 126]}
              y={[-88, -102, -82]}
              rotation={[-20, -10, 2]}
              delay={0.8}
              depth={40}
              className="h-36 w-36 sm:h-44 sm:w-44 lg:h-56 lg:w-56"
            />
            <ArcProduct
              src={blender}
              alt="خلاط من ليبرونك"
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
              x={[-140, -178, -214]}
              y={[-74, -112, -98]}
              rotation={[25, 12, 2]}
              delay={1.1}
              depth={30}
              className="h-32 w-32 sm:h-40 sm:w-40 lg:h-52 lg:w-52"
            />
            <ArcProduct
              src={kettle}
              alt="غلاية من ليبرونك"
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
              x={[128, 198, 236]}
              y={[72, 42, 16]}
              rotation={[-28, -16, -6]}
              delay={1.45}
              depth={20}
              className="h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44"
            />
            <ArcProduct
              src={mixer}
              alt="عجانة من ليبرونك"
              progress={scrollYProgress}
              reducedMotion={reducedMotion}
              x={[-105, -180, -232]}
              y={[98, 70, 32]}
              rotation={[28, 17, 8]}
              delay={1.8}
              depth={10}
              className="h-32 w-32 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
            />

            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2">
              <motion.div
                animate={reducedMotion ? undefined : { rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
                className="h-full w-full rounded-full border border-dashed border-brick-ember-700/15"
              />
            </div>
          </div>
        </div>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-px origin-right bg-gradient-to-l from-bright-fern-700 via-brick-ember-700 to-transparent"
        />
      </div>
    </section>
  );
}

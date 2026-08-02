import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, type ComponentType } from "react";
import { CookingPot, HandPlatter, Sparkles, Utensils } from "lucide-react";
import g1 from "@/assets/g-1.jpg";
import g2 from "@/assets/g-2.jpg";
import g4 from "@/assets/g-4.jpg";
import cookware from "@/assets/p-cookware.png";

type Scene = {
  number: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  note: string;
  Icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  backdrop: string;
  backdropAlt: string;
  detail: string;
  detailAlt: string;
  detailContain?: boolean;
  motionRange: [number, number, number];
};

const scenes: Scene[] = [
  {
    number: "٠١",
    label: "أواني الطهي",
    eyebrow: "من المطبخ تبدأ الحكاية",
    title: "أوانٍ تُتقن التفاصيل اليومية",
    description:
      "نختار أواني الطهي لتجمع بين الأداء المتوازن، الخامات الموثوقة، والحضور الجميل الذي يبقى جزءاً من مطبخك لسنوات.",
    note: "جودة ملموسة في كل استخدام",
    Icon: CookingPot,
    backdrop: g2,
    backdropAlt: "تفاصيل أدوات وأواني داخل مطبخ دافئ",
    detail: cookware,
    detailAlt: "طقم أواني طهي متكامل",
    detailContain: true,
    motionRange: [0, 0.18, 0.36],
  },
  {
    number: "٠٢",
    label: "الصحون وأطقم المائدة",
    eyebrow: "للمائدة لغتها الخاصة",
    title: "أطقم تصنع مشهداً قبل أول ضيافة",
    description:
      "من الأطباق اليومية إلى أطقم المناسبات، نقدّم تنسيقات تجمع الألوان والنقوش والملمس في مائدة تعبّر عن ذوق البيت.",
    note: "تنسيق متكامل لكل مناسبة",
    Icon: Utensils,
    backdrop: g1,
    backdropAlt: "مائدة مرتبة بطقم صحون سيراميك أنيق",
    detail: g4,
    detailAlt: "طقم صحون ملوّن بنقوش فنية",
    motionRange: [0.27, 0.49, 0.7],
  },
  {
    number: "٠٣",
    label: "أدوات التقديم والضيافة",
    eyebrow: "الضيافة في أجمل صورها",
    title: "قطع تمنح لحظة التقديم أناقتها",
    description:
      "تفاصيل مدروسة للتقديم والضيافة، من القطع العملية إلى اللمسات المميزة التي تجعل كل لقاء أكثر دفئاً وترتيباً.",
    note: "تفاصيل صغيرة، أثر لا يُنسى",
    Icon: HandPlatter,
    backdrop: g4,
    backdropAlt: "أدوات مائدة وتقديم مرتبة بأسلوب فاخر",
    detail: g2,
    detailAlt: "تفاصيل أدوات تقديم من خامات طبيعية",
    motionRange: [0.62, 0.8, 1],
  },
];

function StoryHeader() {
  return (
    <div className="relative z-20 mx-auto w-full max-w-7xl px-5 sm:px-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end lg:gap-12">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.12em] text-india-green-700 sm:text-sm">
            <Sparkles className="h-4 w-4" aria-hidden={true} />
            عوالم عيون الرواد
          </span>
          <h2
            id="collections-title"
            className="font-display mt-3 text-[clamp(1.7rem,3.7vw,3.5rem)] font-black leading-[1.15] tracking-tight text-soft-blush-900"
          >
            ثلاثة عوالم، رؤية واحدة للبيت
          </h2>
        </div>
        <p className="hidden max-w-md text-sm leading-7 text-dark-wine-900 sm:block lg:text-base">
          تشكيلة تتجاوز وظيفة القطعة، لتصنع مطبخاً ومائدةً وضيافةً تحمل ذوقك في كل تفصيل.
        </p>
      </div>
    </div>
  );
}

function SceneArtwork({
  scene,
  progress,
  active,
}: {
  scene: Scene;
  progress: MotionValue<number>;
  active: boolean;
}) {
  const copyY = useTransform(progress, scene.motionRange, [42, 0, -32]);
  const photoY = useTransform(progress, scene.motionRange, [54, 0, -48]);
  const photoScale = useTransform(progress, scene.motionRange, [1.09, 1.02, 1.08]);
  const detailY = useTransform(progress, scene.motionRange, [90, 0, -78]);
  const detailRotate = useTransform(progress, scene.motionRange, [-4, 0, 3]);

  return (
    <motion.article
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      style={{ pointerEvents: active ? "auto" : "none" }}
      aria-hidden={!active}
      className="absolute inset-0 grid h-full min-h-0 grid-rows-[auto_1fr] gap-4 lg:grid-cols-[0.78fr_1.22fr] lg:grid-rows-1 lg:items-center lg:gap-10"
    >
      <motion.div style={{ y: copyY }} className="relative z-10 max-w-xl self-center lg:pr-4">
        <span className="pointer-events-none absolute -right-1 -top-10 -z-10 font-display text-[5.8rem] font-black leading-none text-dark-wine-500/20 sm:-top-14 sm:text-[8rem] lg:-right-8 lg:text-[11rem]">
          {scene.number}
        </span>
        <p className="flex items-center gap-2 text-xs font-extrabold text-india-green-700 sm:text-sm">
          <scene.Icon className="h-4 w-4" aria-hidden={true} />
          {scene.eyebrow}
        </p>
        <h3 className="font-display mt-2 max-w-lg text-[clamp(1.75rem,4.2vw,3.8rem)] font-black leading-[1.13] tracking-tight text-soft-blush-900 lg:mt-4">
          {scene.title}
        </h3>
        <p className="mt-3 max-w-lg text-sm leading-6 text-dark-wine-900 sm:mt-5 sm:text-base sm:leading-8">
          {scene.description}
        </p>
        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-india-green-600/30 bg-india-green-100/40 px-3 py-1.5 text-[11px] font-bold text-india-green-800 sm:mt-5 sm:px-4 sm:py-2 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-india-green-700 shadow-[0_0_14px_#63ea3a]" />
          {scene.note}
        </p>
      </motion.div>

      <div className="relative min-h-0 self-stretch overflow-visible lg:min-h-[30rem]">
        <motion.figure
          style={{ y: photoY }}
          className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-[1.7rem] border border-dark-wine-600/35 bg-dark-garnet-200 shadow-[0_34px_100px_-42px_rgba(255,88,88,0.48)] sm:rounded-[2.25rem] lg:inset-y-5 lg:right-4"
        >
          <motion.img
            src={scene.backdrop}
            alt={scene.backdropAlt}
            loading="lazy"
            decoding="async"
            width={1200}
            height={900}
            style={{ scale: photoScale }}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-garnet-100 via-dark-garnet-100/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-l from-dark-garnet-100/40 via-transparent to-transparent" />
          <figcaption className="absolute bottom-4 right-4 max-w-[62%] text-xs font-semibold leading-5 text-soft-blush-900/90 sm:bottom-6 sm:right-6 sm:text-sm">
            {scene.label}
          </figcaption>
        </motion.figure>

        <motion.figure
          style={{ y: detailY, rotate: detailRotate }}
          className="absolute bottom-4 left-3 w-[34%] min-w-28 max-w-52 overflow-hidden rounded-[1.25rem] border border-soft-blush-900/35 bg-soft-blush-900/92 p-2 shadow-[0_24px_70px_-24px_rgba(18,0,0,0.9)] backdrop-blur-xl sm:bottom-8 sm:left-0 sm:rounded-[1.6rem] sm:p-3 lg:-left-4 lg:bottom-12"
        >
          <div className="aspect-square overflow-hidden rounded-[0.9rem] bg-gradient-to-br from-soft-blush-700 to-honeydew-700 sm:rounded-[1.2rem]">
            <img
              src={scene.detail}
              alt={scene.detailAlt}
              loading="lazy"
              decoding="async"
              width={620}
              height={620}
              className={`h-full w-full ${scene.detailContain ? "object-contain p-2" : "object-cover"}`}
            />
          </div>
          <figcaption className="mt-2 hidden items-center justify-between gap-2 px-1 text-[10px] font-black text-dark-garnet-500 sm:flex sm:text-[11px]">
            <span>اختيار عيون الرواد</span>
            <span className="h-1.5 w-1.5 rounded-full bg-india-green-500" />
          </figcaption>
        </motion.figure>
      </div>
    </motion.article>
  );
}

function SceneTabs({ active }: { active: number }) {
  return (
    <nav
      aria-label="مجالات عيون الرواد"
      className="relative z-30 mx-auto mt-4 w-full max-w-7xl px-5 sm:mt-6 sm:px-8"
    >
      <ol className="grid grid-cols-3 rounded-2xl border border-dark-wine-600/35 bg-dark-garnet-200/75 p-1 shadow-[0_18px_50px_-28px_rgba(255,88,88,0.35)] backdrop-blur-xl sm:rounded-[1.35rem] sm:p-1.5">
        {scenes.map((scene, index) => (
          <li
            key={scene.label}
            aria-current={active === index ? "step" : undefined}
            className="relative min-w-0"
          >
            {active === index && (
              <motion.span
                layoutId="collections-active-tab"
                className="absolute inset-0 rounded-xl border border-dark-wine-700/35 bg-dark-wine-400/55 shadow-inner sm:rounded-2xl"
                transition={{ type: "spring", stiffness: 360, damping: 34 }}
              />
            )}
            <span
              className={`relative flex min-h-10 items-center justify-center gap-2 truncate px-2 text-[10px] font-extrabold transition-colors sm:min-h-12 sm:text-sm ${active === index ? "text-soft-blush-900" : "text-dark-wine-800"}`}
            >
              <span
                className={`hidden h-1.5 w-1.5 shrink-0 rounded-full sm:block ${active === index ? "bg-india-green-700 shadow-[0_0_12px_#63ea3a]" : "bg-dark-wine-600"}`}
              />
              {scene.label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function StaticCollectionsStory() {
  return (
    <section
      id="collections"
      dir="rtl"
      aria-labelledby="collections-title"
      className="relative overflow-hidden bg-dark-garnet-100 py-24 text-soft-blush-900 sm:py-32"
    >
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-30" />
      <StoryHeader />
      <div className="relative z-10 mx-auto mt-12 grid max-w-7xl gap-8 px-5 sm:px-8">
        {scenes.map((scene) => (
          <article
            key={scene.label}
            className="grid overflow-hidden rounded-[2rem] border border-dark-wine-600/35 bg-dark-garnet-200/70 lg:grid-cols-2"
          >
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="flex items-center gap-2 text-sm font-bold text-india-green-700">
                <scene.Icon className="h-4 w-4" aria-hidden={true} />
                {scene.eyebrow}
              </p>
              <h3 className="font-display mt-4 text-3xl font-black leading-tight sm:text-4xl">
                {scene.title}
              </h3>
              <p className="mt-4 leading-8 text-dark-wine-900">{scene.description}</p>
            </div>
            <figure className="relative aspect-[4/3] overflow-hidden">
              <img
                src={scene.backdrop}
                alt={scene.backdropAlt}
                loading="lazy"
                decoding="async"
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-garnet-100/70 to-transparent" />
              <figcaption className="absolute bottom-5 right-5 text-sm font-bold">
                {scene.label}
              </figcaption>
            </figure>
          </article>
        ))}
      </div>
    </section>
  );
}

export function CollectionsStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const ambientY = useTransform(scrollYProgress, [0, 1], ["0%", "-16%"]);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (prefersReducedMotion) return;
    const next = value < 0.34 ? 0 : value < 0.68 ? 1 : 2;
    setActive((current) => (current === next ? current : next));
  });

  if (prefersReducedMotion) return <StaticCollectionsStory />;

  return (
    <section
      id="collections"
      ref={sectionRef}
      dir="rtl"
      aria-labelledby="collections-title"
      className="relative h-[350svh] bg-dark-garnet-100 text-soft-blush-900"
    >
      <div className="sticky top-0 h-[100svh] min-h-[640px] overflow-hidden pb-5 pt-20 sm:min-h-[720px] sm:pb-8 sm:pt-24 lg:pt-28">
        <motion.div
          style={{ y: ambientY }}
          className="dot-grid pointer-events-none absolute -inset-x-20 -inset-y-40 opacity-35 [mask-image:radial-gradient(circle_at_center,black,transparent_75%)]"
        />
        <div className="pointer-events-none absolute -right-52 top-1/4 h-[34rem] w-[34rem] rounded-full bg-brick-ember-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -left-56 bottom-0 h-[32rem] w-[32rem] rounded-full bg-india-green-500/10 blur-[120px]" />

        <div className="relative flex h-full min-h-0 flex-col">
          <StoryHeader />
          <SceneTabs active={active} />
          <div className="relative mx-auto mt-4 min-h-0 w-full max-w-7xl flex-1 px-5 sm:mt-6 sm:px-8">
            {scenes.map((scene, index) => (
              <SceneArtwork
                key={scene.label}
                scene={scene}
                progress={scrollYProgress}
                active={active === index}
              />
            ))}
          </div>
          <p className="relative z-30 mt-2 text-center text-[10px] font-semibold tracking-wide text-dark-wine-800 sm:text-xs">
            مرّر لاكتشاف المجموعة <span aria-hidden="true">↓</span>
          </p>
        </div>
      </div>
    </section>
  );
}

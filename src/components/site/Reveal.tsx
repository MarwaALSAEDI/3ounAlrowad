import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.22, 0.61, 0.36, 1] as const;

type Mode = "up" | "fade" | "scale" | "blur";

const build = (mode: Mode): Variants => ({
  hidden: {
    opacity: 0,
    y: mode === "up" ? 42 : 0,
    scale: mode === "scale" ? 0.94 : 1,
    filter: mode === "blur" ? "blur(14px)" : "blur(0px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
});

/** Single element that animates once when it scrolls into view. */
export function Reveal({
  children,
  mode = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  mode?: Mode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      variants={build(mode)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wrapper that staggers its <Reveal> / motion children. */
export function Stagger({
  children,
  className,
  gap = 0.1,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
    >
      {children}
    </motion.div>
  );
}

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: EASE } },
};

export { EASE };

import { useEffect } from "react";

/**
 * Mounts Lenis smooth scrolling on the client only.
 * Lenis is dynamically imported so it never runs during SSR.
 */
export function useLenis() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let destroy: (() => void) | undefined;

    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis({
        duration: 1.15,
        // cinematic ease-out curve
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      destroy = () => {
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => destroy?.();
  }, []);
}

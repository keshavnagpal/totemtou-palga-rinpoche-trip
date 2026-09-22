import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MOBILE = "(max-width: 900px)";
const REDUCED = "(prefers-reduced-motion: reduce)";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia(REDUCED).matches;

/** Subscribe to a media query. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export const useIsMobile = () => useMediaQuery(MOBILE);
export const useReducedMotion = () => useMediaQuery(REDUCED);

/**
 * Depth parallax inside a section. Each `[data-depth]` child drifts by
 * `depth * range` percent of its own height as the section crosses the
 * viewport. Disabled on mobile and for reduced motion.
 *
 * @param {object} opts
 * @param {number} opts.range  max drift in % of element height (default 18)
 */
export function useParallax({ range = 18 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: `(prefers-reduced-motion: no-preference) and (min-width: 901px)`,
          motionLite: `(prefers-reduced-motion: no-preference) and (max-width: 900px)`,
        },
        (context) => {
          const scale = context.conditions.motion ? 1 : 0.45;
          const layers = gsap.utils.toArray("[data-depth]", root);
          layers.forEach((el) => {
            const depth = parseFloat(el.dataset.depth) || 0;
            gsap.fromTo(
              el,
              { yPercent: depth * range * scale },
              {
                yPercent: -depth * range * scale,
                ease: "none",
                scrollTrigger: {
                  trigger: root,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          });
        },
      );
    }, ref);

    return () => ctx.revert();
  }, [range]);

  return ref;
}

/**
 * Reveal children marked `[data-reveal]` as the section enters. Optional
 * `data-reveal-delay` staggers within a group. No-op under reduced motion —
 * the CSS keeps everything visible by default, we only animate *from* hidden.
 */
export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]", root);
      if (!items.length) return;
      // immediateRender:false keeps the from-state off the DOM until the
      // trigger actually fires, so content is never left stuck at opacity 0
      // if the trigger never matches (resize, full-page capture, print).
      gsap.from(items, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        immediateRender: false,
        scrollTrigger: { trigger: root, start: "top 85%", once: true },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Merge two callback refs onto one node. */
export function mergeRefs(...refs) {
  return (node) => {
    refs.forEach((r) => {
      if (!r) return;
      if (typeof r === "function") r(node);
      else r.current = node;
    });
  };
}

export { gsap, ScrollTrigger };

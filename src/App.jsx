import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./lib/motion";
import Overview from "./sections/Overview";
import Rinpoche from "./sections/Rinpoche";
import TripDetails from "./sections/TripDetails";
import Team from "./sections/Team";
import CTA from "./sections/CTA";
import "./App.css";

/** Lenis driven by gsap's ticker, so smooth scroll and ScrollTrigger share one RAF loop. */
function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

/** Lazy-loaded imagery changes page height, so re-measure every trigger. */
function useRefreshOnImageLoad() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.addEventListener("load", refresh, true); // capture per-image loads
    return () => {
      window.removeEventListener("load", refresh);
      document.removeEventListener("load", refresh, true);
    };
  }, []);
}

export default function App() {
  useSmoothScroll();
  useRefreshOnImageLoad();

  return (
    <div className="stage">
      <main className="page">
        <Overview />
        <Rinpoche />
        <TripDetails />
        <Team />
        <CTA />
      </main>
    </div>
  );
}

import { asset, brand, overview } from "../data/trip";
import { useParallax, useReveal, mergeRefs } from "../lib/motion";
import "./Overview.css";

export default function Overview() {
  const parallax = useParallax({ range: 14 });
  const reveal = useReveal();

  return (
    <section
      className="layer layer--1 overview"
      ref={mergeRefs(parallax, reveal)}
    >
      <div className="inner overview__inner">
        <header className="topbar overview__topbar">
          <span>{brand.eyebrow}</span>
          <span>{brand.edition}</span>
        </header>

        <h1 className="overview__title" data-reveal>
          {overview.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <p className="overview__body" data-reveal>
          {overview.body}
        </p>

        <p className="overview__lead" data-reveal>
          {overview.lead}
        </p>
      </div>

      <div className="overview__range" data-depth="-0.6">
        <img
          src={asset("mountain-range.webp")}
          alt="Monastery perched above the wind-carved valleys of Upper Mustang"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    </section>
  );
}

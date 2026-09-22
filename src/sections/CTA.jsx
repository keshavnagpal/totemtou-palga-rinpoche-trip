import { asset, editions, whatsappLink } from "../data/trip";
import { useParallax, useReveal, mergeRefs } from "../lib/motion";
import "./CTA.css";

export default function CTA() {
  const parallax = useParallax({ range: 12 });
  const reveal = useReveal();

  return (
    <section
      className="layer layer--5 layer--tall cta"
      ref={mergeRefs(parallax, reveal)}
      aria-labelledby="cta-title"
    >
      <img
        className="bg-media cta__bg"
        src={asset("mountain-range.webp")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        data-depth="0.3"
      />
      <div className="cta__scrim" />

      <div className="inner cta__inner">
        <h2 className="sr-only" id="cta-title">
          Book the expedition
        </h2>

        <div className="cta__cards">
          {editions.map((ed) => (
            <article
              key={ed.id}
              className={`fare${ed.featured ? " fare--featured" : ""}`}
              data-reveal
            >
              {ed.flag && <span className="fare__flag">{ed.flag}</span>}
              <h3 className="fare__name">{ed.name}</h3>

              <dl className="fare__rows">
                {ed.rows.map(([label, value]) => (
                  <div className="fare__row" key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="fare__row fare__row--cost">
                  <dt>Cost</dt>
                  <dd>
                    {ed.was && <s>{ed.was}</s>}
                    {ed.cost}
                  </dd>
                </div>
              </dl>

              <p className="fare__note">{ed.note}</p>

              <a
                className="fare__cta"
                href={whatsappLink(ed.message)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ed.cta}
                <span className="sr-only">{` for the ${ed.name} — opens WhatsApp`}</span>
              </a>
            </article>
          ))}
        </div>

        <p className="cta__footnote" data-reveal>
          This is our founding expedition — the Maiden Voyage is priced at 3499
          USD. From the Spring Expedition onward the same 14 days cost 12499
          USD.
        </p>
      </div>
    </section>
  );
}

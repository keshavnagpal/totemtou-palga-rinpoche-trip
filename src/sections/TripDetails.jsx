import { useEffect, useRef, useState } from "react";
import { asset, journey } from "../data/trip";
import {
  gsap,
  useParallax,
  useReveal,
  mergeRefs,
  prefersReducedMotion,
} from "../lib/motion";
import "./TripDetails.css";

/** Draws the dotted route in as the map scrolls into view. */
function useRouteDraw(pathRef, rootRef) {
  useEffect(() => {
    const path = pathRef.current;
    const root = rootRef.current;
    if (!path || !root || prefersReducedMotion()) return;

    const len = path.getTotalLength();
    const ctx = gsap.context(() => {
      gsap.fromTo(
        path,
        { strokeDasharray: `2 14`, strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 80%",
            end: "bottom 70%",
            scrub: 0.6,
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, [pathRef, rootRef]);
}

export default function TripDetails() {
  const parallax = useParallax({ range: 10 });
  const reveal = useReveal();
  const mapRef = useRef(null);
  const pathRef = useRef(null);
  // Hover previews a pin; clicking pins it open, so touch and keyboard users
  // get the label too. Kept separate or the click would undo the hover.
  const [hovered, setHovered] = useState(null);
  const [open, setOpen] = useState(null);

  useRouteDraw(pathRef, mapRef);

  return (
    <section
      className="layer layer--3 layer--tall trip"
      ref={mergeRefs(parallax, reveal)}
      aria-labelledby="journey-title"
    >
      <div className="inner trip__inner">
        <div className="trip__head">
          <h2 className="trip__title" id="journey-title" data-reveal>
            {journey.title}
          </h2>
          <ul className="trip__stats">
            {journey.stats.map((stat) => (
              <li key={stat} data-reveal>
                {stat}
              </li>
            ))}
          </ul>
        </div>

        <p className="trip__swipe" aria-hidden="true">
          Swipe the map to follow the route →
        </p>

        <div className="trip__mapscroll">
          <div className="trip__map" ref={mapRef} data-depth="-0.2">
            <img
              src={asset("journey-map-plain.webp")}
              alt="Illustrated panorama of Upper Mustang, from the Kali Gandaki valley up to the cliffs of Chhoser"
              width="1400"
              height="752"
              loading="lazy"
              decoding="async"
            />

            <svg
              className="trip__route"
              viewBox="0 0 1400 752"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                ref={pathRef}
                d="M 300 590 C 390 576 452 552 509 522 C 576 487 618 452 684 408 C 730 377 776 316 816 277 C 900 292 1020 330 1131 335"
                fill="none"
                stroke="#c1462a"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="2 14"
              />
            </svg>

            <ul className="trip__pins">
              {journey.destinations.map((d) => (
                <li
                  key={d.n}
                  className={`pin${open === d.n || hovered === d.n ? " pin--on" : ""}`}
                  style={{ left: `${d.x}%`, top: `${d.y}%` }}
                >
                  <button
                    type="button"
                    className="pin__dot"
                    aria-expanded={open === d.n}
                    onClick={() => setOpen(open === d.n ? null : d.n)}
                    onMouseEnter={() => setHovered(d.n)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(d.n)}
                    onBlur={() => setHovered(null)}
                  >
                    {d.n}
                    <span className="sr-only">{`${d.name} — ${d.note}`}</span>
                  </button>
                  <span className="pin__label" aria-hidden="true">
                    <strong>{d.name}</strong>
                    {d.note}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

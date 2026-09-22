import { asset, rinpoche } from "../data/trip";
import { useParallax, useReveal, mergeRefs } from "../lib/motion";
import "./Rinpoche.css";

export default function Rinpoche() {
  const parallax = useParallax({ range: 16 });
  const reveal = useReveal();

  return (
    <section
      className="layer layer--2 layer--tall rinpoche"
      ref={mergeRefs(parallax, reveal)}
      aria-labelledby="rinpoche-title"
    >
      <img
        className="bg-media rinpoche__bg"
        src={asset("mountain-range.webp")}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        data-depth="0.4"
      />
      <div className="rinpoche__scrim" />

      <div className="inner rinpoche__inner">
        <figure className="rinpoche__portrait" data-depth="-0.25">
          <img
            src={asset("monk-cutout.webp")}
            alt="Palga Rinpoche"
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="rinpoche__copy">
          <h2 className="rinpoche__title" id="rinpoche-title" data-reveal>
            {rinpoche.title}
          </h2>
          <p data-reveal>{rinpoche.body}</p>

          <ul className="rinpoche__snaps">
            {rinpoche.snaps.map((snap, i) => (
              <li
                key={snap.src}
                className="stamp"
                style={{ "--tilt": `${[-4, 2.5, -1.5][i]}deg` }}
                data-reveal
              >
                <img
                  src={snap.src}
                  alt={snap.alt}
                  loading="lazy"
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

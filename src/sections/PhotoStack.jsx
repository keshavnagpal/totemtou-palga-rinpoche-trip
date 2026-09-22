import { useState } from "react";

const TILTS = [-3, 2.5, -1.5];

/**
 * Stack of polaroids. Clicking sends the front card to the back, so repeated
 * clicks cycle through every photo and return to the first.
 */
export default function PhotoStack({ photos, name }) {
  const [order, setOrder] = useState(() => photos.map((_, i) => i));

  const cycle = () => setOrder(([first, ...rest]) => [...rest, first]);
  const front = order[0];

  return (
    <button
      type="button"
      className="stack"
      onClick={cycle}
      aria-label={`Photos of ${name}, showing ${front + 1} of ${photos.length}. Activate for the next photo.`}
    >
      {photos.map((photo, i) => {
        const pos = order.indexOf(i);
        return (
          <span
            key={photo.src}
            className="stack__card"
            data-pos={pos}
            style={{
              "--pos": pos,
              "--tilt": `${TILTS[pos % TILTS.length]}deg`,
              zIndex: photos.length - pos,
            }}
            aria-hidden={pos !== 0}
          >
            <img
              src={photo.src}
              alt={pos === 0 ? photo.alt : ""}
              loading="lazy"
              decoding="async"
            />
          </span>
        );
      })}
      <span className="stack__hint" aria-hidden="true">
        {front + 1} / {photos.length} · tap to shuffle
      </span>
    </button>
  );
}

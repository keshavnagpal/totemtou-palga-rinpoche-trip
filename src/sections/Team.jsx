import { asset, team } from "../data/trip";
import { useParallax, useReveal, mergeRefs } from "../lib/motion";
import PhotoStack from "./PhotoStack";
import "./Team.css";

export default function Team() {
  const parallax = useParallax({ range: 8 });
  const reveal = useReveal();

  return (
    <section
      className="layer layer--4 layer--tall team"
      ref={mergeRefs(parallax, reveal)}
      aria-labelledby="team-title"
    >
      <div className="inner team__inner">
        <h2 className="team__title" id="team-title" data-reveal>
          Dream Team
        </h2>

        {team.map((member) => (
          <article className="member" key={member.handle}>
            <PhotoStack photos={member.photos} name={member.name} />

            <div className="member__copy">
              <a
                className="member__handle"
                href={member.instagram}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
              >
                {member.handle}
                <img
                  src={asset("instagram.webp")}
                  alt=""
                  width="22"
                  height="22"
                  aria-hidden="true"
                />
                <span className="sr-only">(opens Instagram in a new tab)</span>
              </a>
              <p data-reveal>{member.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

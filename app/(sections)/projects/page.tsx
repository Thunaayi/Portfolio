import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <SectionLayout
      kicker="Work"
      title="Projects"
      description="A snapshot of flagship product work—highlighting complex problem solving, measurable outcomes, and the craft behind each release."
      tileKey="experience"
      aside={
        <dl className="space-y-3 text-xs uppercase tracking-[0.35em] text-white/60">
          <div className="space-y-1">
            <dt>Impact pillars</dt>
            <dd className="text-white/75 normal-case tracking-normal">
              Velocity, accessibility, observability
            </dd>
          </div>
          <div className="space-y-1">
            <dt>Roles</dt>
            <dd className="text-white/75 normal-case tracking-normal">
              Lead engineer, design partner, mentor
            </dd>
          </div>
        </dl>
      }
    >
      <div className="route-grid route-grid--projects">
        {projects.map((project) => (
          <article key={project.title} className="route-card route-card--project">
            <header className="route-card__header">
              <span className="route-card__meta">{project.tech.slice(0, 3).join(" • ")}</span>
            </header>
            <h2 className="route-card__title">{project.title}</h2>
            <p className="route-card__summary">{project.summary}</p>
            <p className="route-card__detail">{project.impact}</p>
            <div className="route-card__actions">
              {project.link ? (
                <Link href={project.link} className="route-card__cta" prefetch={false}>
                  View case study →
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </SectionLayout>
  );
}

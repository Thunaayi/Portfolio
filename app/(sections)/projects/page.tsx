"use client";

import { useState } from "react";
import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";
import { ProjectModal } from "@/app/components/ProjectModal";
import { projects, type Project } from "@/data/projects";

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <SectionLayout
        kicker="Work"
        title="Projects"
        description="Showcasing full-stack applications built for scale. From complex learning management systems to real-time collaboration tools."
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
        <div className="space-y-20">
          <section id="featured-projects" className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold uppercase tracking-[0.25em] text-white/90" style={{ fontFamily: 'var(--route-heading-font-family)' }}>
                Production Work
              </h2>
              <div className="h-1 w-12 bg-(--metro-accent)" />
            </div>
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
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="route-card__cta"
                    >
                      View case study →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="talks" className="space-y-8 scroll-mt-20">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold uppercase tracking-[0.25em] text-white/90" style={{ fontFamily: 'var(--route-heading-font-family)' }}>
                Talks
              </h2>
              <div className="h-1 w-12 bg-(--metro-accent)" />
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm">
              <p className="text-white/60">No recent talks available yet. Stay tuned for future conference recordings!</p>
            </div>
          </section>

          <section id="sandbox" className="space-y-8 scroll-mt-20">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold uppercase tracking-[0.25em] text-white/90" style={{ fontFamily: 'var(--route-heading-font-family)' }}>
                Sandbox
              </h2>
              <div className="h-1 w-12 bg-(--metro-accent)" />
            </div>
            <p className="text-white/70">Experiments, quick prototypes, and side-quests I&apos;m currently working on.</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[
                { title: "Metro UI Library", desc: "A collection of reusable components inspired by Windows 8 aesthetic.", tech: "React + Tailwind" },
                { title: "Real-time Polls", desc: "Lightweight polling app using WebSockets for instant feedback.", tech: "Node + Socket.io" }
              ].map((exp, idx) => (
                <div key={idx} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-colors">
                  <h3 className="font-semibold text-white/90">{exp.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{exp.desc}</p>
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-widest text-(--metro-accent)">{exp.tech}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </SectionLayout>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

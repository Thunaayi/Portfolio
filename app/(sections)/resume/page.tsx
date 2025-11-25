import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";

export default function ResumePage() {
  return (
    <SectionLayout
      kicker="Credentials"
      title="Resume"
      description="Download a clean snapshot of experience and impact. Keep an interactive timeline available for quick context."
      tileKey="experience"
      aside={
        <div className="space-y-3 text-xs uppercase tracking-[0.35em] text-white/60">
          <p>Formats — PDF, Notion, Figma handoff</p>
          <p>Last updated — Nov 2025</p>
        </div>
      }
    >
      <div className="route-card route-card--resume">
        <div className="route-card__stack">
          <div className="route-card__row">
            <h2 className="route-card__title">Snapshot</h2>
            <span className="route-card__meta">7+ yrs experience</span>
          </div>
          <ul className="route-card__list">
            <li>Lead front-of-house platform work spanning dashboards, realtime analytics, and design systems.</li>
            <li>Grew cross-functional teams with mentoring, pairing, and ops rituals.</li>
            <li>Shipped measurable wins: -32% task latency, +18% activation, +24 NPS delta.</li>
          </ul>
        </div>
        <div className="route-card__actions">
          <Link href="/resume.pdf" className="route-card__cta" prefetch={false}>
            Download PDF →
          </Link>
          <Link href="https://notion.so" className="route-card__link">
            View living résumé
          </Link>
        </div>
      </div>
    </SectionLayout>
  );
}

import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";

export default function ResumePage() {
  return (
    <SectionLayout
      kicker="Credentials"
      title="Resume"
      description="A quick look at what I've done. Download the PDF if you need the official version."
      tileKey="experience"
      aside={
        <div className="space-y-3 text-xs uppercase tracking-[0.35em] text-white/60">
          <p>Formats — PDF, Notion</p>
          <p>Status — Open to work</p>
        </div>
      }
    >
      <div className="route-card route-card--resume">
        <div className="route-card__stack">
          <div className="route-card__row">
            <h2 className="route-card__title">Snapshot</h2>
            <span className="route-card__meta">Karachi, PK</span>
          </div>
          <ul className="route-card__list">
            <li>Building scalable web apps with React, Next.js, and Node.js.</li>
            <li>Shipped ExamExpert & AceMrcem — complex educational platforms with thousands of users.</li>
            <li>Obsessed with performance, clean UI, and smooth animations.</li>
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

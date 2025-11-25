import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";

const featuredPosts = [
  {
    title: "Patterns for Continuously Shippable Design Systems",
    href: "/blog/design-systems-velocity",
    summary: "A playbook for keeping component libraries nimble without sacrificing accessibility or brand consistency.",
    minutes: 6,
    published: "Oct 2024",
  },
  {
    title: "Measuring Latency Where It Matters",
    href: "/blog/perception-informed-performance",
    summary: "Instrumenting real-user experiences to prioritize the fixes people actually feel.",
    minutes: 8,
    published: "Jul 2024",
  },
  {
    title: "Beyond Dark Mode: Theme Systems for Teams",
    href: "/blog/theme-systems-for-teams",
    summary: "How to architect theme engines that empower both designers and engineers across platforms.",
    minutes: 7,
    published: "Mar 2024",
  },
];

export default function BlogPage() {
  return (
    <SectionLayout
      kicker="Editorial"
      title="Blog"
      description="Capture deep dives, release notes, and experiments. Pair insight with storytelling so every post moves a product conversation forward."
      tileKey="talk"
      aside={
        <div className="space-y-3 text-xs uppercase tracking-[0.35em] text-white/60">
          <p>Writing cadence — Quarterly</p>
          <p>Focus — Design systems, latency, creative tooling</p>
        </div>
      }
    >
      <div className="route-list route-list--blog">
        {featuredPosts.map((post) => (
          <Link key={post.title} href={post.href} className="route-card route-card--blog">
            <article>
              <header className="route-card__header">
                <span className="route-card__meta">{post.published}</span>
                <span className="route-card__meta">{post.minutes} min read</span>
              </header>
              <h2 className="route-card__title">{post.title}</h2>
              <p className="route-card__summary">{post.summary}</p>
              <span className="route-card__cta">Read story →</span>
            </article>
          </Link>
        ))}
      </div>
    </SectionLayout>
  );
}

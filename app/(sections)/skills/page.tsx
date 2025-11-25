import skills from "@/data/skills.json";

import { SectionLayout } from "@/app/components/SectionLayout";

const skillGroups = {
  "Core Stack": skills.slice(0, 6),
  Tooling: skills.slice(6, 12),
  Practices: skills.slice(12),
};

export default function SkillsPage() {
  return (
    <SectionLayout
      kicker="Capabilities"
      title="Skills"
      description="A curated map of the languages, tools, and practices I lean on to ship ambitious products."
      tileKey="stack"
      aside={
        <div className="space-y-2 text-sm text-white/70">
          <p>Pairing curiosity with discipline keeps this list evolving. Recent focus: realtime collaboration and perf tooling.</p>
        </div>
      }
    >
      <div className="route-grid route-grid--skills">
        {Object.entries(skillGroups).map(([label, group]) => (
          <section key={label} className="route-card route-card--skills">
            <header className="route-card__header">
              <h2 className="route-card__title">{label}</h2>
            </header>
            <ul className="route-chip-list">
              {group.map((skill) => (
                <li key={skill} className="route-chip">
                  {skill}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </SectionLayout>
  );
}

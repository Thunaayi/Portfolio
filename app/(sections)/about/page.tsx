import { SectionLayout } from "@/app/components/SectionLayout";

export default function AboutPage() {
  return (
    <SectionLayout
      kicker="Profile"
      title="About"
      description="Introduce yourself with intent, share the mission behind your work, and connect the dots between your past and future."
      tileKey="profile"
      aside={
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-white/60">Currently</p>
            <p className="text-white/80">Senior Frontend Engineer @ Arcadia Labs</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-white/60">Based in</p>
            <p className="text-white/80">Lahore, Pakistan</p>
          </div>
        </div>
      }
    >
      <div className="space-y-6 text-base leading-relaxed text-white/75">
        <p>
          I design resilient product experiences for fast-moving teams, pairing motion fluency with rigorous systems
          thinking. Crafting modular UI foundations, managing design ops, and mentoring engineers are all part of the
          same pursuit: making teams faster, calmer, and more ambitious.
        </p>
        <p>
          Over the past seven years I&apos;ve led initiatives across SaaS analytics, climate tech, and creative tools. I
          thrive when partnering with product, design, and research to translate complex insights into interfaces that
          feel inevitable.
        </p>
        <p>
          Outside of production work you can find me prototyping novel interaction patterns, contributing to open-source
          accessibility libraries, and co-hosting a local creative coding lab.
        </p>
      </div>
    </SectionLayout>
  );
}

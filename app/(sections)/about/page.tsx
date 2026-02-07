import { SectionLayout } from "@/app/components/SectionLayout";

export default function AboutPage() {
  return (
    <SectionLayout
      kicker="Profile"
      title="About"
      description="I build stuff for the web. Fast, functional, and sometimes pretty cool."
      tileKey="profile"
      aside={
        <div className="space-y-4 text-sm">
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-white/60">Currently</p>
            <p className="text-white/80">Full Stack & UI Dev</p>
          </div>
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-white/60">Based in</p>
            <p className="text-white/80">Karachi, Pakistan</p>
          </div>
        </div>
      }
    >
      <div className="space-y-12">
        <div className="space-y-6 text-base leading-relaxed text-white/75">
          <p>
            Hi, I&apos;m Aimal. I build web apps that are fast, functional, and look good. No fluff—just clean code and solid user experiences.
          </p>
          <p>
            I specialize in the MERN stack and love solving actual problems, whether it&apos;s an intricate LMS like ExamExpert or a quick experimental demo. I&apos;m all about making things that work well and feel great to use.
          </p>
          <p>
            When I&apos;m not coding, I&apos;m probably checking out new tech, tweaking my setup, or building something just for fun.
          </p>
        </div>

        <section id="testimonials" className="space-y-8 scroll-mt-20">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold uppercase tracking-[0.25em] text-white/90" style={{ fontFamily: 'var(--route-heading-font-family)' }}>
              Kind Words
            </h2>
            <div className="h-1 w-12 bg-(--metro-accent)" />
          </div>

          <div className="grid gap-6">
            {[
              {
                text: "Aimal is a rare talent who bridges the gap between complex backend logic and pixel-perfect frontend. The work on ExamExpert was transformative for our team.",
                author: "Client / Educational Institution"
              },
              {
                text: "Professional, communicative, and exceptionally fast. Delivered AceMrcem ahead of schedule with zero technical debt.",
                author: "Project Lead"
              }
            ].map((t, i) => (
              <blockquote key={i} className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <p className="italic text-white/80">&ldquo;{t.text}&rdquo;</p>
                <footer className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                  — {t.author}
                </footer>
              </blockquote>
            ))}
          </div>
        </section>
      </div>
    </SectionLayout>
  );
}

import Link from "next/link";

import { SectionLayout } from "@/app/components/SectionLayout";

export default function ContactPage() {
  return (
    <SectionLayout
      kicker="Reach out"
      title="Contact"
      description="Let’s talk about what you’re building and how I can help. Async notes or live working sessions both welcome."
      tileKey="contact"
      aside={
        <div className="space-y-2 text-sm text-white/70">
          <p>Prefer async? Drop a note and I’ll reply within two business days.</p>
          <p className="text-white/50">Open for collaborations, audits, and guest talks.</p>
        </div>
      }
    >
      <div className="route-card route-card--contact">
        <form className="route-form">
          <div className="route-form__grid">
            <label className="route-form__field">
              <span>Name</span>
              <input type="text" placeholder="Ada Lovelace" required />
            </label>
            <label className="route-form__field">
              <span>Email</span>
              <input type="email" placeholder="you@example.com" required />
            </label>
          </div>
          <label className="route-form__field">
            <span>What should we explore?</span>
            <textarea rows={4} placeholder="Tell me about your product, team, or goals." required />
          </label>
          <div className="route-form__footer">
            <button type="submit" className="route-card__cta">
              Send message
            </button>
            <Link href="mailto:hello@example.com" className="route-card__link">
              Prefer email? hello@example.com
            </Link>
          </div>
        </form>
      </div>
    </SectionLayout>
  );
}

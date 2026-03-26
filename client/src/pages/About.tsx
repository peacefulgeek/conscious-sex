import { SITE_CONFIG } from "@/data";

export default function About() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Krishna",
      jobTitle: "Spiritual Advisor",
      url: "https://shrikrishna.com",
      description: SITE_CONFIG.authorBio,
    },
  };

  return (
    <div className="container py-12 max-w-3xl mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.22_0.03_40)] mb-8" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        About Sacred Fire Intimacy
      </h1>

      {/* Editorial team first */}
      <section className="mb-12">
        <p className="text-lg text-[oklch(0.35_0.05_40)] leading-relaxed mb-4">
          Sacred Fire Intimacy exists because the conversation about sexuality is broken. On one side, puritanical shame that treats the body as something to be overcome. On the other, commodified desire that reduces intimacy to technique and performance. Neither tells the truth.
        </p>
        <p className="text-lg text-[oklch(0.35_0.05_40)] leading-relaxed mb-4">
          Our editorial team writes from the intersection of ancient wisdom and lived experience. Every article draws from Advaita Vedanta, classical Tantra, somatic embodiment, and decades of practice — not theory, not abstraction, but the kind of knowing that lives in the body.
        </p>
        <p className="text-lg text-[oklch(0.35_0.05_40)] leading-relaxed mb-4">
          We believe that sexuality is a spiritual practice. That presence transforms physical intimacy. That the body is not an obstacle to awakening — it is the vehicle. And that the space between two people, when held with consciousness, becomes sacred ground.
        </p>
        <p className="text-lg text-[oklch(0.35_0.05_40)] leading-relaxed">
          If you're here, something in you already knows this. Trust that knowing. Let it guide you through these pages.
        </p>
      </section>

      <div className="gold-divider mb-12" />

      {/* Krishna card */}
      <section>
        <h2 className="text-2xl font-bold text-[oklch(0.22_0.03_40)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Our Spiritual Advisor
        </h2>
        <div className="bg-[oklch(0.95_0.01_85)] rounded-lg p-8 flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-[oklch(0.42_0.14_350)] flex-shrink-0 flex items-center justify-center">
            <span className="text-white text-4xl font-bold" style={{ fontFamily: "'Bodoni Moda', serif" }}>K</span>
          </div>
          <div>
            <h3 className="text-xl font-bold text-[oklch(0.22_0.03_40)]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              Krishna
            </h3>
            <p className="text-sm text-[oklch(0.42_0.14_350)] font-medium mb-3">Spiritual Advisor</p>
            <p className="text-[oklch(0.45_0.04_40)] leading-relaxed mb-4">
              {SITE_CONFIG.authorBio}
            </p>
            <a
              href="https://shrikrishna.com"
              className="inline-flex items-center px-5 py-2.5 bg-[oklch(0.42_0.14_350)] text-white text-sm font-medium rounded hover:bg-[oklch(0.35_0.12_350)] transition-colors"
            >
              Visit Krishna's Website
            </a>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="mt-12 p-4 bg-[oklch(0.95_0.01_85)] rounded text-sm text-[oklch(0.55_0.03_40)] italic">
        {SITE_CONFIG.disclaimer}
      </div>
    </div>
  );
}

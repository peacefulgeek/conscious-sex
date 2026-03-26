import { Flame, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { SITE_CONFIG } from "@/data";

export default function About() {
  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://conscious-sexuality.b-cdn.net/site/hero-healing.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.12_0.04_25/0.85)] to-[oklch(0.12_0.04_25/0.5)]" />
        </div>
        <div className="container relative max-w-2xl">
          <Flame className="w-6 h-6 text-[oklch(0.72_0.16_60)] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Bodoni Moda', serif" }}>About</h1>
          <p className="text-lg text-[oklch(0.80_0.03_60)] leading-relaxed">
            Sacred Fire Intimacy exists because the conversation about sexuality deserves more than clickbait and shame.
          </p>
        </div>
      </section>
      <div className="ember-line" />

      <section className="container py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-[oklch(0.20_0.04_35)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>The Editorial Team</h2>
        <div className="space-y-6 text-[oklch(0.30_0.04_35)] leading-relaxed">
          <p>Our editorial team brings together researchers, somatic practitioners, and writers who have spent years in the intersection of spirituality, embodiment, and human sexuality. Every article is reviewed for accuracy, voice integrity, and depth before publication.</p>
          <p>We draw from peer-reviewed research, classical spiritual traditions, and lived clinical experience. We don't publish content that hasn't been pressure-tested against real bodies and real relationships.</p>
        </div>
      </section>

      <div className="container"><div className="ember-line" /></div>

      <section className="container py-16 max-w-3xl">
        <div className="flex items-center gap-4 mb-6">
          <Flame className="w-6 h-6 text-[oklch(0.55_0.18_25)]" />
          <h2 className="text-2xl font-bold text-[oklch(0.20_0.04_35)]" style={{ fontFamily: "'Bodoni Moda', serif" }}>Kalesh — Consciousness Teacher & Writer</h2>
        </div>
        <p className="text-[oklch(0.30_0.04_35)] leading-relaxed mb-6">{SITE_CONFIG.authorBio}</p>
        <a href="https://kalesh.love" target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] transition-colors duration-200">
          Visit Kalesh <ArrowRight className="w-3 h-3" />
        </a>
      </section>

      <div className="container"><div className="ember-line" /></div>

      <section className="container py-16 max-w-3xl">
        <h2 className="text-2xl font-bold text-[oklch(0.20_0.04_35)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>Our Philosophy</h2>
        <div className="space-y-6 text-[oklch(0.30_0.04_35)] leading-relaxed">
          <p>We believe sexuality is not separate from spirituality — it is one of its most potent expressions. The body is not an obstacle to transcendence. It is the vehicle.</p>
          <p>We write from the intersection of Advaita Vedanta, classical Tantra, polyvagal theory, and somatic experiencing. We don't simplify. We don't patronize. We trust our readers to meet complexity with curiosity.</p>
          <p>Every article on this site is written to be read slowly, felt in the body, and returned to. This is not content to consume. It is material to practice with.</p>
        </div>
      </section>

      <section className="py-16 bg-[oklch(0.15_0.03_25)] text-center">
        <div className="container max-w-lg">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Begin the Work</h2>
          <p className="text-[oklch(0.65_0.03_60)] mb-8">Start with our curated reading path or explore the full archive.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/start-here" className="px-8 py-3 bg-[oklch(0.55_0.18_25)] text-white text-sm font-medium uppercase tracking-wide hover:bg-[oklch(0.45_0.16_25)] transition-colors">Start Here</Link>
            <Link href="/articles" className="px-8 py-3 border border-[oklch(0.72_0.16_60/0.5)] text-[oklch(0.72_0.16_60)] text-sm font-medium uppercase tracking-wide hover:bg-[oklch(0.72_0.16_60/0.1)] transition-colors">All Articles</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "ProfilePage",
        mainEntity: { "@type": "Person", name: "Kalesh", jobTitle: "Consciousness Teacher & Writer", url: "https://kalesh.love", description: SITE_CONFIG.authorBio },
      }) }} />
    </div>
  );
}

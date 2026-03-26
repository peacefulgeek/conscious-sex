import { Link } from "wouter";
import { ArrowRight, Flame } from "lucide-react";
import { quizzes, CATEGORIES } from "@/data";

export default function QuizListPage() {
  return (
    <div>
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 flame-glow" />
        <div className="container relative max-w-2xl">
          <Flame className="w-6 h-6 text-[oklch(0.72_0.16_60)] mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.20_0.04_35)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            Quizzes
          </h1>
          <p className="text-[oklch(0.40_0.04_35)] text-lg">
            Nine mirrors. Not personality tests — honest self-assessments that illuminate your patterns, desires, and edges.
          </p>
        </div>
      </section>
      <div className="ember-line" />

      <section className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.map(quiz => {
            const cat = CATEGORIES.find(c => c.slug === quiz.category);
            return (
              <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="group block p-8 border-l-2 border-[oklch(0.72_0.16_60)] hover:bg-[oklch(0.94_0.02_60)] transition-all duration-300 warm-card">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[oklch(0.55_0.18_25)] mb-3 block">
                  {cat?.name || "Quiz"} · {quiz.questions.length} questions
                </span>
                <h2 className="text-xl font-bold text-[oklch(0.20_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors duration-300 mb-3 leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                  {quiz.title}
                </h2>
                <p className="text-sm text-[oklch(0.40_0.04_35)] leading-relaxed mb-5 line-clamp-2">{quiz.description}</p>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.55_0.18_25)] flex items-center gap-2">
                  Take Quiz <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Readiness Check CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://conscious-sexuality.b-cdn.net/site/hero-energy.webp" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[oklch(0.12_0.04_25/0.85)]" />
        </div>
        <div className="container relative text-center max-w-lg">
          <Flame className="w-8 h-8 text-[oklch(0.72_0.16_60)] mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            The Intimacy Readiness Check
          </h2>
          <p className="text-[oklch(0.75_0.03_60)] mb-8">
            A deeper assessment: 12 questions on vulnerability, sensation, presence, and unresolved shame. Discover your archetype.
          </p>
          <Link href="/readiness" className="inline-flex items-center gap-3 px-8 py-4 bg-[oklch(0.55_0.18_25)] text-white font-medium hover:bg-[oklch(0.45_0.16_25)] transition-all duration-300 text-sm tracking-wide uppercase">
            Take the Readiness Check <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

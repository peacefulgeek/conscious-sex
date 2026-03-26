import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { quizzes, CATEGORIES } from "@/data";

export default function QuizListPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          Quizzes
        </h1>
        <p className="text-lg text-[oklch(0.45_0.04_40)]">
          Explore your intimate self through honest self-assessment. Each quiz takes 2-5 minutes and offers personalized insights.
        </p>
      </div>

      <div className="gold-divider mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map(quiz => {
          const cat = CATEGORIES.find(c => c.slug === quiz.category);
          return (
            <Link key={quiz.slug} href={`/quiz/${quiz.slug}`} className="group block p-6 rounded border border-[oklch(0.88_0.03_75)] hover:border-[oklch(0.42_0.14_350)] hover:shadow-md transition-all">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)]">
                  {cat?.name || "Quiz"}
                </span>
                <span className="text-xs text-[oklch(0.55_0.03_40)]">· {quiz.questions.length} questions</span>
              </div>
              <h2 className="text-xl font-bold text-[oklch(0.22_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
                {quiz.title}
              </h2>
              <p className="text-sm text-[oklch(0.45_0.04_40)] mb-4 line-clamp-2">{quiz.description}</p>
              <span className="text-sm font-medium text-[oklch(0.42_0.14_350)] flex items-center gap-1">
                Take Quiz <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          );
        })}
      </div>

      {/* Readiness Check CTA */}
      <section className="mt-16 bg-[oklch(0.22_0.03_40)] rounded-lg p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[oklch(0.97_0.01_85)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          The Intimacy Readiness Check
        </h2>
        <p className="text-[oklch(0.70_0.03_75)] mb-6 max-w-lg mx-auto">
          A deeper assessment: 12 questions on vulnerability, sensation, presence, and unresolved shame. Discover your archetype.
        </p>
        <Link href="/readiness" className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.73_0.14_85)] text-[oklch(0.22_0.03_40)] font-medium rounded hover:bg-[oklch(0.68_0.14_85)] transition-colors">
          Take the Readiness Check <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  );
}

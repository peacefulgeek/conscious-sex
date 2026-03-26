import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, RotateCcw, Flame } from "lucide-react";
import { readinessQuestions, readinessArchetypes } from "@/data";
import EmailCapture from "@/components/EmailCapture";

const SCALE_LABELS = ["Not at all", "Rarely", "Sometimes", "Often", "Completely"];

export default function ReadinessPage() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (qId: number, value: number) => {
    setAnswers(prev => ({ ...prev, [qId]: value }));
  };

  const allAnswered = readinessQuestions.every(q => answers[q.id] !== undefined);
  const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const maxScore = readinessQuestions.length * 4;
  const percentage = Math.round((totalScore / maxScore) * 100);

  const getArchetype = () => {
    return readinessArchetypes.find(a => percentage >= a.range[0] && percentage <= a.range[1]) || readinessArchetypes[0];
  };

  if (showResult) {
    const archetype = getArchetype();
    return (
      <div className="container py-16 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Flame className="w-8 h-8 text-[oklch(0.72_0.16_60)] mx-auto mb-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[oklch(0.55_0.18_25)] mb-3">Your Readiness Score</p>
          <div className="w-20 h-20 border-2 border-[oklch(0.55_0.18_25)] flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl font-bold text-[oklch(0.55_0.18_25)]">{percentage}%</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.20_0.04_35)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            {archetype.name}
          </h1>
          <div className="ember-line mb-6" />
          <p className="text-lg text-[oklch(0.35_0.04_35)] leading-relaxed">{archetype.description}</p>
        </div>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-[oklch(0.20_0.04_35)] mb-5" style={{ fontFamily: "'Bodoni Moda', serif" }}>Your Practice</h2>
          <div className="space-y-4">
            {archetype.practices.map((p, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-[oklch(0.90_0.03_60)]">
                <span className="w-6 h-6 bg-[oklch(0.55_0.18_25)] text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-[oklch(0.30_0.04_35)]">{p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-[oklch(0.20_0.04_35)] mb-5" style={{ fontFamily: "'Bodoni Moda', serif" }}>Dimension Breakdown</h2>
          {["sensation", "vulnerability", "voice", "boundaries", "presence", "shadow"].map(dim => {
            const dimQs = readinessQuestions.filter(q => q.dimension === dim);
            const dimScore = dimQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
            const dimMax = dimQs.length * 4;
            const dimPct = Math.round((dimScore / dimMax) * 100);
            return (
              <div key={dim} className="mb-4">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="capitalize text-[oklch(0.30_0.04_35)]">{dim}</span>
                  <span className="text-[oklch(0.50_0.04_35)]">{dimPct}%</span>
                </div>
                <div className="h-[2px] bg-[oklch(0.90_0.03_60)] overflow-hidden">
                  <div className="h-full bg-[oklch(0.55_0.18_25)]" style={{ width: `${dimPct}%` }} />
                </div>
              </div>
            );
          })}
        </section>

        <div className="border-l-2 border-[oklch(0.72_0.16_60)] pl-6 mb-10">
          <h3 className="text-sm font-bold text-[oklch(0.20_0.04_35)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>Stay in the Fire</h3>
          <p className="text-xs text-[oklch(0.50_0.04_35)] mb-4">Join the community. No spam.</p>
          <EmailCapture source="readiness-check" />
        </div>

        <div className="flex gap-4 justify-center">
          <button onClick={() => { setAnswers({}); setShowResult(false); }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors">
            <RotateCcw className="w-4 h-4" /> Retake
          </button>
          <Link href="/quizzes" className="flex items-center gap-2 px-5 py-2.5 text-sm bg-[oklch(0.55_0.18_25)] text-white hover:bg-[oklch(0.45_0.16_25)] transition-colors">
            More Quizzes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 flame-glow" />
        <div className="container relative max-w-2xl">
          <Flame className="w-6 h-6 text-[oklch(0.72_0.16_60)] mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.20_0.04_35)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            The Intimacy Readiness Check
          </h1>
          <p className="text-[oklch(0.40_0.04_35)] leading-relaxed">
            12 questions on vulnerability, sensation, presence, and unresolved shame. Answer honestly — this isn't a test. It's a mirror.
          </p>
        </div>
      </section>
      <div className="ember-line" />

      <div className="container py-12 max-w-2xl mx-auto">
        <div className="space-y-6">
          {readinessQuestions.map((q, idx) => (
            <div key={q.id} className="p-6 border-l-2 border-[oklch(0.72_0.16_60)]">
              <p className="text-sm font-medium text-[oklch(0.20_0.04_35)] mb-4">
                <span className="text-[oklch(0.55_0.18_25)] mr-2">{idx + 1}.</span>{q.text}
              </p>
              <div className="flex flex-wrap gap-2">
                {SCALE_LABELS.map((label, val) => (
                  <button key={val} onClick={() => handleAnswer(q.id, val)}
                    className={`px-3 py-2 text-xs transition-all duration-200 ${
                      answers[q.id] === val
                        ? "bg-[oklch(0.55_0.18_25)] text-white"
                        : "border border-[oklch(0.90_0.03_60)] text-[oklch(0.40_0.04_35)] hover:border-[oklch(0.55_0.18_25)]"
                    }`}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button onClick={() => allAnswered && setShowResult(true)} disabled={!allAnswered}
            className={`px-8 py-3 text-sm font-medium uppercase tracking-wide transition-colors ${
              allAnswered
                ? "bg-[oklch(0.55_0.18_25)] text-white hover:bg-[oklch(0.45_0.16_25)]"
                : "bg-[oklch(0.90_0.03_60)] text-[oklch(0.50_0.04_35)] cursor-not-allowed"
            }`}>
            {allAnswered ? "See My Results" : `Answer all ${readinessQuestions.length} questions`}
          </button>
        </div>
      </div>
    </div>
  );
}

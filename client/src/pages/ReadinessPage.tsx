import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, RotateCcw } from "lucide-react";
import { readinessQuestions, readinessArchetypes } from "@/data";
import NewsletterForm from "@/components/NewsletterForm";

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
      <div className="container py-12 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)] mb-2">Your Readiness Score</p>
          <div className="w-24 h-24 rounded-full border-4 border-[oklch(0.42_0.14_350)] flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-[oklch(0.42_0.14_350)]">{percentage}%</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            {archetype.name}
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-lg text-[oklch(0.35_0.05_40)] leading-relaxed">{archetype.description}</p>
        </div>

        {/* Practices */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Your Practice</h2>
          <div className="space-y-3">
            {archetype.practices.map((p, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-[oklch(0.95_0.01_85)] rounded">
                <span className="w-6 h-6 rounded-full bg-[oklch(0.42_0.14_350)] text-white text-xs flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <p className="text-sm text-[oklch(0.35_0.05_40)]">{p}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Dimension breakdown */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Dimension Breakdown</h2>
          {["sensation", "vulnerability", "voice", "boundaries", "presence", "shadow"].map(dim => {
            const dimQs = readinessQuestions.filter(q => q.dimension === dim);
            const dimScore = dimQs.reduce((s, q) => s + (answers[q.id] || 0), 0);
            const dimMax = dimQs.length * 4;
            const dimPct = Math.round((dimScore / dimMax) * 100);
            return (
              <div key={dim} className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize text-[oklch(0.35_0.05_40)]">{dim}</span>
                  <span className="text-[oklch(0.55_0.03_40)]">{dimPct}%</span>
                </div>
                <div className="h-2 bg-[oklch(0.93_0.02_75)] rounded-full overflow-hidden">
                  <div className="h-full bg-[oklch(0.42_0.14_350)] rounded-full" style={{ width: `${dimPct}%` }} />
                </div>
              </div>
            );
          })}
        </section>

        {/* Newsletter */}
        <div className="bg-[oklch(0.95_0.01_85)] rounded p-6 mb-8">
          <h3 className="text-lg font-bold text-[oklch(0.22_0.03_40)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>Stay Connected</h3>
          <p className="text-sm text-[oklch(0.55_0.03_40)] mb-3">Join our community for more insights on conscious intimacy.</p>
          <NewsletterForm source="readiness-check" />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { setAnswers({}); setShowResult(false); }}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[oklch(0.88_0.03_75)] rounded hover:bg-[oklch(0.93_0.02_75)] transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake
          </button>
          <Link href="/quizzes" className="flex items-center gap-2 px-4 py-2 text-sm bg-[oklch(0.42_0.14_350)] text-white rounded hover:bg-[oklch(0.35_0.12_350)] transition-colors">
            More Quizzes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          The Intimacy Readiness Check
        </h1>
        <p className="text-lg text-[oklch(0.45_0.04_40)] leading-relaxed">
          12 questions on vulnerability, sensation, presence, and unresolved shame. Answer honestly — this isn't a test. It's a mirror.
        </p>
      </div>

      <div className="gold-divider mb-8" />

      <div className="space-y-8">
        {readinessQuestions.map((q, idx) => (
          <div key={q.id} className="p-6 rounded border border-[oklch(0.88_0.03_75)]">
            <p className="text-sm font-medium text-[oklch(0.22_0.03_40)] mb-4">
              <span className="text-[oklch(0.42_0.14_350)] mr-2">{idx + 1}.</span>
              {q.text}
            </p>
            <div className="flex flex-wrap gap-2">
              {SCALE_LABELS.map((label, val) => (
                <button
                  key={val}
                  onClick={() => handleAnswer(q.id, val)}
                  className={`px-3 py-2 text-xs rounded border transition-all ${
                    answers[q.id] === val
                      ? "bg-[oklch(0.42_0.14_350)] text-white border-[oklch(0.42_0.14_350)]"
                      : "border-[oklch(0.88_0.03_75)] text-[oklch(0.45_0.04_40)] hover:border-[oklch(0.42_0.14_350)]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => allAnswered && setShowResult(true)}
          disabled={!allAnswered}
          className={`px-8 py-3 text-sm font-medium rounded transition-colors ${
            allAnswered
              ? "bg-[oklch(0.42_0.14_350)] text-white hover:bg-[oklch(0.35_0.12_350)]"
              : "bg-[oklch(0.88_0.03_75)] text-[oklch(0.55_0.03_40)] cursor-not-allowed"
          }`}
        >
          {allAnswered ? "See My Results" : `Answer all ${readinessQuestions.length} questions to continue`}
        </button>
      </div>
    </div>
  );
}

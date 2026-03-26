import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, ArrowLeft, RotateCcw, Flame } from "lucide-react";
import { quizzes, getArticleBySlug, SITE_CONFIG } from "@/data";
import EmailCapture from "@/components/EmailCapture";

export default function QuizPage() {
  const params = useParams<{ slug: string }>();
  const quiz = quizzes.find(q => q.slug === params.slug);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = useCallback((optionIndex: number) => {
    if (!quiz) return;
    const option = quiz.questions[currentQ].options[optionIndex];
    const newScores = { ...scores };
    Object.entries(option.scores).forEach(([key, val]) => {
      newScores[key] = (newScores[key] || 0) + val;
    });
    setScores(newScores);
    setAnswers([...answers, optionIndex]);
    if (currentQ < quiz.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      setShowResult(true);
    }
  }, [quiz, currentQ, scores, answers]);

  useEffect(() => {
    if (showResult || !quiz) return;
    const handler = (e: KeyboardEvent) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= quiz.questions[currentQ].options.length) {
        handleAnswer(num - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [showResult, quiz, currentQ, handleAnswer]);

  if (!quiz) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Quiz Not Found</h1>
        <Link href="/quizzes" className="text-[oklch(0.55_0.18_25)] underline">Browse all quizzes</Link>
      </div>
    );
  }

  const getResult = () => {
    let maxKey = "";
    let maxVal = -1;
    Object.entries(scores).forEach(([key, val]) => {
      if (val > maxVal) { maxKey = key; maxVal = val; }
    });
    return quiz.results.find(r => r.id === maxKey) || quiz.results[0];
  };

  if (showResult) {
    const result = getResult();
    const recommendedArticles = result.recommendations.map(slug => getArticleBySlug(slug)).filter(Boolean);

    return (
      <div className="container py-16 max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <Flame className="w-8 h-8 text-[oklch(0.72_0.16_60)] mx-auto mb-4" />
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[oklch(0.55_0.18_25)] mb-3">Your Result</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.20_0.04_35)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            {result.title}
          </h1>
          <div className="ember-line mb-6" />
          <p className="text-lg text-[oklch(0.35_0.04_35)] leading-relaxed">{result.description}</p>
        </div>

        {recommendedArticles.length > 0 && (
          <section className="mb-10">
            <h2 className="text-lg font-bold text-[oklch(0.20_0.04_35)] mb-5" style={{ fontFamily: "'Bodoni Moda', serif" }}>Recommended Reading</h2>
            <div className="space-y-4">
              {recommendedArticles.map(a => a && (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex items-center gap-4 py-3 border-b border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors">
                  <img src={a.heroImage} alt={a.title} width={80} height={45} loading="lazy" className="w-20 h-12 object-cover flex-shrink-0" />
                  <span className="text-sm font-medium text-[oklch(0.30_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] transition-colors">{a.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="border-l-2 border-[oklch(0.72_0.16_60)] pl-6 mb-10">
          <h3 className="text-sm font-bold text-[oklch(0.20_0.04_35)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>Stay in the Fire</h3>
          <p className="text-xs text-[oklch(0.50_0.04_35)] mb-4">Join the community. No spam.</p>
          <EmailCapture source={`quiz-${quiz.slug}`} />
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { setCurrentQ(0); setAnswers([]); setScores({}); setShowResult(false); }}
            className="flex items-center gap-2 px-5 py-2.5 text-sm border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake
          </button>
          <Link href="/quizzes" className="flex items-center gap-2 px-5 py-2.5 text-sm bg-[oklch(0.55_0.18_25)] text-white hover:bg-[oklch(0.45_0.16_25)] transition-colors">
            More Quizzes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const progress = (currentQ / quiz.questions.length) * 100;

  return (
    <div className="container py-16 max-w-2xl mx-auto">
      <Link href="/quizzes" className="text-xs text-[oklch(0.50_0.04_35)] hover:text-[oklch(0.55_0.18_25)] flex items-center gap-1 mb-8">
        <ArrowLeft className="w-3 h-3" /> All Quizzes
      </Link>
      <h1 className="text-2xl font-bold text-[oklch(0.20_0.04_35)] mb-8" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        {quiz.title}
      </h1>

      {/* Progress */}
      <div className="mb-10">
        <div className="flex justify-between text-xs text-[oklch(0.50_0.04_35)] mb-2">
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-[2px] bg-[oklch(0.90_0.03_60)] overflow-hidden">
          <div className="h-full bg-[oklch(0.55_0.18_25)] transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-[oklch(0.20_0.04_35)] mb-8 leading-snug" style={{ fontFamily: "'Bodoni Moda', serif" }}>
        {question.text}
      </h2>
      <div className="space-y-3">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i)}
            className="w-full text-left p-5 border border-[oklch(0.90_0.03_60)] hover:border-[oklch(0.55_0.18_25)] hover:bg-[oklch(0.94_0.02_60)] transition-all duration-200 group"
          >
            <div className="flex items-start gap-4">
              <span className="w-7 h-7 border border-[oklch(0.90_0.03_60)] group-hover:border-[oklch(0.55_0.18_25)] flex items-center justify-center text-xs font-medium text-[oklch(0.50_0.04_35)] group-hover:text-[oklch(0.55_0.18_25)] flex-shrink-0 mt-0.5 transition-colors">
                {i + 1}
              </span>
              <span className="text-sm text-[oklch(0.30_0.04_35)]">{opt.text}</span>
            </div>
          </button>
        ))}
      </div>
      <p className="text-[10px] text-[oklch(0.50_0.04_35)] text-center mt-6">Press 1-{question.options.length} to select</p>
    </div>
  );
}

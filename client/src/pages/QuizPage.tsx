import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "wouter";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";
import { quizzes, getArticleBySlug, SITE_CONFIG } from "@/data";
import NewsletterForm from "@/components/NewsletterForm";

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

  // Keyboard navigation
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
        <Link href="/quizzes" className="text-[oklch(0.42_0.14_350)] underline">Browse all quizzes</Link>
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
    const recommendedArticles = result.recommendations
      .map(slug => getArticleBySlug(slug))
      .filter(Boolean);

    return (
      <div className="container py-12 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-[oklch(0.42_0.14_350)] mb-2">Your Result</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            {result.title}
          </h1>
          <div className="gold-divider mb-6" />
          <p className="text-lg text-[oklch(0.35_0.05_40)] leading-relaxed">{result.description}</p>
        </div>

        {/* Recommended articles */}
        {recommendedArticles.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-[oklch(0.22_0.03_40)] mb-4" style={{ fontFamily: "'Bodoni Moda', serif" }}>Recommended Reading</h2>
            <div className="space-y-3">
              {recommendedArticles.map(a => a && (
                <Link key={a.slug} href={`/articles/${a.slug}`} className="group flex items-center gap-3 p-3 rounded border border-[oklch(0.88_0.03_75)] hover:border-[oklch(0.42_0.14_350)] transition-colors">
                  <img src={a.heroImage} alt={a.title} width={60} height={34} loading="lazy" className="w-15 h-9 object-cover rounded" />
                  <span className="text-sm font-medium text-[oklch(0.35_0.05_40)] group-hover:text-[oklch(0.42_0.14_350)] transition-colors">{a.title}</span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Newsletter */}
        <div className="bg-[oklch(0.95_0.01_85)] rounded p-6 mb-8">
          <h3 className="text-lg font-bold text-[oklch(0.22_0.03_40)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>Stay Connected</h3>
          <p className="text-sm text-[oklch(0.55_0.03_40)] mb-3">Join our community for more insights on conscious intimacy.</p>
          <NewsletterForm source={`quiz-${quiz.slug}`} />
        </div>

        {/* Share & retake */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => { setCurrentQ(0); setAnswers([]); setScores({}); setShowResult(false); }}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-[oklch(0.88_0.03_75)] rounded hover:bg-[oklch(0.93_0.02_75)] transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
          <Link href="/quizzes" className="flex items-center gap-2 px-4 py-2 text-sm bg-[oklch(0.42_0.14_350)] text-white rounded hover:bg-[oklch(0.35_0.12_350)] transition-colors">
            More Quizzes <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  const question = quiz.questions[currentQ];
  const progress = ((currentQ) / quiz.questions.length) * 100;

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link href="/quizzes" className="text-sm text-[oklch(0.55_0.03_40)] hover:text-[oklch(0.42_0.14_350)] flex items-center gap-1 mb-4">
          <ArrowLeft className="w-3 h-3" /> All Quizzes
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-[oklch(0.22_0.03_40)]" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          {quiz.title}
        </h1>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-[oklch(0.55_0.03_40)] mb-2">
          <span>Question {currentQ + 1} of {quiz.questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-[oklch(0.93_0.02_75)] rounded-full overflow-hidden">
          <div className="h-full bg-[oklch(0.42_0.14_350)] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-[oklch(0.22_0.03_40)] mb-6" style={{ fontFamily: "'Bodoni Moda', serif" }}>
          {question.text}
        </h2>
        <div className="space-y-3">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i)}
              className="w-full text-left p-4 rounded border border-[oklch(0.88_0.03_75)] hover:border-[oklch(0.42_0.14_350)] hover:bg-[oklch(0.97_0.01_85)] transition-all group"
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full border border-[oklch(0.88_0.03_75)] group-hover:border-[oklch(0.42_0.14_350)] flex items-center justify-center text-xs font-medium text-[oklch(0.55_0.03_40)] group-hover:text-[oklch(0.42_0.14_350)] flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-[oklch(0.35_0.05_40)]">{opt.text}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-[oklch(0.55_0.03_40)] text-center">Press 1-{question.options.length} on your keyboard to select</p>
    </div>
  );
}

/*
 * Assessments Page — Sacred Fire Intimacy
 * 8 assessments with on-screen results + PDF export
 * No data stored — everything client-side only
 */
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";

interface Question {
  text: string;
  options: { label: string; value: number }[];
}

interface Assessment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  questions: Question[];
  ranges: { min: number; max: number; label: string; description: string }[];
}

const SCALE_OPTIONS = [
  { label: "Strongly Disagree", value: 1 },
  { label: "Disagree", value: 2 },
  { label: "Neutral", value: 3 },
  { label: "Agree", value: 4 },
  { label: "Strongly Agree", value: 5 },
];

const ASSESSMENTS: Assessment[] = [
  {
    id: "embodiment-awareness",
    title: "Body Awareness & Embodiment",
    subtitle: "How present are you in your physical experience?",
    description: "This assessment measures your capacity to stay connected to bodily sensations, breath, and physical presence during daily life and intimate moments.",
    questions: [
      { text: "I can feel subtle sensations in my body when I pause and pay attention.", options: SCALE_OPTIONS },
      { text: "During physical touch, I stay present rather than drifting into thought.", options: SCALE_OPTIONS },
      { text: "I notice when my breathing becomes shallow or restricted.", options: SCALE_OPTIONS },
      { text: "I can identify where emotions live in my body (e.g., tension in the chest, warmth in the belly).", options: SCALE_OPTIONS },
      { text: "I feel comfortable being still and silent in my body without needing distraction.", options: SCALE_OPTIONS },
      { text: "I can distinguish between physical hunger, emotional hunger, and sexual desire.", options: SCALE_OPTIONS },
      { text: "When I exercise or move, I feel connected to the experience rather than just pushing through it.", options: SCALE_OPTIONS },
      { text: "I trust my body's signals about what feels safe and what does not.", options: SCALE_OPTIONS },
      { text: "I can relax my pelvic floor and jaw intentionally when I notice I am holding tension.", options: SCALE_OPTIONS },
      { text: "I feel at home in my body most of the time.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Developing Awareness", description: "Your body awareness is still emerging. This is not a deficit — it is a starting point. Many people spend decades disconnected from physical sensation. Begin with simple practices: 5 minutes of body scanning each morning, noticing your feet on the ground throughout the day, and paying attention to your breath during transitions." },
      { min: 21, max: 30, label: "Growing Connection", description: "You have moments of real embodiment, but they are not yet consistent. The gap between knowing you should be present and actually being present is where the work lives. Breathwork and somatic meditation will help bridge this gap." },
      { min: 31, max: 40, label: "Grounded Presence", description: "You have a solid foundation of body awareness. You can access sensation, stay present during touch, and read your body's signals with reasonable accuracy. The next edge is bringing this presence into high-activation states — conflict, arousal, vulnerability." },
      { min: 41, max: 50, label: "Deep Embodiment", description: "Your body is a reliable instrument of perception. You live in your skin rather than just your head. This level of embodiment allows you to access states of consciousness that most people only read about. Continue refining through partner practices and advanced breathwork." },
    ],
  },
  {
    id: "emotional-intimacy",
    title: "Emotional Intimacy Capacity",
    subtitle: "How deeply can you connect emotionally with a partner?",
    description: "This assessment explores your ability to be emotionally vulnerable, receive your partner's emotions, and maintain connection during difficult conversations.",
    questions: [
      { text: "I can share vulnerable feelings with my partner without shutting down.", options: SCALE_OPTIONS },
      { text: "When my partner is upset, I can stay present without trying to fix it immediately.", options: SCALE_OPTIONS },
      { text: "I can name what I am feeling in real time during a conversation.", options: SCALE_OPTIONS },
      { text: "I feel safe enough to cry in front of my partner.", options: SCALE_OPTIONS },
      { text: "I can hear criticism from my partner without becoming defensive.", options: SCALE_OPTIONS },
      { text: "I initiate conversations about our relationship without waiting for a crisis.", options: SCALE_OPTIONS },
      { text: "I can hold space for my partner's pain without taking it personally.", options: SCALE_OPTIONS },
      { text: "I express appreciation and gratitude to my partner regularly.", options: SCALE_OPTIONS },
      { text: "I can sit with uncomfortable silence between us without filling it.", options: SCALE_OPTIONS },
      { text: "I feel emotionally seen and known by my partner.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Guarded", description: "Emotional intimacy feels risky to you right now. This often traces back to early experiences where vulnerability was not safe. The path forward is not forcing openness — it is building safety, one small disclosure at a time." },
      { min: 21, max: 30, label: "Selectively Open", description: "You can be emotionally intimate in certain conditions — when you feel safe, when the stakes are low, when your partner goes first. The growth edge is learning to lead with vulnerability rather than waiting for permission." },
      { min: 31, max: 40, label: "Emotionally Available", description: "You have real capacity for emotional depth. You can give and receive vulnerability with reasonable consistency. The refinement now is in the subtleties — staying present during high-conflict moments and deepening your emotional vocabulary." },
      { min: 41, max: 50, label: "Deeply Connected", description: "Emotional intimacy is a strength. You can navigate the full spectrum of human feeling with your partner — joy, grief, anger, tenderness — without losing yourself or losing them. This is rare and valuable." },
    ],
  },
  {
    id: "desire-alignment",
    title: "Desire & Arousal Alignment",
    subtitle: "How well do you understand and communicate your desires?",
    description: "This assessment examines your relationship with sexual desire — how you experience it, communicate it, and navigate differences with a partner.",
    questions: [
      { text: "I can identify what turns me on without shame or judgment.", options: SCALE_OPTIONS },
      { text: "I can communicate my sexual desires to my partner clearly.", options: SCALE_OPTIONS },
      { text: "I understand the difference between spontaneous and responsive desire.", options: SCALE_OPTIONS },
      { text: "I can say no to sexual activity without guilt.", options: SCALE_OPTIONS },
      { text: "I can receive a no from my partner without feeling rejected.", options: SCALE_OPTIONS },
      { text: "I notice when my desire is driven by genuine arousal versus habit or obligation.", options: SCALE_OPTIONS },
      { text: "I can ask for what I want during sex without feeling selfish.", options: SCALE_OPTIONS },
      { text: "I am curious about my partner's desires even when they differ from mine.", options: SCALE_OPTIONS },
      { text: "I can stay present with arousal without rushing toward orgasm.", options: SCALE_OPTIONS },
      { text: "I feel that my sexual expression reflects who I actually am.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Disconnected from Desire", description: "Your relationship with desire needs attention. This might show up as low libido, difficulty communicating wants, or a sense that sex is something that happens to you rather than something you actively participate in shaping." },
      { min: 21, max: 30, label: "Emerging Clarity", description: "You are beginning to understand your desire patterns but still struggle to communicate them consistently. The work here is building a vocabulary for what you want and practicing using it — first with yourself, then with a partner." },
      { min: 31, max: 40, label: "Clear & Communicative", description: "You have a healthy relationship with your desires. You can name them, share them, and navigate differences with a partner. The next level is exploring the edges of your desire map — the places you have not yet ventured." },
      { min: 41, max: 50, label: "Fully Expressed", description: "Your desire is a source of vitality and connection. You can communicate with precision, receive your partner's desires with curiosity, and navigate the full complexity of erotic life with grace." },
    ],
  },
  {
    id: "nervous-system-regulation",
    title: "Nervous System Regulation",
    subtitle: "How well can you regulate your activation during intimacy?",
    description: "This assessment measures your capacity to manage your nervous system state — moving between activation and calm, staying in your window of tolerance during vulnerable moments.",
    questions: [
      { text: "I can calm myself down when I feel overwhelmed during an argument.", options: SCALE_OPTIONS },
      { text: "I notice when my body shifts into fight-or-flight mode.", options: SCALE_OPTIONS },
      { text: "I have practices that help me return to calm (breathing, movement, etc.).", options: SCALE_OPTIONS },
      { text: "I can tolerate high levels of pleasure without shutting down or dissociating.", options: SCALE_OPTIONS },
      { text: "I can stay present during intense eye contact with a partner.", options: SCALE_OPTIONS },
      { text: "I recover from emotional activation within a reasonable timeframe.", options: SCALE_OPTIONS },
      { text: "I can tell the difference between excitement and anxiety in my body.", options: SCALE_OPTIONS },
      { text: "I do not numb out or freeze during vulnerable intimate moments.", options: SCALE_OPTIONS },
      { text: "I can co-regulate with my partner — their calm helps me calm down.", options: SCALE_OPTIONS },
      { text: "I feel generally safe in my body during sexual experiences.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Dysregulated", description: "Your nervous system runs the show more than you would like. This is not weakness — it is biology. Trauma, chronic stress, and early attachment patterns wire the nervous system for protection. Somatic therapy and consistent breathwork practice are the most direct paths to rewiring." },
      { min: 21, max: 30, label: "Building Capacity", description: "You have some regulation tools but they are not yet reliable under pressure. The gap between knowing what to do and being able to do it in the moment is where nervous system training lives. Daily practice — even 5 minutes — builds the neural pathways." },
      { min: 31, max: 40, label: "Regulated", description: "You can manage your activation in most situations. You have tools, you use them, and you recover reasonably well. The growth edge is expanding your window of tolerance — being able to stay present with more intensity, more vulnerability, more pleasure." },
      { min: 41, max: 50, label: "Deeply Regulated", description: "Your nervous system is a well-tuned instrument. You can ride waves of activation without losing yourself, stay present in high-intensity moments, and help regulate your partner through co-regulation. This is the foundation of advanced intimacy practices." },
    ],
  },
  {
    id: "sacred-sexuality-readiness",
    title: "Sacred Sexuality Readiness",
    subtitle: "Are you ready to explore the spiritual dimension of sex?",
    description: "This assessment evaluates your readiness to integrate spiritual awareness with sexual experience — not as a concept, but as a lived practice.",
    questions: [
      { text: "I believe sexuality can be a path to spiritual growth.", options: SCALE_OPTIONS },
      { text: "I have experienced moments during sex that felt transcendent or deeply meaningful.", options: SCALE_OPTIONS },
      { text: "I am willing to slow down during sex to deepen the experience.", options: SCALE_OPTIONS },
      { text: "I can bring meditative awareness into physical intimacy.", options: SCALE_OPTIONS },
      { text: "I am interested in exploring energy practices (breathwork, visualization) during sex.", options: SCALE_OPTIONS },
      { text: "I can be fully present with my partner without performance anxiety.", options: SCALE_OPTIONS },
      { text: "I see my body as sacred rather than as an object.", options: SCALE_OPTIONS },
      { text: "I am open to sexual experiences that do not follow a goal-oriented script.", options: SCALE_OPTIONS },
      { text: "I can hold reverence and raw desire simultaneously.", options: SCALE_OPTIONS },
      { text: "I feel that my spiritual life and my sexual life are connected.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Curious Beginner", description: "The idea of sacred sexuality intrigues you but feels abstract. Start with the basics: slow down, breathe together, make eye contact. The sacred is not something you add to sex — it is what emerges when you remove the rush." },
      { min: 21, max: 30, label: "Opening", description: "You have glimpsed the connection between sexuality and something larger. These moments are real — not imagination. The practice now is creating conditions where they can happen more reliably: intention-setting, breathwork, and presence." },
      { min: 31, max: 40, label: "Integrating", description: "Sacred sexuality is becoming a lived experience, not just a concept. You can access transcendent states with some consistency and you understand that the body is the temple, not an obstacle to transcendence." },
      { min: 41, max: 50, label: "Embodied Practitioner", description: "You have integrated the spiritual and sexual dimensions of your being. Sex is a practice, a prayer, and a portal. You understand that the deepest intimacy requires the deepest presence — and you show up for it." },
    ],
  },
  {
    id: "communication-patterns",
    title: "Intimate Communication Patterns",
    subtitle: "How effectively do you communicate about sex and intimacy?",
    description: "This assessment examines your communication habits around the most vulnerable topics — desire, boundaries, pleasure, and disappointment.",
    questions: [
      { text: "I can talk about sex with my partner outside of the bedroom.", options: SCALE_OPTIONS },
      { text: "I give specific feedback during intimate moments rather than staying silent.", options: SCALE_OPTIONS },
      { text: "I can express disappointment about a sexual experience without blaming my partner.", options: SCALE_OPTIONS },
      { text: "I ask my partner about their experience and listen without defensiveness.", options: SCALE_OPTIONS },
      { text: "I can set a boundary during sex without feeling like I am ruining the moment.", options: SCALE_OPTIONS },
      { text: "I use repair language after a misunderstanding or disconnection.", options: SCALE_OPTIONS },
      { text: "I can talk about fantasies without shame.", options: SCALE_OPTIONS },
      { text: "I check in with my partner during new experiences.", options: SCALE_OPTIONS },
      { text: "I can receive feedback about my technique without shutting down.", options: SCALE_OPTIONS },
      { text: "I feel that my partner and I have a shared language for our intimate life.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Silent", description: "Communication about intimacy is your biggest growth area. The silence is not serving you — it is creating distance. Start small: one honest sentence per week about what you want or how you feel. Build from there." },
      { min: 21, max: 30, label: "Hesitant", description: "You communicate about intimacy sometimes, but inconsistently. You might open up after a glass of wine or during a crisis, but struggle to make it a regular practice. The goal is making these conversations ordinary, not extraordinary." },
      { min: 31, max: 40, label: "Articulate", description: "You can talk about sex and intimacy with reasonable skill. You give feedback, set boundaries, and initiate conversations. The refinement is in timing, tone, and learning to communicate during high-activation moments." },
      { min: 41, max: 50, label: "Fluent", description: "Intimate communication is a strength. You and your partner have built a shared vocabulary for desire, boundaries, and connection. This fluency is the foundation of a continuously evolving intimate life." },
    ],
  },
  {
    id: "trauma-awareness",
    title: "Trauma-Informed Intimacy Awareness",
    subtitle: "How well do you navigate the intersection of past wounds and present intimacy?",
    description: "This assessment explores your awareness of how past experiences — including trauma — shape your intimate life, and your capacity to work with these patterns consciously.",
    questions: [
      { text: "I can recognize when a past experience is being triggered during intimacy.", options: SCALE_OPTIONS },
      { text: "I have compassion for my own trauma responses rather than judging them.", options: SCALE_OPTIONS },
      { text: "I can communicate to my partner when I am triggered without blaming them.", options: SCALE_OPTIONS },
      { text: "I understand that healing is not linear and I am patient with my process.", options: SCALE_OPTIONS },
      { text: "I can distinguish between a present-moment threat and a trauma memory.", options: SCALE_OPTIONS },
      { text: "I have sought professional support for processing past wounds.", options: SCALE_OPTIONS },
      { text: "I can hold my partner's trauma responses with compassion.", options: SCALE_OPTIONS },
      { text: "I do not use sex to avoid processing difficult emotions.", options: SCALE_OPTIONS },
      { text: "I can pause during intimacy when something does not feel right without shame.", options: SCALE_OPTIONS },
      { text: "I believe that intimacy can be part of my healing, not just a trigger.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Beginning to See", description: "You are starting to recognize the connection between past experiences and present intimacy patterns. This awareness itself is the first step. Consider working with a trauma-informed therapist who understands the intersection of sexuality and healing." },
      { min: 21, max: 30, label: "Developing Awareness", description: "You can identify some of your patterns and triggers, but they still catch you off guard. The work is building a larger window between trigger and response — enough space to choose rather than react." },
      { min: 31, max: 40, label: "Trauma-Informed", description: "You navigate the intersection of past wounds and present intimacy with growing skill. You can name your triggers, communicate them, and work with them rather than against them. This is mature, courageous work." },
      { min: 41, max: 50, label: "Integrated Healer", description: "You have done significant healing work and it shows in your intimate life. You can hold complexity — your own wounds and your partner's — with compassion and wisdom. Intimacy has become part of your healing path." },
    ],
  },
  {
    id: "energetic-sensitivity",
    title: "Energetic & Subtle Body Sensitivity",
    subtitle: "How attuned are you to the energetic dimension of intimacy?",
    description: "This assessment measures your sensitivity to the subtle energetic exchanges that happen during intimacy — beyond the purely physical.",
    questions: [
      { text: "I can feel energy moving in my body during breathwork or meditation.", options: SCALE_OPTIONS },
      { text: "I notice energetic shifts when I am near someone I am attracted to.", options: SCALE_OPTIONS },
      { text: "I can feel the difference between my energy and my partner's energy.", options: SCALE_OPTIONS },
      { text: "I have experienced tingling, warmth, or waves of sensation during non-physical connection.", options: SCALE_OPTIONS },
      { text: "I can direct my attention to specific areas of my body and feel a response.", options: SCALE_OPTIONS },
      { text: "I am sensitive to the energy of spaces and environments.", options: SCALE_OPTIONS },
      { text: "I have experienced energy moving between my body and my partner's during intimacy.", options: SCALE_OPTIONS },
      { text: "I can use breath to amplify or move energy in my body.", options: SCALE_OPTIONS },
      { text: "I trust my energetic perceptions even when they cannot be explained rationally.", options: SCALE_OPTIONS },
      { text: "I feel that working with energy enhances my intimate experiences.", options: SCALE_OPTIONS },
    ],
    ranges: [
      { min: 10, max: 20, label: "Physically Oriented", description: "Your experience of intimacy is primarily physical. There is nothing wrong with this — but there is a dimension of experience available to you that you have not yet accessed. Start with breathwork: it is the most reliable bridge between the physical and the energetic." },
      { min: 21, max: 30, label: "Sensing", description: "You have moments of energetic awareness — fleeting sensations, intuitive knowing, subtle shifts you cannot quite explain. These are real perceptions, not imagination. The practice is learning to trust them and amplify them through consistent breathwork and meditation." },
      { min: 31, max: 40, label: "Energetically Aware", description: "You can reliably access the energetic dimension of intimacy. You feel energy move, you can work with it intentionally, and you understand that the body is more than meat and bone. Advanced tantric practices will deepen this capacity significantly." },
      { min: 41, max: 50, label: "Energetically Fluent", description: "The subtle body is as real to you as the physical body. You can feel, direct, and exchange energy with skill and sensitivity. This is the foundation of the deepest tantric practices — where physical and energetic merge into something that transcends both." },
    ],
  },
];

function generatePDF(assessment: Assessment, answers: number[], score: number, result: typeof ASSESSMENTS[0]["ranges"][0]) {
  const content = `
SACRED FIRE INTIMACY — ASSESSMENT RESULTS
==========================================

Assessment: ${assessment.title}
Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
Score: ${score} / ${assessment.questions.length * 5}

Result: ${result.label}

${result.description}

---

YOUR RESPONSES:

${assessment.questions.map((q, i) => `${i + 1}. ${q.text}\n   Answer: ${answers[i]} / 5`).join("\n\n")}

---

This assessment is for educational purposes only and does not constitute
medical, psychological, or therapeutic advice. Consult a qualified
healthcare provider for personalized guidance.

© Sacred Fire Intimacy — ConsciousSex.love
  `.trim();

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${assessment.id}-results.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function AssessmentCard({ assessment, onStart }: { assessment: Assessment; onStart: () => void }) {
  return (
    <div className="bg-[oklch(0.97_0.008_80)] border border-[oklch(0.92_0.03_60)] p-6 hover:border-[oklch(0.72_0.16_60)] transition-colors duration-300">
      <h3
        className="text-lg font-bold text-[oklch(0.20_0.04_25)] mb-2"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        {assessment.title}
      </h3>
      <p className="text-sm text-[oklch(0.50_0.04_35)] italic mb-3">{assessment.subtitle}</p>
      <p className="text-sm text-[oklch(0.38_0.04_35)] leading-relaxed mb-4">{assessment.description}</p>
      <p className="text-xs text-[oklch(0.55_0.04_35)] mb-4">{assessment.questions.length} questions · ~5 minutes</p>
      <button
        onClick={onStart}
        className="bg-[oklch(0.55_0.18_25)] text-white px-5 py-2 text-sm font-medium hover:bg-[oklch(0.45_0.15_20)] transition-colors duration-200"
      >
        Begin Assessment
      </button>
    </div>
  );
}

function AssessmentRunner({ assessment, onBack }: { assessment: Assessment; onBack: () => void }) {
  const [answers, setAnswers] = useState<number[]>(new Array(assessment.questions.length).fill(0));
  const [currentQ, setCurrentQ] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const score = answers.reduce((sum, a) => sum + a, 0);
  const result = assessment.ranges.find(r => score >= r.min && score <= r.max) || assessment.ranges[assessment.ranges.length - 1];
  const progress = ((currentQ + 1) / assessment.questions.length) * 100;
  const allAnswered = answers.every(a => a > 0);

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);
    if (currentQ < assessment.questions.length - 1) {
      setTimeout(() => setCurrentQ(currentQ + 1), 200);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  if (showResults) {
    const pct = Math.round((score / (assessment.questions.length * 5)) * 100);
    return (
      <div ref={resultsRef} className="max-w-2xl mx-auto">
        <h2
          className="text-2xl font-bold text-[oklch(0.20_0.04_25)] mb-2"
          style={{ fontFamily: "'Bodoni Moda', serif" }}
        >
          Your Results: {assessment.title}
        </h2>

        <div className="bg-[oklch(0.97_0.008_80)] border border-[oklch(0.92_0.03_60)] p-8 mt-6 mb-6">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-[oklch(0.55_0.18_25)] mb-2" style={{ fontFamily: "'Bodoni Moda', serif" }}>
              {score}/{assessment.questions.length * 5}
            </div>
            <div className="text-sm text-[oklch(0.50_0.04_35)]">{pct}%</div>
          </div>

          <div className="w-full bg-[oklch(0.90_0.03_60)] h-2 mb-6">
            <div
              className="h-2 bg-gradient-to-r from-[oklch(0.72_0.16_60)] to-[oklch(0.55_0.18_25)] transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>

          <h3 className="text-xl font-bold text-[oklch(0.25_0.04_25)] mb-3" style={{ fontFamily: "'Bodoni Moda', serif" }}>
            {result.label}
          </h3>
          <p className="text-sm text-[oklch(0.35_0.04_35)] leading-relaxed">{result.description}</p>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => generatePDF(assessment, answers, score, result)}
            className="bg-[oklch(0.55_0.18_25)] text-white px-5 py-2 text-sm font-medium hover:bg-[oklch(0.45_0.15_20)] transition-colors"
          >
            Download Results
          </button>
          <button
            onClick={onBack}
            className="border border-[oklch(0.80_0.03_60)] text-[oklch(0.35_0.04_35)] px-5 py-2 text-sm font-medium hover:bg-[oklch(0.96_0.01_80)] transition-colors"
          >
            Back to All Assessments
          </button>
        </div>

        <p className="text-xs text-[oklch(0.55_0.04_35)] mt-8 italic">
          This assessment is for educational purposes only and does not constitute medical, psychological, or therapeutic advice.
          Consult a qualified healthcare provider for personalized guidance.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={onBack}
        className="text-sm text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)] mb-6 inline-block"
      >
        ← Back to all assessments
      </button>

      <h2
        className="text-2xl font-bold text-[oklch(0.20_0.04_25)] mb-2"
        style={{ fontFamily: "'Bodoni Moda', serif" }}
      >
        {assessment.title}
      </h2>
      <p className="text-sm text-[oklch(0.50_0.04_35)] mb-6">{assessment.subtitle}</p>

      {/* Progress bar */}
      <div className="w-full bg-[oklch(0.92_0.03_60)] h-1 mb-8">
        <div
          className="h-1 bg-[oklch(0.55_0.18_25)] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="text-xs text-[oklch(0.55_0.04_35)] mb-4">
        Question {currentQ + 1} of {assessment.questions.length}
      </div>

      <p className="text-base text-[oklch(0.25_0.04_25)] font-medium mb-6 leading-relaxed">
        {assessment.questions[currentQ].text}
      </p>

      <div className="space-y-2 mb-8">
        {SCALE_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleAnswer(opt.value)}
            className={`w-full text-left px-4 py-3 text-sm border transition-all duration-200 ${
              answers[currentQ] === opt.value
                ? "border-[oklch(0.55_0.18_25)] bg-[oklch(0.96_0.03_25)] text-[oklch(0.25_0.04_25)]"
                : "border-[oklch(0.92_0.03_60)] text-[oklch(0.40_0.04_35)] hover:border-[oklch(0.72_0.16_60)]"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
          disabled={currentQ === 0}
          className="text-sm text-[oklch(0.55_0.04_35)] hover:text-[oklch(0.35_0.04_35)] disabled:opacity-30"
        >
          ← Previous
        </button>

        {currentQ < assessment.questions.length - 1 ? (
          <button
            onClick={() => setCurrentQ(currentQ + 1)}
            className="text-sm text-[oklch(0.55_0.18_25)] hover:text-[oklch(0.35_0.12_15)]"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="bg-[oklch(0.55_0.18_25)] text-white px-5 py-2 text-sm font-medium hover:bg-[oklch(0.45_0.15_20)] disabled:opacity-40 transition-colors"
          >
            See Results
          </button>
        )}
      </div>

      {/* Question dots */}
      <div className="flex gap-1 mt-8 flex-wrap">
        {assessment.questions.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentQ(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === currentQ
                ? "bg-[oklch(0.55_0.18_25)]"
                : answers[i] > 0
                ? "bg-[oklch(0.72_0.16_60)]"
                : "bg-[oklch(0.90_0.03_60)]"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function AssessmentsPage() {
  const [activeAssessment, setActiveAssessment] = useState<Assessment | null>(null);

  useEffect(() => {
    document.title = "Self-Assessments | Sacred Fire Intimacy";
  }, []);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-6 md:px-8">
        {activeAssessment ? (
          <AssessmentRunner
            assessment={activeAssessment}
            onBack={() => setActiveAssessment(null)}
          />
        ) : (
          <>
            <h1
              className="text-3xl md:text-4xl font-bold text-[oklch(0.18_0.04_25)] mb-4"
              style={{ fontFamily: "'Bodoni Moda', serif" }}
            >
              Self-Assessments
            </h1>
            <p className="text-base text-[oklch(0.35_0.04_35)] leading-relaxed mb-4">
              These assessments are designed to help you understand where you are in your journey toward conscious intimacy. They are not diagnostic tools — they are mirrors. Answer honestly, and let the results show you where your edges are.
            </p>
            <p className="text-sm text-[oklch(0.55_0.04_35)] italic mb-12">
              Nothing is stored. Your answers stay in your browser and disappear when you leave. Download your results if you want to keep them.
            </p>

            <div className="space-y-6">
              {ASSESSMENTS.map((assessment) => (
                <AssessmentCard
                  key={assessment.id}
                  assessment={assessment}
                  onStart={() => setActiveAssessment(assessment)}
                />
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-[oklch(0.90_0.03_60)]">
              <p className="text-xs text-[oklch(0.55_0.04_35)]">
                These assessments are for educational purposes only and do not constitute medical, psychological, or therapeutic advice.
                Consult a qualified healthcare provider for personalized guidance.
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

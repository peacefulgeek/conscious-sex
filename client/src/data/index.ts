import rawArticles from './articles-index.json';

export interface ArticleMeta {
  id: number;
  title: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  dateISO: string;
  dateHuman: string;
  isLive: boolean;
  metaDescription: string;
  metaKeywords: string;
  readingTime: number;
  openerType: string;
  conclusionType: string;
  backlinkType: string;
  namedReference: string;
  heroImage: string;
  ogImage: string;
  ogDescription: string;
  faqCount: number;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
  faqHtml: string;
}

// All article metadata (no content — lightweight)
export const allArticles: ArticleMeta[] = rawArticles as ArticleMeta[];

export function filterPublished(): ArticleMeta[] {
  const now = new Date();
  return allArticles.filter(a => new Date(a.dateISO) <= now);
}

export function getArticleMetaBySlug(slug: string): ArticleMeta | undefined {
  return allArticles.find(a => a.slug === slug);
}

// Legacy compat — returns meta only (for listings)
export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return getArticleMetaBySlug(slug);
}

export function getArticlesByCategory(categorySlug: string): ArticleMeta[] {
  return filterPublished().filter(a => a.categorySlug === categorySlug);
}

export function getRecentArticles(count: number = 10): ArticleMeta[] {
  return filterPublished()
    .sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime())
    .slice(0, count);
}

export function getRelatedArticles(article: ArticleMeta, count: number = 4): ArticleMeta[] {
  const published = filterPublished().filter(a => a.slug !== article.slug);
  const sameCategory = published.filter(a => a.categorySlug === article.categorySlug);
  const others = published.filter(a => a.categorySlug !== article.categorySlug);
  return [...sameCategory, ...others].slice(0, count);
}

export function searchArticles(query: string): ArticleMeta[] {
  const q = query.toLowerCase();
  return filterPublished().filter(a =>
    a.title.toLowerCase().includes(q) ||
    a.metaDescription.toLowerCase().includes(q) ||
    a.metaKeywords.toLowerCase().includes(q)
  );
}

// Lazy load article content
export async function loadArticleContent(slug: string): Promise<{ contentHtml: string; faqHtml: string } | null> {
  try {
    const resp = await fetch(`/articles/${slug}.json`);
    if (!resp.ok) return null;
    return await resp.json();
  } catch {
    return null;
  }
}

export const CATEGORIES = [
  { slug: "the-body-temple", name: "The Body Temple", description: "The body as sacred ground — sensation, breath, somatic awareness, and the intelligence of physical desire." },
  { slug: "the-connection", name: "The Connection", description: "The space between two people — presence, vulnerability, trust, and the architecture of conscious partnership." },
  { slug: "the-healing", name: "The Healing", description: "Sexual trauma, shame, grief, and the long road back to the body — healing as spiritual practice." },
  { slug: "the-energy", name: "The Energy", description: "Kundalini, tantra, chakras, and the subtle body — sexual energy as creative and spiritual force." },
  { slug: "the-practice", name: "The Practice", description: "Daily rituals, breathwork, meditation, and embodied practices for conscious lovers." },
];

export const SITE_CONFIG = {
  title: "Sacred Fire Intimacy",
  subtitle: "Conscious Sexuality Through Ancient Wisdom",
  tagline: "Your body is a temple. Act like it — together.",
  editorialName: "Sacred Fire Editorial",
  authorName: "Krishna",
  authorTitle: "Mystic & Spiritual Advisor",
  authorBio: "Krishna is a mystic, spiritual advisor, and guide who has spent three decades exploring the intersection of sacred sexuality, Advaita Vedanta, and somatic embodiment. His work bridges ancient wisdom with lived experience.",
  authorLink: "https://shrikrishna.com",
  disclaimer: "This site provides educational content about conscious intimacy and sacred sexuality. It is not therapy. For sexual trauma, consult a licensed somatic or sex therapist.",
  bunnyCdnBase: "https://conscious-sexuality.b-cdn.net",
  bunnyStorageZone: "conscious-sexuality",
  bunnyStorageHost: "ny.storage.bunnycdn.com",
  bunnyStoragePassword: "b2a80662-8b74-4792-8274d3c20d57-edf7-4de9",
};

// Quiz data
export interface QuizQuestion {
  id: number;
  text: string;
  options: { text: string; scores: Record<string, number> }[];
}

export interface QuizResult {
  id: string;
  title: string;
  description: string;
  recommendations: string[];
}

export interface Quiz {
  id: string;
  slug: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  results: QuizResult[];
  category: string;
}

export const quizzes: Quiz[] = [
  {
    id: "intimacy-style",
    slug: "intimacy-style",
    title: "What Is Your Intimacy Style?",
    description: "Discover how you naturally approach physical and emotional closeness in partnership.",
    category: "the-connection",
    questions: [
      { id: 1, text: "When your partner reaches for you unexpectedly, your first response is:", options: [
        { text: "I lean in — physical contact grounds me", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 1 } },
        { text: "I notice tension before I can relax into it", scores: { sensory: 0, avoidant: 3, cerebral: 1, devotional: 0 } },
        { text: "I think about what it means before I feel it", scores: { sensory: 0, avoidant: 1, cerebral: 3, devotional: 0 } },
        { text: "I feel a wave of tenderness that almost overwhelms me", scores: { sensory: 1, avoidant: 0, cerebral: 0, devotional: 3 } },
      ]},
      { id: 2, text: "During intimate moments, you are most aware of:", options: [
        { text: "Every sensation — temperature, texture, pressure", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 1 } },
        { text: "Whether you're doing this right", scores: { sensory: 0, avoidant: 2, cerebral: 2, devotional: 0 } },
        { text: "The emotional current between you", scores: { sensory: 0, avoidant: 0, cerebral: 1, devotional: 3 } },
        { text: "An urge to pull away or go numb", scores: { sensory: 0, avoidant: 3, cerebral: 1, devotional: 0 } },
      ]},
      { id: 3, text: "After sex, you most want to:", options: [
        { text: "Stay in physical contact — skin to skin", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 2 } },
        { text: "Have some space to process what happened", scores: { sensory: 0, avoidant: 3, cerebral: 1, devotional: 0 } },
        { text: "Talk about the experience", scores: { sensory: 0, avoidant: 0, cerebral: 3, devotional: 1 } },
        { text: "Hold each other in silence", scores: { sensory: 1, avoidant: 0, cerebral: 0, devotional: 3 } },
      ]},
      { id: 4, text: "The word that best describes your relationship to desire is:", options: [
        { text: "Hunger", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 1 } },
        { text: "Complicated", scores: { sensory: 0, avoidant: 3, cerebral: 1, devotional: 0 } },
        { text: "Fascinating", scores: { sensory: 0, avoidant: 0, cerebral: 3, devotional: 1 } },
        { text: "Prayer", scores: { sensory: 0, avoidant: 0, cerebral: 0, devotional: 3 } },
      ]},
      { id: 5, text: "When conflict arises in your relationship, your body:", options: [
        { text: "Gets activated — I feel it physically", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 1 } },
        { text: "Shuts down — I go quiet and still", scores: { sensory: 0, avoidant: 3, cerebral: 0, devotional: 0 } },
        { text: "Stays relatively neutral — I process mentally", scores: { sensory: 0, avoidant: 0, cerebral: 3, devotional: 0 } },
        { text: "Aches — conflict feels like a wound", scores: { sensory: 0, avoidant: 1, cerebral: 0, devotional: 3 } },
      ]},
      { id: 6, text: "Your deepest fear in intimacy is:", options: [
        { text: "Losing the intensity", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 0 } },
        { text: "Being consumed or losing yourself", scores: { sensory: 0, avoidant: 3, cerebral: 0, devotional: 0 } },
        { text: "Being misunderstood", scores: { sensory: 0, avoidant: 0, cerebral: 3, devotional: 0 } },
        { text: "Not being enough", scores: { sensory: 0, avoidant: 0, cerebral: 0, devotional: 3 } },
      ]},
      { id: 7, text: "You feel most connected to your partner when:", options: [
        { text: "Our bodies are in sync", scores: { sensory: 3, avoidant: 0, cerebral: 0, devotional: 1 } },
        { text: "They give me space and I choose to return", scores: { sensory: 0, avoidant: 3, cerebral: 0, devotional: 0 } },
        { text: "We have a deep conversation", scores: { sensory: 0, avoidant: 0, cerebral: 3, devotional: 1 } },
        { text: "I see them truly see me", scores: { sensory: 0, avoidant: 0, cerebral: 0, devotional: 3 } },
      ]},
    ],
    results: [
      { id: "sensory", title: "The Sensory Lover", description: "You live in your body. Touch is your first language, and physical sensation is how you make sense of connection. Your gift is presence through the body — you don't need words to communicate what matters. Your edge is learning that not everyone processes love through skin.", recommendations: ["the-art-of-slow-touch", "sensation-mapping-for-deeper-connection", "the-practice-of-full-body-listening"] },
      { id: "avoidant", title: "The Sovereign Lover", description: "You need space to feel safe, and that's not a flaw — it's architecture. Your nervous system learned early that closeness can be dangerous. Your gift is self-knowledge. Your edge is learning to stay when every cell says run.", recommendations: ["why-your-body-freezes-during-intimacy", "the-dance-of-autonomy-and-togetherness", "when-connection-feels-terrifying"] },
      { id: "cerebral", title: "The Contemplative Lover", description: "You understand intimacy through the mind first. You think about connection, analyze patterns, seek meaning. Your gift is insight — you see what others miss. Your edge is dropping from head to heart to belly.", recommendations: ["the-practice-of-embodied-presence", "healing-the-disconnect-between-mind-and-body", "the-difference-between-passion-and-presence"] },
      { id: "devotional", title: "The Devotional Lover", description: "For you, intimacy is worship. Every touch is an offering, every gaze a prayer. Your gift is the capacity for profound tenderness. Your edge is learning that devotion without boundaries becomes self-abandonment.", recommendations: ["transmutation-of-desire-into-devotion", "the-practice-of-devotional-attention", "codependency-vs-sacred-interdependence"] },
    ],
  },
  {
    id: "sexual-presence",
    slug: "sexual-presence",
    title: "How Present Are You During Sex?",
    description: "An honest assessment of where your attention actually goes during intimate moments.",
    category: "the-body-temple",
    questions: [
      { id: 1, text: "During sex, how often are you thinking about something other than what's happening?", options: [
        { text: "Rarely — I'm fully absorbed in sensation", scores: { present: 3, performer: 0, dissociated: 0, anxious: 0 } },
        { text: "Sometimes — I drift to how I look or sound", scores: { present: 0, performer: 3, dissociated: 0, anxious: 0 } },
        { text: "Often — my mind goes somewhere else entirely", scores: { present: 0, performer: 0, dissociated: 3, anxious: 0 } },
        { text: "Constantly — I'm monitoring everything", scores: { present: 0, performer: 0, dissociated: 0, anxious: 3 } },
      ]},
      { id: 2, text: "When you close your eyes during intimacy:", options: [
        { text: "I drop deeper into sensation", scores: { present: 3, performer: 0, dissociated: 0, anxious: 0 } },
        { text: "I start visualizing something to stay aroused", scores: { present: 0, performer: 3, dissociated: 0, anxious: 0 } },
        { text: "I feel disconnected or floaty", scores: { present: 0, performer: 0, dissociated: 3, anxious: 0 } },
        { text: "I feel more anxious without visual control", scores: { present: 0, performer: 0, dissociated: 0, anxious: 3 } },
      ]},
      { id: 3, text: "Your breath during sex:", options: [
        { text: "Moves freely — deep, audible, connected", scores: { present: 3, performer: 0, dissociated: 0, anxious: 0 } },
        { text: "Is controlled to sound right", scores: { present: 0, performer: 3, dissociated: 0, anxious: 0 } },
        { text: "Is shallow or held without me noticing", scores: { present: 0, performer: 0, dissociated: 3, anxious: 0 } },
        { text: "Speeds up with worry", scores: { present: 0, performer: 0, dissociated: 0, anxious: 3 } },
      ]},
      { id: 4, text: "After orgasm, you typically:", options: [
        { text: "Feel waves of sensation and emotion", scores: { present: 3, performer: 0, dissociated: 0, anxious: 0 } },
        { text: "Wonder if your partner enjoyed it", scores: { present: 0, performer: 3, dissociated: 0, anxious: 1 } },
        { text: "Feel suddenly empty or sad", scores: { present: 0, performer: 0, dissociated: 3, anxious: 0 } },
        { text: "Feel relief that it's over", scores: { present: 0, performer: 0, dissociated: 0, anxious: 3 } },
      ]},
      { id: 5, text: "If your partner paused mid-sex and asked 'where are you right now?':", options: [
        { text: "I'd say 'right here' and mean it", scores: { present: 3, performer: 0, dissociated: 0, anxious: 0 } },
        { text: "I'd feel exposed — like being caught", scores: { present: 0, performer: 3, dissociated: 0, anxious: 0 } },
        { text: "I'd realize I was somewhere else", scores: { present: 0, performer: 0, dissociated: 3, anxious: 0 } },
        { text: "I'd panic about what I did wrong", scores: { present: 0, performer: 0, dissociated: 0, anxious: 3 } },
      ]},
    ],
    results: [
      { id: "present", title: "The Embodied Lover", description: "You're genuinely present during sex. Your body and mind are in the same place. This is rare and valuable. Your practice is deepening — not fixing.", recommendations: ["the-practice-of-full-body-listening", "the-art-of-slow-touch", "the-practice-of-maithuna"] },
      { id: "performer", title: "The Performing Lover", description: "You're watching yourself have sex more than you're having it. The audience in your head is louder than the person in your bed. The fix isn't technique — it's permission to stop performing.", recommendations: ["the-sacred-act-of-being-naked", "the-difference-between-passion-and-presence", "when-sex-becomes-performance"] },
      { id: "dissociated", title: "The Absent Lover", description: "Your body is present but you're not. This isn't a character flaw — it's a nervous system response, often rooted in past experience. The path back to your body is gentle and gradual.", recommendations: ["why-your-body-freezes-during-intimacy", "somatic-therapy-for-sexual-healing", "the-practice-of-embodied-presence"] },
      { id: "anxious", title: "The Vigilant Lover", description: "Your nervous system is in monitoring mode during sex. You're scanning for danger, reading signals, managing outcomes. The work is learning to feel safe enough to let go.", recommendations: ["when-connection-feels-terrifying", "the-nervous-system-and-sexual-response", "building-a-home-practice-for-sacred-sexuality"] },
    ],
  },
  {
    id: "desire-language",
    slug: "desire-language",
    title: "What Is Your Desire Language?",
    description: "How you experience, express, and receive desire in intimate relationship.",
    category: "the-connection",
    questions: [
      { id: 1, text: "You feel most desired when:", options: [
        { text: "Someone touches me with full attention", scores: { touch: 3, words: 0, energy: 0, devotion: 0 } },
        { text: "Someone tells me exactly what they want from me", scores: { touch: 0, words: 3, energy: 0, devotion: 0 } },
        { text: "I feel their energy shift when I enter the room", scores: { touch: 0, words: 0, energy: 3, devotion: 0 } },
        { text: "They make me the center of their world", scores: { touch: 0, words: 0, energy: 0, devotion: 3 } },
      ]},
      { id: 2, text: "Your desire most often arises from:", options: [
        { text: "Physical sensation — a touch, a scent, skin contact", scores: { touch: 3, words: 0, energy: 0, devotion: 0 } },
        { text: "Conversation — intellectual or emotional connection", scores: { touch: 0, words: 3, energy: 0, devotion: 0 } },
        { text: "Energetic charge — something unspoken passes between us", scores: { touch: 0, words: 0, energy: 3, devotion: 0 } },
        { text: "Emotional safety — feeling truly seen and held", scores: { touch: 0, words: 0, energy: 0, devotion: 3 } },
      ]},
      { id: 3, text: "During foreplay, you most want:", options: [
        { text: "Slow, deliberate touch everywhere", scores: { touch: 3, words: 0, energy: 0, devotion: 1 } },
        { text: "To hear what my partner wants to do to me", scores: { touch: 0, words: 3, energy: 0, devotion: 0 } },
        { text: "Eye contact and breath synchronization", scores: { touch: 0, words: 0, energy: 3, devotion: 1 } },
        { text: "To feel completely emotionally safe", scores: { touch: 0, words: 0, energy: 0, devotion: 3 } },
      ]},
      { id: 4, text: "You lose desire when:", options: [
        { text: "Touch becomes mechanical or rushed", scores: { touch: 3, words: 0, energy: 0, devotion: 0 } },
        { text: "There's silence — no verbal connection", scores: { touch: 0, words: 3, energy: 0, devotion: 0 } },
        { text: "The energy feels flat or disconnected", scores: { touch: 0, words: 0, energy: 3, devotion: 0 } },
        { text: "I feel emotionally unsafe or unseen", scores: { touch: 0, words: 0, energy: 0, devotion: 3 } },
      ]},
      { id: 5, text: "Your ideal intimate evening begins with:", options: [
        { text: "A massage or bath together", scores: { touch: 3, words: 0, energy: 0, devotion: 1 } },
        { text: "A deep conversation over dinner", scores: { touch: 0, words: 3, energy: 0, devotion: 1 } },
        { text: "Meditation or breathwork together", scores: { touch: 0, words: 0, energy: 3, devotion: 0 } },
        { text: "A ritual of gratitude and presence", scores: { touch: 0, words: 0, energy: 1, devotion: 3 } },
      ]},
    ],
    results: [
      { id: "touch", title: "The Somatic Desirer", description: "Your desire lives in your skin. Touch is not foreplay for you — it IS the thing. Your body is your primary organ of knowing, and physical sensation is how you connect most deeply.", recommendations: ["the-art-of-slow-touch", "sensation-mapping-for-deeper-connection", "the-practice-of-full-body-listening"] },
      { id: "words", title: "The Verbal Desirer", description: "Words are your aphrodisiac. You need to hear desire spoken, named, claimed. Silence during intimacy feels like absence. Your gift is the ability to articulate what others can only feel.", recommendations: ["the-art-of-asking-for-what-you-want", "the-practice-of-verbal-intimacy", "the-power-of-naming-desire"] },
      { id: "energy", title: "The Energetic Desirer", description: "You feel desire as a field, not a feeling. The charge between bodies, the unspoken current, the shift in the room when attraction is present. You don't need touch to feel connected — you need presence.", recommendations: ["breathwork-for-energetic-intimacy", "the-heart-genital-connection-in-tantra", "the-practice-of-yab-yum"] },
      { id: "devotion", title: "The Devotional Desirer", description: "For you, desire is inseparable from emotional safety. You can't want someone you don't trust. Your desire unfolds slowly, in the warmth of being truly seen. This is not a limitation — it's a superpower.", recommendations: ["transmutation-of-desire-into-devotion", "the-practice-of-devotional-attention", "the-difference-between-passion-and-presence"] },
    ],
  },
  {
    id: "shame-inventory",
    slug: "shame-inventory",
    title: "The Shame Inventory",
    description: "An honest look at where sexual shame lives in your body and your story.",
    category: "the-healing",
    questions: [
      { id: 1, text: "When you think about your sexual history, the dominant feeling is:", options: [
        { text: "Gratitude — it's been a journey of growth", scores: { integrated: 3, hidden: 0, projected: 0, frozen: 0 } },
        { text: "Discomfort — there are things I don't want to look at", scores: { integrated: 0, hidden: 3, projected: 0, frozen: 0 } },
        { text: "Anger — at others or at myself", scores: { integrated: 0, hidden: 0, projected: 3, frozen: 0 } },
        { text: "Numbness — I don't feel much about it", scores: { integrated: 0, hidden: 0, projected: 0, frozen: 3 } },
      ]},
      { id: 2, text: "If someone asked about your deepest sexual desire:", options: [
        { text: "I could name it without flinching", scores: { integrated: 3, hidden: 0, projected: 0, frozen: 0 } },
        { text: "I'd change the subject", scores: { integrated: 0, hidden: 3, projected: 0, frozen: 0 } },
        { text: "I'd feel judged before they even responded", scores: { integrated: 0, hidden: 0, projected: 3, frozen: 0 } },
        { text: "I'm not sure I know what it is", scores: { integrated: 0, hidden: 0, projected: 0, frozen: 3 } },
      ]},
      { id: 3, text: "Your relationship to your own genitals:", options: [
        { text: "Comfortable — they're part of my body", scores: { integrated: 3, hidden: 0, projected: 0, frozen: 0 } },
        { text: "Complicated — I have mixed feelings", scores: { integrated: 0, hidden: 3, projected: 0, frozen: 0 } },
        { text: "Loaded — there's a lot of history there", scores: { integrated: 0, hidden: 0, projected: 3, frozen: 0 } },
        { text: "Disconnected — I don't think about them much", scores: { integrated: 0, hidden: 0, projected: 0, frozen: 3 } },
      ]},
      { id: 4, text: "When you see explicit sexual content:", options: [
        { text: "I can engage or not — it's a choice", scores: { integrated: 3, hidden: 0, projected: 0, frozen: 0 } },
        { text: "I feel a pull and then guilt", scores: { integrated: 0, hidden: 3, projected: 0, frozen: 0 } },
        { text: "I feel disgusted or morally superior", scores: { integrated: 0, hidden: 0, projected: 3, frozen: 0 } },
        { text: "I feel nothing", scores: { integrated: 0, hidden: 0, projected: 0, frozen: 3 } },
      ]},
      { id: 5, text: "The messages you received about sex growing up were:", options: [
        { text: "Healthy and honest — sex was discussed openly", scores: { integrated: 3, hidden: 0, projected: 0, frozen: 0 } },
        { text: "Silent — sex was never mentioned", scores: { integrated: 0, hidden: 3, projected: 0, frozen: 0 } },
        { text: "Shaming — sex was dirty or sinful", scores: { integrated: 0, hidden: 0, projected: 3, frozen: 0 } },
        { text: "Confusing — mixed messages from different sources", scores: { integrated: 0, hidden: 0, projected: 0, frozen: 3 } },
      ]},
    ],
    results: [
      { id: "integrated", title: "The Integrated Self", description: "You've done significant work around sexual shame. You can hold your desires, your history, and your body with compassion. This doesn't mean you're done — it means you have a foundation for deeper practice.", recommendations: ["the-practice-of-maithuna", "transmutation-of-desire-into-devotion", "the-practice-of-devotional-attention"] },
      { id: "hidden", title: "The Hidden Shame Carrier", description: "Your shame is quiet but present. It lives in the things you don't say, the desires you don't name, the parts of your history you skip over. The work is gentle excavation — not exposure, but honest witnessing.", recommendations: ["the-anatomy-of-sexual-shame", "somatic-therapy-for-sexual-healing", "the-practice-of-radical-self-acceptance"] },
      { id: "projected", title: "The Projected Shame Carrier", description: "Your shame has turned outward — into judgment, anger, or moral rigidity. This is a defense mechanism, and it served you once. The work is turning the lens back inward with compassion.", recommendations: ["when-shame-becomes-armor", "the-shadow-side-of-desire", "healing-the-wounded-masculine-or-feminine"] },
      { id: "frozen", title: "The Frozen Shame Carrier", description: "Your shame has gone underground. You've disconnected from desire, from your body, from the parts of yourself that feel too much. The work is thawing — slowly, gently, with support.", recommendations: ["why-your-body-freezes-during-intimacy", "the-nervous-system-and-sexual-response", "when-numbness-is-the-loudest-sensation"] },
    ],
  },
  {
    id: "energetic-sensitivity",
    slug: "energetic-sensitivity",
    title: "How Energetically Sensitive Are You?",
    description: "Discover your capacity to perceive and work with subtle energy in intimate connection.",
    category: "the-energy",
    questions: [
      { id: 1, text: "When you enter a room full of people:", options: [
        { text: "I immediately feel the emotional temperature", scores: { high: 3, moderate: 0, developing: 0, dormant: 0 } },
        { text: "I notice some people's energy more than others", scores: { high: 0, moderate: 3, developing: 0, dormant: 0 } },
        { text: "I'm mostly in my own world", scores: { high: 0, moderate: 0, developing: 3, dormant: 0 } },
        { text: "I don't know what 'energy' means in this context", scores: { high: 0, moderate: 0, developing: 0, dormant: 3 } },
      ]},
      { id: 2, text: "During physical intimacy, you sometimes feel:", options: [
        { text: "Currents of energy moving through my body", scores: { high: 3, moderate: 0, developing: 0, dormant: 0 } },
        { text: "Warmth or tingling beyond the physical touch", scores: { high: 0, moderate: 3, developing: 0, dormant: 0 } },
        { text: "Mostly physical sensation", scores: { high: 0, moderate: 0, developing: 3, dormant: 0 } },
        { text: "Just physical sensation — nothing else", scores: { high: 0, moderate: 0, developing: 0, dormant: 3 } },
      ]},
      { id: 3, text: "After being intimate with someone:", options: [
        { text: "I can still feel their energy in my body hours later", scores: { high: 3, moderate: 0, developing: 0, dormant: 0 } },
        { text: "I feel a lingering emotional connection", scores: { high: 0, moderate: 3, developing: 0, dormant: 0 } },
        { text: "I feel relaxed or tired", scores: { high: 0, moderate: 0, developing: 3, dormant: 0 } },
        { text: "I feel normal — back to baseline quickly", scores: { high: 0, moderate: 0, developing: 0, dormant: 3 } },
      ]},
      { id: 4, text: "Your experience with breathwork or meditation:", options: [
        { text: "I've had spontaneous energy movements or kriyas", scores: { high: 3, moderate: 0, developing: 0, dormant: 0 } },
        { text: "I feel subtle shifts — warmth, tingling, emotion", scores: { high: 0, moderate: 3, developing: 0, dormant: 0 } },
        { text: "I feel calmer but nothing dramatic", scores: { high: 0, moderate: 0, developing: 3, dormant: 0 } },
        { text: "I haven't tried or didn't notice anything", scores: { high: 0, moderate: 0, developing: 0, dormant: 3 } },
      ]},
      { id: 5, text: "When someone you're attracted to is nearby:", options: [
        { text: "I feel it in my body before I think it", scores: { high: 3, moderate: 0, developing: 0, dormant: 0 } },
        { text: "I notice a shift in my attention and energy", scores: { high: 0, moderate: 3, developing: 0, dormant: 0 } },
        { text: "I notice them visually first", scores: { high: 0, moderate: 0, developing: 3, dormant: 0 } },
        { text: "I don't notice until we interact", scores: { high: 0, moderate: 0, developing: 0, dormant: 3 } },
      ]},
    ],
    results: [
      { id: "high", title: "The Energetic Empath", description: "You feel everything. Energy is as real to you as touch. This is a gift and a challenge — you need practices to ground, clear, and protect your energy field. Tantric practice can be profound for you, but only with proper preparation.", recommendations: ["the-practice-of-energy-circulation", "breathwork-for-energetic-intimacy", "the-heart-genital-connection-in-tantra"] },
      { id: "moderate", title: "The Awakening Sensitive", description: "Your energetic perception is developing. You feel more than most people but may not have language or framework for it yet. This is the perfect time to develop practices that honor your sensitivity.", recommendations: ["the-practice-of-yab-yum", "the-chakra-system-and-sexual-energy", "meditation-practices-for-sexual-presence"] },
      { id: "developing", title: "The Grounded Seeker", description: "Your awareness is primarily physical and emotional. Subtle energy is available to you but hasn't been cultivated yet. Start with body awareness and breath — the energetic dimension will open naturally.", recommendations: ["building-a-home-practice-for-sacred-sexuality", "the-practice-of-embodied-presence", "the-practice-of-full-body-listening"] },
      { id: "dormant", title: "The Potential Awakener", description: "Your energetic sensitivity is dormant, not absent. Everyone has this capacity — yours simply hasn't been activated. Start with the body. Feel your feet on the ground. Notice your breath. The rest will follow.", recommendations: ["the-practice-of-embodied-presence", "sensation-mapping-for-deeper-connection", "the-nervous-system-and-sexual-response"] },
    ],
  },
  {
    id: "communication-style",
    slug: "communication-style",
    title: "What Is Your Communication Style in Intimacy?",
    description: "How you navigate the vulnerable territory of speaking truth in intimate relationship.",
    category: "the-connection",
    questions: [
      { id: 1, text: "When something bothers you in your intimate relationship:", options: [
        { text: "I name it directly and calmly", scores: { direct: 3, indirect: 0, avoidant: 0, reactive: 0 } },
        { text: "I hint at it and hope they pick up on it", scores: { direct: 0, indirect: 3, avoidant: 0, reactive: 0 } },
        { text: "I let it go — it's not worth the conflict", scores: { direct: 0, indirect: 0, avoidant: 3, reactive: 0 } },
        { text: "It builds until I explode", scores: { direct: 0, indirect: 0, avoidant: 0, reactive: 3 } },
      ]},
      { id: 2, text: "During sex, if something doesn't feel right:", options: [
        { text: "I say so immediately", scores: { direct: 3, indirect: 0, avoidant: 0, reactive: 0 } },
        { text: "I redirect with my body", scores: { direct: 0, indirect: 3, avoidant: 0, reactive: 0 } },
        { text: "I endure it", scores: { direct: 0, indirect: 0, avoidant: 3, reactive: 0 } },
        { text: "I shut down and deal with it later", scores: { direct: 0, indirect: 0, avoidant: 0, reactive: 3 } },
      ]},
      { id: 3, text: "When your partner shares a vulnerable truth:", options: [
        { text: "I receive it and respond honestly", scores: { direct: 3, indirect: 0, avoidant: 0, reactive: 0 } },
        { text: "I comfort them but don't share my own truth", scores: { direct: 0, indirect: 3, avoidant: 0, reactive: 0 } },
        { text: "I feel overwhelmed and change the subject", scores: { direct: 0, indirect: 0, avoidant: 3, reactive: 0 } },
        { text: "I feel attacked and get defensive", scores: { direct: 0, indirect: 0, avoidant: 0, reactive: 3 } },
      ]},
      { id: 4, text: "Asking for what you want sexually:", options: [
        { text: "Feels natural — I know what I want and can say it", scores: { direct: 3, indirect: 0, avoidant: 0, reactive: 0 } },
        { text: "I can do it but it takes courage", scores: { direct: 0, indirect: 3, avoidant: 0, reactive: 0 } },
        { text: "Feels impossible — I'd rather they just know", scores: { direct: 0, indirect: 0, avoidant: 3, reactive: 0 } },
        { text: "I demand rather than ask", scores: { direct: 0, indirect: 0, avoidant: 0, reactive: 3 } },
      ]},
      { id: 5, text: "After a difficult conversation with your partner:", options: [
        { text: "I feel closer — truth builds trust", scores: { direct: 3, indirect: 0, avoidant: 0, reactive: 0 } },
        { text: "I worry I said too much", scores: { direct: 0, indirect: 3, avoidant: 0, reactive: 0 } },
        { text: "I regret bringing it up", scores: { direct: 0, indirect: 0, avoidant: 3, reactive: 0 } },
        { text: "I feel drained and resentful", scores: { direct: 0, indirect: 0, avoidant: 0, reactive: 3 } },
      ]},
    ],
    results: [
      { id: "direct", title: "The Truth Speaker", description: "You can name what's real, even when it's uncomfortable. This is a rare and powerful capacity. Your edge is learning to speak truth with tenderness — directness without harshness.", recommendations: ["the-art-of-asking-for-what-you-want", "the-practice-of-verbal-intimacy", "the-power-of-naming-desire"] },
      { id: "indirect", title: "The Gentle Navigator", description: "You communicate through suggestion, body language, and careful framing. You're protecting both yourself and your partner. The work is learning that direct truth, spoken with love, is kinder than silence.", recommendations: ["the-art-of-asking-for-what-you-want", "codependency-vs-sacred-interdependence", "the-practice-of-verbal-intimacy"] },
      { id: "avoidant", title: "The Silent Keeper", description: "You swallow your truth to keep the peace. But the peace you're keeping is an illusion — and your body is paying the price. Every unspoken need becomes tension, resentment, or numbness.", recommendations: ["when-connection-feels-terrifying", "the-art-of-asking-for-what-you-want", "the-practice-of-radical-self-acceptance"] },
      { id: "reactive", title: "The Volcanic Communicator", description: "Your truth comes out sideways — in bursts of anger, criticism, or withdrawal. This isn't a character flaw; it's what happens when needs go unmet for too long. The work is learning to speak before the pressure builds.", recommendations: ["the-nervous-system-and-sexual-response", "the-practice-of-embodied-presence", "the-art-of-asking-for-what-you-want"] },
    ],
  },
  {
    id: "boundaries-assessment",
    slug: "boundaries-assessment",
    title: "The Boundaries Assessment",
    description: "Explore your relationship with boundaries in intimate and sexual contexts.",
    category: "the-healing",
    questions: [
      { id: 1, text: "When someone crosses a boundary in intimacy:", options: [
        { text: "I name it immediately and clearly", scores: { strong: 3, flexible: 0, porous: 0, rigid: 0 } },
        { text: "I notice it but address it later", scores: { strong: 0, flexible: 3, porous: 0, rigid: 0 } },
        { text: "I'm not sure I noticed until after", scores: { strong: 0, flexible: 0, porous: 3, rigid: 0 } },
        { text: "I don't let anyone get close enough to cross one", scores: { strong: 0, flexible: 0, porous: 0, rigid: 3 } },
      ]},
      { id: 2, text: "Your 'no' in sexual situations:", options: [
        { text: "Is clear, firm, and guilt-free", scores: { strong: 3, flexible: 0, porous: 0, rigid: 0 } },
        { text: "Comes with explanation or apology", scores: { strong: 0, flexible: 3, porous: 0, rigid: 0 } },
        { text: "Rarely appears — I tend to go along", scores: { strong: 0, flexible: 0, porous: 3, rigid: 0 } },
        { text: "Is my default — I say no to most things", scores: { strong: 0, flexible: 0, porous: 0, rigid: 3 } },
      ]},
      { id: 3, text: "After being intimate with someone new:", options: [
        { text: "I feel grounded in myself", scores: { strong: 3, flexible: 0, porous: 0, rigid: 0 } },
        { text: "I feel a mix of connection and vulnerability", scores: { strong: 0, flexible: 3, porous: 0, rigid: 0 } },
        { text: "I lose myself — their energy stays with me", scores: { strong: 0, flexible: 0, porous: 3, rigid: 0 } },
        { text: "I rarely let this happen", scores: { strong: 0, flexible: 0, porous: 0, rigid: 3 } },
      ]},
      { id: 4, text: "When your partner wants something sexually that you're unsure about:", options: [
        { text: "I can explore it without losing myself", scores: { strong: 3, flexible: 0, porous: 0, rigid: 0 } },
        { text: "I'll try it but check in with myself throughout", scores: { strong: 0, flexible: 3, porous: 0, rigid: 0 } },
        { text: "I do it to make them happy", scores: { strong: 0, flexible: 0, porous: 3, rigid: 0 } },
        { text: "Absolutely not — I don't experiment", scores: { strong: 0, flexible: 0, porous: 0, rigid: 3 } },
      ]},
      { id: 5, text: "Your relationship to your own pleasure:", options: [
        { text: "I prioritize it equally with my partner's", scores: { strong: 3, flexible: 0, porous: 0, rigid: 0 } },
        { text: "I'm learning to make it a priority", scores: { strong: 0, flexible: 3, porous: 0, rigid: 0 } },
        { text: "My partner's pleasure comes first", scores: { strong: 0, flexible: 0, porous: 3, rigid: 0 } },
        { text: "I don't trust anyone with my pleasure", scores: { strong: 0, flexible: 0, porous: 0, rigid: 3 } },
      ]},
    ],
    results: [
      { id: "strong", title: "The Boundaried Lover", description: "You know where you end and another begins. You can say yes with your whole body and no without guilt. This is the foundation of sacred intimacy — two whole people choosing to merge.", recommendations: ["the-practice-of-maithuna", "the-art-of-slow-touch", "the-practice-of-devotional-attention"] },
      { id: "flexible", title: "The Evolving Lover", description: "Your boundaries are developing. You can feel them but don't always honor them in the moment. The work is closing the gap between knowing and doing — trusting your body's signals.", recommendations: ["the-art-of-asking-for-what-you-want", "the-practice-of-radical-self-acceptance", "building-a-home-practice-for-sacred-sexuality"] },
      { id: "porous", title: "The Merging Lover", description: "You lose yourself in intimacy. Other people's desires become yours. Their energy floods your system. This isn't love — it's self-abandonment wearing love's mask. The work is learning to stay in your own body.", recommendations: ["codependency-vs-sacred-interdependence", "when-connection-feels-terrifying", "the-practice-of-embodied-presence"] },
      { id: "rigid", title: "The Fortressed Lover", description: "Your boundaries are walls, not membranes. They keep everything out — including love. This served you once. The work is learning that boundaries can be flexible without being porous.", recommendations: ["why-your-body-freezes-during-intimacy", "the-dance-of-autonomy-and-togetherness", "somatic-therapy-for-sexual-healing"] },
    ],
  },
  {
    id: "pleasure-capacity",
    slug: "pleasure-capacity",
    title: "What Is Your Pleasure Capacity?",
    description: "How much pleasure can your nervous system actually hold?",
    category: "the-body-temple",
    questions: [
      { id: 1, text: "When pleasure intensifies during sex:", options: [
        { text: "I can ride the wave — it keeps building", scores: { expansive: 3, growing: 0, contracted: 0, numb: 0 } },
        { text: "I enjoy it but hit a ceiling", scores: { expansive: 0, growing: 3, contracted: 0, numb: 0 } },
        { text: "I tense up or rush to orgasm", scores: { expansive: 0, growing: 0, contracted: 3, numb: 0 } },
        { text: "I don't feel much intensity", scores: { expansive: 0, growing: 0, contracted: 0, numb: 3 } },
      ]},
      { id: 2, text: "Your experience of non-sexual pleasure (food, nature, music):", options: [
        { text: "I savor it — I can be moved to tears by beauty", scores: { expansive: 3, growing: 0, contracted: 0, numb: 0 } },
        { text: "I enjoy it but don't linger", scores: { expansive: 0, growing: 3, contracted: 0, numb: 0 } },
        { text: "I feel guilty enjoying things too much", scores: { expansive: 0, growing: 0, contracted: 3, numb: 0 } },
        { text: "I don't notice pleasure much in daily life", scores: { expansive: 0, growing: 0, contracted: 0, numb: 3 } },
      ]},
      { id: 3, text: "When someone gives you a genuine compliment:", options: [
        { text: "I receive it fully — it lands in my body", scores: { expansive: 3, growing: 0, contracted: 0, numb: 0 } },
        { text: "I appreciate it but deflect a little", scores: { expansive: 0, growing: 3, contracted: 0, numb: 0 } },
        { text: "I feel uncomfortable and change the subject", scores: { expansive: 0, growing: 0, contracted: 3, numb: 0 } },
        { text: "I don't believe it", scores: { expansive: 0, growing: 0, contracted: 0, numb: 3 } },
      ]},
      { id: 4, text: "Your relationship to orgasm:", options: [
        { text: "It's one note in a symphony — not the goal", scores: { expansive: 3, growing: 0, contracted: 0, numb: 0 } },
        { text: "It's the main event — I work toward it", scores: { expansive: 0, growing: 3, contracted: 0, numb: 0 } },
        { text: "It's difficult or requires very specific conditions", scores: { expansive: 0, growing: 0, contracted: 3, numb: 0 } },
        { text: "I rarely experience it or it feels muted", scores: { expansive: 0, growing: 0, contracted: 0, numb: 3 } },
      ]},
      { id: 5, text: "If pleasure were a container, yours is:", options: [
        { text: "An ocean — vast and deep", scores: { expansive: 3, growing: 0, contracted: 0, numb: 0 } },
        { text: "A river — flowing but with banks", scores: { expansive: 0, growing: 3, contracted: 0, numb: 0 } },
        { text: "A cup — small and easily overflowed", scores: { expansive: 0, growing: 0, contracted: 3, numb: 0 } },
        { text: "A thimble — barely there", scores: { expansive: 0, growing: 0, contracted: 0, numb: 3 } },
      ]},
    ],
    results: [
      { id: "expansive", title: "The Expansive Receiver", description: "Your nervous system can hold enormous amounts of pleasure. You've trained it — through practice, healing, or natural capacity — to stay open when intensity rises. Your work is sharing this capacity with others.", recommendations: ["the-practice-of-maithuna", "the-practice-of-energy-circulation", "the-art-of-slow-touch"] },
      { id: "growing", title: "The Growing Receiver", description: "Your pleasure capacity is developing. You can feel more than you used to, and the ceiling is rising. Keep going. The body learns to hold more when it feels safe to do so.", recommendations: ["sensation-mapping-for-deeper-connection", "the-practice-of-full-body-listening", "breathwork-for-energetic-intimacy"] },
      { id: "contracted", title: "The Contracted Receiver", description: "Your body tightens around pleasure — rushing to orgasm, tensing up, or shutting down. This is a nervous system pattern, not a personal failing. The work is learning to breathe into intensity instead of bracing against it.", recommendations: ["the-nervous-system-and-sexual-response", "building-a-home-practice-for-sacred-sexuality", "meditation-practices-for-sexual-presence"] },
      { id: "numb", title: "The Dormant Receiver", description: "Pleasure has gone quiet in your body. This is often the result of trauma, medication, or years of disconnection. The path back is gentle — start with sensation, not sex. Feel your feet. Feel warm water. Feel the wind.", recommendations: ["why-your-body-freezes-during-intimacy", "somatic-therapy-for-sexual-healing", "the-practice-of-embodied-presence"] },
    ],
  },
  {
    id: "tantra-readiness",
    slug: "tantra-readiness",
    title: "Are You Ready for Tantric Practice?",
    description: "An honest assessment of your readiness for authentic tantric practice — not the marketing version.",
    category: "the-energy",
    questions: [
      { id: 1, text: "Your current meditation practice:", options: [
        { text: "Daily, 20+ minutes, established for years", scores: { ready: 3, almost: 0, building: 0, premature: 0 } },
        { text: "Regular but inconsistent", scores: { ready: 0, almost: 3, building: 0, premature: 0 } },
        { text: "I've tried but can't sustain it", scores: { ready: 0, almost: 0, building: 3, premature: 0 } },
        { text: "I don't meditate — I want to skip to the good stuff", scores: { ready: 0, almost: 0, building: 0, premature: 3 } },
      ]},
      { id: 2, text: "Your relationship to your own body:", options: [
        { text: "I inhabit it fully — I feel sensation, energy, emotion in real time", scores: { ready: 3, almost: 0, building: 0, premature: 0 } },
        { text: "Growing — I'm more embodied than I was a year ago", scores: { ready: 0, almost: 3, building: 0, premature: 0 } },
        { text: "Complicated — there's trauma or disconnection", scores: { ready: 0, almost: 0, building: 3, premature: 0 } },
        { text: "My body is a vehicle — I don't think about it much", scores: { ready: 0, almost: 0, building: 0, premature: 3 } },
      ]},
      { id: 3, text: "When you hear 'tantra,' you think:", options: [
        { text: "A complete spiritual path that includes but transcends sexuality", scores: { ready: 3, almost: 1, building: 0, premature: 0 } },
        { text: "Sacred sexuality practices I want to explore", scores: { ready: 0, almost: 3, building: 0, premature: 0 } },
        { text: "Something I'm curious about but don't understand", scores: { ready: 0, almost: 0, building: 3, premature: 0 } },
        { text: "Better orgasms and longer sex", scores: { ready: 0, almost: 0, building: 0, premature: 3 } },
      ]},
      { id: 4, text: "Your capacity to be with intense emotion:", options: [
        { text: "I can hold grief, rage, ecstasy without acting on them", scores: { ready: 3, almost: 0, building: 0, premature: 0 } },
        { text: "I'm learning — some emotions are easier than others", scores: { ready: 0, almost: 3, building: 0, premature: 0 } },
        { text: "Intense emotion overwhelms me", scores: { ready: 0, almost: 0, building: 3, premature: 0 } },
        { text: "I don't do intense emotion", scores: { ready: 0, almost: 0, building: 0, premature: 3 } },
      ]},
      { id: 5, text: "Your motivation for exploring tantra:", options: [
        { text: "Spiritual growth through embodied practice", scores: { ready: 3, almost: 0, building: 0, premature: 0 } },
        { text: "Deeper connection with my partner", scores: { ready: 1, almost: 3, building: 0, premature: 0 } },
        { text: "Healing sexual wounds", scores: { ready: 0, almost: 0, building: 3, premature: 0 } },
        { text: "Sexual enhancement", scores: { ready: 0, almost: 0, building: 0, premature: 3 } },
      ]},
    ],
    results: [
      { id: "ready", title: "The Prepared Practitioner", description: "You have the foundation — embodiment, meditation, emotional capacity, and right understanding. You're ready for authentic tantric practice. Find a legitimate teacher, not a weekend workshop.", recommendations: ["tantra-beyond-the-marketing", "the-practice-of-maithuna", "the-difference-between-tantric-and-neotantric"] },
      { id: "almost", title: "The Approaching Practitioner", description: "You're close. The intention is right, the interest is genuine, and you're building the skills. Deepen your meditation and embodiment practice. The tantric path will open naturally.", recommendations: ["the-practice-of-yab-yum", "breathwork-for-energetic-intimacy", "the-heart-genital-connection-in-tantra"] },
      { id: "building", title: "The Foundation Builder", description: "Before tantra, you need ground to stand on. Heal what needs healing. Build a body practice. Learn to sit with yourself. Tantra without foundation is spiritual entertainment.", recommendations: ["building-a-home-practice-for-sacred-sexuality", "meditation-practices-for-sexual-presence", "somatic-therapy-for-sexual-healing"] },
      { id: "premature", title: "The Honest Seeker", description: "Your interest in tantra may be genuine, but the motivation needs examination. Tantra isn't a technique for better sex — it's a path of radical transformation. Start with why you're really here.", recommendations: ["when-energy-practices-become-spiritual-bypassing", "when-tantra-becomes-another-performance", "the-difference-between-lust-and-kundalini"] },
    ],
  },
];

// Readiness check (interactive page)
export const readinessQuestions = [
  { id: 1, text: "Can you name what you're feeling in your body right now?", dimension: "sensation" },
  { id: 2, text: "When was the last time you cried in front of another person?", dimension: "vulnerability" },
  { id: 3, text: "Can you ask for what you want in bed without apologizing?", dimension: "voice" },
  { id: 4, text: "Do you know the difference between your desire and your partner's expectation?", dimension: "boundaries" },
  { id: 5, text: "Can you be touched without performing a response?", dimension: "presence" },
  { id: 6, text: "Have you ever sat with sexual shame without trying to fix it?", dimension: "shadow" },
  { id: 7, text: "Can you maintain eye contact during intimacy for more than 30 seconds?", dimension: "presence" },
  { id: 8, text: "Do you know what your body does when it feels unsafe?", dimension: "sensation" },
  { id: 9, text: "Can you say no to sex without guilt?", dimension: "boundaries" },
  { id: 10, text: "Have you explored your relationship to pleasure outside of orgasm?", dimension: "sensation" },
  { id: 11, text: "Can you be fully present with your partner's pain without trying to fix it?", dimension: "vulnerability" },
  { id: 12, text: "Do you have a daily practice that connects you to your body?", dimension: "presence" },
];

export const readinessArchetypes = [
  { id: "performer", name: "The Performer", range: [0, 25] as [number, number], description: "You've been performing intimacy instead of experiencing it. The mask is convincing — but it's costing you everything real. Your work begins with one honest moment.", practices: ["Start with 5 minutes of body scanning daily", "Practice saying one true thing to your partner each day", "Explore the article: The Sacred Act of Being Naked"] },
  { id: "protector", name: "The Protector", range: [26, 50] as [number, number], description: "Your walls are well-built and they served you once. But the fortress that kept danger out is now keeping love out too. The door doesn't need to come down all at once — just crack it open.", practices: ["Practice receiving touch without directing it", "Journal about what you're protecting and from whom", "Explore the article: When Connection Feels Terrifying"] },
  { id: "pleaser", name: "The Pleaser", range: [51, 75] as [number, number], description: "You've become an expert at reading others' needs while ignoring your own. Your body has been in service to everyone else's pleasure. It's time to ask: what do YOU actually want?", practices: ["Practice asking for one thing you want each intimate encounter", "Notice when you abandon yourself to please", "Explore the article: The Art of Asking for What You Want"] },
  { id: "present", name: "The Present One", range: [76, 100] as [number, number], description: "You've done the work. You can be in your body, with another person, without armor. This doesn't mean you're done — it means you're ready for the deeper practice. The one that has no end.", practices: ["Deepen your meditation practice to 20+ minutes", "Explore tantric breathwork with a partner", "Explore the article: The Practice of Maithuna"] },
];

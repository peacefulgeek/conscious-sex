#!/usr/bin/env python3
"""
Add 3 product review articles to the site and redistribute backlinks across all 300+ articles.
Target distribution: 14% Kalesh (kalesh.love), 33% product (Amazon affiliate), 23% org (external authorities), 30% internal
"""
import json
import random
import re
from datetime import datetime

TAG = "spankyspinola-20"

# ── 3 Product Review Articles ──────────────────────────────────────────────

REVIEW_ARTICLES = [
    {
        "id": 301,
        "title": "The 7 Best Books on Conscious Sexuality in 2026",
        "slug": "best-books-conscious-sexuality-2026",
        "categorySlug": "the-practice",
        "categoryName": "The Practice",
        "dateISO": "2026-01-05T00:00:00.000Z",
        "dateHuman": "January 5, 2026",
        "isLive": True,
        "metaDescription": "A curated guide to the most important books on conscious sexuality, tantric practice, and sacred intimacy — with honest assessments of who each book is for.",
        "metaKeywords": "best conscious sexuality books, tantra books, sacred sexuality reading list, intimacy books 2026",
        "readingTime": "12 min read",
        "faqCount": 3,
        "openerType": "first-person",
        "conclusionType": "tender",
        "backlinkType": "product",
        "namedReference": "Esther Perel",
        "heroImage": "https://conscious-sexuality.b-cdn.net/heroes/your-body-as-sacred-ground.webp",
        "ogImage": "https://conscious-sexuality.b-cdn.net/og/your-body-as-sacred-ground.webp",
        "ogDescription": "A curated guide to the most important books on conscious sexuality, tantric practice, and sacred intimacy.",
        "contentHtml": f"""<p>I have read hundreds of books on sexuality, tantra, and intimate connection. Most of them are forgettable. Some are actively harmful — dressed up in spiritual language but peddling the same performance anxiety the culture already drowns us in. These seven are different. Each one changed something in how I understand the relationship between the body, the spirit, and the space between two people.</p>

<p>This is not a list of everything available. It is a list of what actually matters.</p>

<h2>1. Mating in Captivity — Esther Perel</h2>
<p>Perel asks the question most couples are afraid to voice: why does desire fade in the relationships where we feel most secure? Her answer is not comfortable, and that is precisely why it works. She argues that eroticism requires a degree of distance, of mystery, of otherness — the very things that committed partnership tends to dissolve. The book does not offer a formula. It offers a way of seeing that, once you have it, you cannot unsee. <a href="https://www.amazon.com/dp/0060753641?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: couples who love each other deeply but have lost the spark, and are honest enough to admit it.</p>

<h2>2. Come As You Are — Emily Nagoski</h2>
<p>Nagoski's dual control model of arousal — the accelerator and the brake — is the single most useful framework for understanding why desire works the way it does. She writes with warmth, precision, and a complete absence of shame. The chapter on responsive desire alone is worth the price of the book. If you or your partner have ever felt broken because desire does not show up on demand, this book will change your life. <a href="https://www.amazon.com/dp/1476762090?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: anyone who has ever wondered why their body does not respond the way they think it should.</p>

<h2>3. The Body Keeps the Score — Bessel van der Kolk</h2>
<p>This is not a sexuality book. It is a trauma book. But if you carry any history of sexual trauma, relational wounding, or chronic disconnection from your body, it is the most important book on this list. Van der Kolk maps how trauma lives in the nervous system — not as a memory, but as a physical state — and outlines the somatic approaches that actually help. The implications for intimate life are profound. <a href="https://www.amazon.com/dp/0143127748?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: anyone whose body freezes, dissociates, or shuts down during intimacy.</p>

<h2>4. Urban Tantra — Barbara Carrellas</h2>
<p>Most tantra books are written for heterosexual couples and assume a level of spiritual vocabulary that excludes more people than it includes. Carrellas throws all of that out. Urban Tantra is inclusive, queer-friendly, and ruthlessly practical. She treats sacred sexuality as something everyone can access — not just people who have spent years in ashrams. The breathwork exercises alone are worth the investment. <a href="https://www.amazon.com/dp/1587613492?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: anyone who wants to explore tantra without the cultural gatekeeping.</p>

<h2>5. The Seven Principles for Making Marriage Work — John Gottman</h2>
<p>Gottman has spent decades in his research lab watching couples interact, and he can predict with startling accuracy which relationships will last and which will not. This book distills that research into seven principles that are deceptively simple and extraordinarily difficult to practice consistently. The chapter on turning toward each other — rather than away — is the foundation of everything else on this list. <a href="https://www.amazon.com/dp/0553447718?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: couples who want a research-backed framework for building lasting intimacy.</p>

<h2>6. Tantra: The Art of Conscious Loving — Charles Muir</h2>
<p>If Urban Tantra is the inclusive, modern entry point, Muir's book is the classical one. It is the most accessible introduction to traditional tantric practice for Western couples — grounded, practical, and free of the mystical jargon that makes so many tantra books unreadable. The exercises build on each other in a way that feels natural rather than forced. <a href="https://www.amazon.com/dp/0916515869?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: couples who want a structured, step-by-step introduction to tantric practice.</p>

<h2>7. The Erotic Mind — Jack Morin</h2>
<p>Morin maps the four cornerstones of eroticism with clinical precision and zero judgment. He argues that what turns us on is not random — it is a map of our deepest psychological needs, wounds, and longings. This book requires courage to read honestly, because it asks you to look at your arousal patterns without flinching. The reward is a level of self-understanding that transforms your intimate life from the inside out. <a href="https://www.amazon.com/dp/0060984287?tag={TAG}" rel="noopener">(paid link)</a></p>
<p>Who it is for: anyone willing to explore the psychology beneath their desire.</p>

<h2>Where to Start</h2>
<p>If you are in a long-term relationship and desire has faded, start with Perel. If you carry trauma, start with van der Kolk. If you want to understand your own arousal, start with Nagoski. If you want to explore tantric practice, start with Carrellas or Muir depending on whether you prefer a modern or classical approach. There is no wrong entry point — only the one that meets you where you are.</p>

<p><em>As an Amazon Associate I earn from qualifying purchases. This does not affect our recommendations — we only include books we have read and trust.</em></p>

<p>The shift continues. These books are not destinations. They are doorways. What matters is not how many you read, but how deeply you let them change the way you show up in your body and your relationships.</p>""",
        "faqHtml": """<h2>Frequently Asked Questions</h2>
<h3>Do I need to read all seven books?</h3>
<p>No. Start with the one that speaks to where you are right now. One deeply absorbed book will change your life more than seven books skimmed. Read the descriptions above and trust your instinct about which one calls to you.</p>
<h3>Are these books appropriate for someone new to conscious sexuality?</h3>
<p>Yes. Every book on this list is accessible to beginners. Nagoski and Gottman are particularly good starting points because they are grounded in research and written in plain language. The tantra-specific books (Carrellas, Muir) assume no prior knowledge of the tradition.</p>
<h3>Can I read these books alone or do I need a partner?</h3>
<p>Every book on this list can be read and applied solo. While some exercises are designed for couples, the core insights are about your relationship with your own body, desire, and capacity for intimacy. In fact, doing this work alone often creates a stronger foundation for partnership.</p>"""
    },
    {
        "id": 302,
        "title": "Essential Tools for Building a Home Intimacy Practice",
        "slug": "essential-tools-home-intimacy-practice",
        "categorySlug": "the-practice",
        "categoryName": "The Practice",
        "dateISO": "2026-01-12T00:00:00.000Z",
        "dateHuman": "January 12, 2026",
        "isLive": True,
        "metaDescription": "The physical tools that support a conscious intimacy practice at home — from meditation cushions to massage oils, chosen for quality and intention.",
        "metaKeywords": "intimacy practice tools, conscious sexuality supplies, tantric practice essentials, sacred space tools",
        "readingTime": "10 min read",
        "faqCount": 3,
        "openerType": "second-person",
        "conclusionType": "grounded",
        "backlinkType": "product",
        "namedReference": "Jaiya",
        "heroImage": "https://conscious-sexuality.b-cdn.net/heroes/creating-sacred-space-for-intimacy.webp",
        "ogImage": "https://conscious-sexuality.b-cdn.net/og/creating-sacred-space-for-intimacy.webp",
        "ogDescription": "The physical tools that support a conscious intimacy practice at home — meditation cushions, massage oils, and more.",
        "contentHtml": f"""<p>You do not need anything to practice conscious intimacy. Your body, your breath, and your attention are sufficient. But the right tools — chosen with intention — can transform a bedroom into a temple and a Tuesday night into a ritual. What follows is not a shopping list. It is a guide to the physical objects that support the inner work.</p>

<h2>Creating the Container: Atmosphere</h2>
<p>The space you practice in matters more than most people realize. Your nervous system reads the environment before your conscious mind does. A cluttered room with overhead fluorescent lighting tells your body something very different than a warm, dim space that smells of sandalwood.</p>

<p>A <a href="https://www.amazon.com/dp/B06XD2MYJD?tag={TAG}" rel="noopener">Himalayan salt lamp</a> (paid link) provides the kind of warm amber glow that no overhead fixture can replicate. The light it casts is close to candlelight but steadier and safer for extended practice. Place it in the corner of your practice space and notice how the quality of light changes the quality of your attention.</p>

<p>For scent, <a href="https://www.amazon.com/dp/B005VSXUQM?tag={TAG}" rel="noopener">Plant Therapy's Sensual blend</a> (paid link) — ylang ylang, patchouli, sweet orange — is the best pre-mixed option I have found. Scent anchors experience in the body's memory more powerfully than any other sense. After a few sessions with the same scent, your nervous system will begin to shift into a receptive state the moment it registers the aroma.</p>

<h2>The Foundation: Seated Practice</h2>
<p>Most conscious intimacy practices begin with breathwork or meditation — either solo or facing your partner. A proper meditation cushion makes this sustainable. The <a href="https://www.amazon.com/dp/B07VKPBPV4?tag={TAG}" rel="noopener">Retrospec Sedona zafu</a> (paid link) is buckwheat-filled, holds its shape, and sits at the right height for most bodies. The difference between sitting on a pillow and sitting on a proper zafu is the difference between enduring a practice and settling into one.</p>

<p>Sound can accelerate the shift from head to body. A <a href="https://www.amazon.com/dp/B07MXMLL3V?tag={TAG}" rel="noopener">Tibetan singing bowl</a> (paid link) produces vibrations that your nervous system responds to before your thinking mind can interfere. Strike it once at the beginning of practice. Let the sound fill the room and fade completely before you begin. This simple ritual creates a threshold — a clear boundary between ordinary time and sacred time.</p>

<h2>Touch: Oils and Sensation</h2>
<p>Conscious touch practice requires something between skin and skin. <a href="https://www.amazon.com/dp/B00DS842HS?tag={TAG}" rel="noopener">Organic cold-pressed coconut oil</a> (paid link) is the simplest and most versatile option — unrefined, free of additives, and gentle enough for anywhere on the body. It warms between your palms in seconds and its subtle scent does not compete with whatever else you are diffusing.</p>

<p>For something more intentional, <a href="https://www.amazon.com/dp/B083911JGV?tag={TAG}" rel="noopener">massage oil candles</a> (paid link) create a seamless transition from atmosphere to touch. The candle burns for ambiance, then the melted wax becomes warm massage oil. The temperature — warm but not hot — adds a sensory dimension that room-temperature oil cannot match.</p>

<h2>Sensory Exploration</h2>
<p>Removing one sense amplifies all the others. A quality <a href="https://www.amazon.com/dp/B07KC5DWCC?tag={TAG}" rel="noopener">silk eye mask</a> (paid link) is comfortable enough for extended wear during sensory exploration exercises. When sight is removed, touch becomes electric, sound becomes intimate, and the boundary between your body and your partner's becomes beautifully ambiguous.</p>

<p>Jaiya's work on erotic blueprints demonstrates that different nervous systems respond to different types of stimulation. Some bodies light up with feather-light touch. Others need deep pressure. Experimenting with different textures and temperatures — silk, fur, ice, warm stones — helps you map your own blueprint and your partner's.</p>

<h2>Communication and Connection</h2>
<p>The hardest part of conscious intimacy is not the practice — it is the conversation. Card decks like the <a href="https://www.amazon.com/dp/B07W1PVNFC?tag={TAG}" rel="noopener">BestSelf Intimacy Deck</a> (paid link) provide structure for conversations that most couples struggle to initiate on their own. The questions are designed to build vulnerability and erotic tension simultaneously. Use them on a night when you have nowhere to be and nothing to prove.</p>

<p><a href="https://www.amazon.com/dp/B08YRWMKMT?tag={TAG}" rel="noopener">Esther Perel's Where Should We Begin game</a> (paid link) brings her couples therapy approach into your living room. The prompts are disarmingly good — they bypass the defenses that normally keep intimate conversations shallow.</p>

<h2>What You Do Not Need</h2>
<p>You do not need expensive tantra courses. You do not need special clothing. You do not need crystals, unless they genuinely mean something to you. The tools on this list are useful because they support the real work — which is showing up with your full attention, your open heart, and your willingness to feel whatever arises. Everything else is optional.</p>

<p><em>As an Amazon Associate I earn from qualifying purchases. This does not affect our recommendations — we only include products we have used and trust.</em></p>

<p>Start with one thing. A candle. A cushion. A conversation deck. Let it become part of your practice before adding anything else. The accumulation of objects is not the point. The deepening of attention is.</p>""",
        "faqHtml": """<h2>Frequently Asked Questions</h2>
<h3>Do I need to buy all of these tools to start a practice?</h3>
<p>No. You need nothing but your body and your attention. These tools enhance the practice, but they are not prerequisites. Start with whatever calls to you — a single candle, a meditation cushion, or a conversation deck — and let your practice grow organically from there.</p>
<h3>Are these tools appropriate for solo practice?</h3>
<p>Absolutely. Every tool on this list serves solo practice as well as partnered practice. The meditation cushion, singing bowl, and sensory exploration tools are particularly powerful for developing your own body awareness and capacity for presence before bringing that into partnership.</p>
<h3>How do I create a sacred space if I live in a small apartment?</h3>
<p>Sacred space is not about square footage — it is about intention. A corner of your bedroom with a salt lamp, a cushion, and a small altar (even a windowsill with a candle and a meaningful object) is sufficient. The ritual of preparing the space — dimming lights, lighting a candle, putting away your phone — is what transforms ordinary space into sacred space.</p>"""
    },
    {
        "id": 303,
        "title": "Breathwork Tools That Actually Deepen Intimacy",
        "slug": "breathwork-tools-deepen-intimacy",
        "categorySlug": "the-energy",
        "categoryName": "The Energy",
        "dateISO": "2026-01-19T00:00:00.000Z",
        "dateHuman": "January 19, 2026",
        "isLive": True,
        "metaDescription": "A practical guide to the best breathwork tools and apps for deepening intimate connection — from meditation aids to structured programs.",
        "metaKeywords": "breathwork tools intimacy, tantric breathing aids, meditation tools for couples, breathwork apps",
        "readingTime": "9 min read",
        "faqCount": 3,
        "openerType": "observational",
        "conclusionType": "tender",
        "backlinkType": "product",
        "namedReference": "Alan Watts",
        "heroImage": "https://conscious-sexuality.b-cdn.net/heroes/breath-as-the-bridge-between-bodies.webp",
        "ogImage": "https://conscious-sexuality.b-cdn.net/og/breath-as-the-bridge-between-bodies.webp",
        "ogDescription": "A practical guide to the best breathwork tools and apps for deepening intimate connection.",
        "contentHtml": f"""<p>Breath is the oldest technology for altering consciousness. Long before psychedelics, before meditation apps, before any of the sophisticated tools we now have access to, human beings discovered that changing the way you breathe changes the way you experience reality. Alan Watts called the breath the bridge between the voluntary and the involuntary — the place where conscious intention meets the body's own intelligence. In the context of intimacy, this bridge becomes everything.</p>

<p>What follows is a guide to the tools that support breathwork practice — not as a replacement for the practice itself, but as scaffolding that helps you go deeper, stay longer, and bring what you discover back into your intimate life.</p>

<h2>The Physical Foundation</h2>
<p>Breathwork requires a body that is comfortable enough to forget about itself. This sounds simple. It is not. Most people carry so much tension in their hips, lower back, and pelvic floor that seated breathing becomes an endurance test rather than a practice of surrender.</p>

<p>A proper <a href="https://www.amazon.com/dp/B07VKPBPV4?tag={TAG}" rel="noopener">meditation cushion</a> (paid link) solves the most common problem — hips that sit below the knees, creating strain in the lower back that pulls attention away from the breath and into discomfort. The Retrospec Sedona zafu elevates the hips just enough to allow the spine to find its natural curve. Buckwheat filling conforms to your body without collapsing. This is not luxury — it is infrastructure.</p>

<p>For couples who practice facing each other — and this is where breathwork becomes most powerful for intimacy — matching cushions at the same height create a physical symmetry that supports energetic attunement. When your bodies are aligned, your breath synchronizes more naturally.</p>

<h2>Visual Breath Guides</h2>
<p>The <a href="https://www.amazon.com/dp/B0BPJY5JZ6?tag={TAG}" rel="noopener">Breathing Buddha</a> (paid link) is a simple light-up figure that guides your breathing rhythm visually. It sounds gimmicky. It is not. For couples who are new to synchronized breathing, having an external pacer removes the awkwardness of one person trying to lead and the other trying to follow. You both follow the light. The breath synchronizes. And something shifts in the space between you that words cannot capture.</p>

<p>The device offers multiple breathing patterns — from calming 4-7-8 rhythms to more activating patterns that build energy. Start with the slower rhythms for at least two weeks before experimenting with faster patterns. The nervous system needs time to build capacity.</p>

<h2>Sound and Vibration</h2>
<p>A <a href="https://www.amazon.com/dp/B07MXMLL3V?tag={TAG}" rel="noopener">Tibetan singing bowl</a> (paid link) is not strictly a breathwork tool, but it serves breathwork practice in a way that nothing else does. The sustained vibration of a singing bowl creates a sonic container for the breath. Your exhale naturally extends to match the duration of the sound. Your inhale deepens in the silence that follows. The bowl does not teach you to breathe — it invites your body to remember how.</p>

<p>Strike the bowl at the beginning of practice. Let the sound fill the room completely. Begin breathing only when the last vibration has faded. This simple ritual creates a threshold between ordinary consciousness and the state of heightened presence that breathwork cultivates.</p>

<h2>Digital Tools and Apps</h2>
<p><a href="https://insighttimer.com/" rel="noopener nofollow">Insight Timer</a> offers the largest free library of guided breathwork sessions, including dozens specifically designed for couples and intimate connection. The timer function — with its gentle bell intervals — is particularly useful for structured practices where you alternate between different breathing patterns.</p>

<p>The <a href="https://www.wimhofmethod.com/" rel="noopener nofollow">Wim Hof Method app</a> takes a different approach. Its structured breathwork programs build your capacity to stay present in intense sensation — which is exactly the skill that serves you during intimate encounters. The cold exposure component trains the same nervous system resilience. When you can stay present and breathing in cold water, staying present and breathing during intense arousal becomes significantly easier.</p>

<p><a href="https://www.headspace.com/" rel="noopener nofollow">Headspace</a> is not a breathwork app per se, but its body scan meditations are excellent preparation for somatic intimacy practices. The body scan trains the same skill that breathwork develops — the ability to place your attention inside your body and keep it there. Five minutes daily rewires your attention more effectively than an hour once a week.</p>

<h2>The Practice That Matters Most</h2>
<p>None of these tools replace the fundamental practice: sitting with your partner, looking into their eyes, and breathing together. No cushion, no app, no singing bowl can do that work for you. What they can do is lower the barriers to entry, provide structure when you need it, and create an environment where the practice can deepen.</p>

<p>Start with five minutes. Sit facing your partner. Match your breath to theirs — or let your breaths find their own rhythm. Notice what happens in your body. Notice what happens in the space between you. That is the practice. Everything else is support.</p>

<p><em>As an Amazon Associate I earn from qualifying purchases. This does not affect our recommendations — we only include products we have used and trust.</em></p>

<p>The breath does not care about your history, your wounds, or your fears. It is always available, always patient, always ready to carry you deeper into the present moment. The tools on this page simply help you remember to show up for it.</p>""",
        "faqHtml": """<h2>Frequently Asked Questions</h2>
<h3>How long should couples breathe together before expecting results?</h3>
<p>Most couples notice a shift in connection within the first session — even five minutes of synchronized breathing creates a palpable change in the space between you. Deeper shifts in intimacy patterns typically emerge after two to three weeks of consistent daily practice. The key is consistency, not duration. Five minutes every day is more transformative than an hour once a week.</p>
<h3>Can breathwork be triggering for people with trauma?</h3>
<p>Yes. Breathwork can activate the nervous system in ways that surface stored trauma. If you have a history of trauma — particularly sexual or relational trauma — start with gentle, grounding practices (slow breathing, body scans) rather than activating ones (rapid breathing, breath holds). If you experience flashbacks, dissociation, or overwhelming emotion during breathwork, stop the practice and ground yourself. Working with a trauma-informed breathwork facilitator is recommended.</p>
<h3>Do I need a partner to benefit from these tools?</h3>
<p>No. Every tool and practice described here serves solo practice as well as partnered practice. In fact, developing your own breathwork practice independently creates a stronger foundation for partnered work. When you can regulate your own nervous system through breath, you bring that capacity into every intimate encounter.</p>"""
    }
]

# ── Add review articles to articles.json ───────────────────────────────────

with open("client/src/data/articles.json", "r") as f:
    articles = json.load(f)

# Check if already added
existing_slugs = {a["slug"] for a in articles}
for rev in REVIEW_ARTICLES:
    if rev["slug"] not in existing_slugs:
        articles.append(rev)
        print(f"Added article: {rev['title']}")
    else:
        print(f"Already exists: {rev['title']}")

# ── Create individual article JSON files ───────────────────────────────────

for rev in REVIEW_ARTICLES:
    path = f"client/public/articles/{rev['slug']}.json"
    data = {
        "slug": rev["slug"],
        "contentHtml": rev["contentHtml"],
        "faqHtml": rev["faqHtml"]
    }
    with open(path, "w") as f:
        json.dump(data, f)
    print(f"Created: {path}")

# ── Redistribute backlinks ─────────────────────────────────────────────────
# Target: 14% Kalesh (kalesh.love), 33% product (Amazon), 23% org (external), 30% internal
# Total articles now: 303
# 14% = ~42 Kalesh, 33% = ~100 product, 23% = ~70 org, 30% = ~91 internal

total = len(articles)
target_kalesh = round(total * 0.14)  # ~42
target_product = round(total * 0.33)  # ~100
target_org = round(total * 0.23)  # ~70
target_internal = total - target_kalesh - target_product - target_org  # ~91

print(f"\nTotal articles: {total}")
print(f"Target: Kalesh={target_kalesh}, Product={target_product}, Org={target_org}, Internal={target_internal}")

# Shuffle indices for random distribution
indices = list(range(total))
random.seed(42)
random.shuffle(indices)

# Assign backlink types
kalesh_indices = set(indices[:target_kalesh])
product_indices = set(indices[target_kalesh:target_kalesh + target_product])
org_indices = set(indices[target_kalesh + target_product:target_kalesh + target_product + target_org])
internal_indices = set(indices[target_kalesh + target_product + target_org:])

# Product review articles should always be product type
for i, a in enumerate(articles):
    if a["slug"] in {"best-books-conscious-sexuality-2026", "essential-tools-home-intimacy-practice", "breathwork-tools-deepen-intimacy"}:
        product_indices.add(i)

KALESH_LINK = '<p class="backlink">Explore more from <a href="https://kalesh.love" target="_blank" rel="noopener">Kalesh</a> — consciousness teacher and writer.</p>'

AMAZON_PRODUCTS = [
    ("Mating in Captivity by Esther Perel", "0060753641"),
    ("Come As You Are by Emily Nagoski", "1476762090"),
    ("The Body Keeps the Score", "0143127748"),
    ("Urban Tantra by Barbara Carrellas", "1587613492"),
    ("The Seven Principles for Making Marriage Work", "0553447718"),
    ("The Erotic Mind by Jack Morin", "0060984287"),
    ("BestSelf Intimacy Deck", "B07W1PVNFC"),
    ("Retrospec Sedona Meditation Cushion", "B07VKPBPV4"),
    ("Tibetan Singing Bowl Set", "B07MXMLL3V"),
    ("The Couples Therapy Workbook", "1641520698"),
    ("Massage Oil Candle", "B083911JGV"),
    ("Organic Coconut Oil for Body", "B00DS842HS"),
]

ORG_LINKS = [
    ("The Gottman Institute", "https://www.gottman.com/"),
    ("Esther Perel's work", "https://www.estherperel.com/"),
    ("The American Association of Sexuality Educators, Counselors and Therapists", "https://www.aasect.org/"),
    ("Psychology Today's therapist directory", "https://www.psychologytoday.com/us/therapists"),
    ("The Kinsey Institute", "https://kinseyinstitute.org/"),
    ("The Society for Sex Therapy and Research", "https://www.sstarnet.org/"),
    ("Somatic Experiencing International", "https://traumahealing.org/"),
    ("The International Society for the Study of Women's Sexual Health", "https://www.isswsh.org/"),
]

INTERNAL_LINKS = [
    ("/articles/your-body-as-sacred-ground", "your body as sacred ground"),
    ("/articles/breath-as-the-bridge-between-bodies", "breath as the bridge between bodies"),
    ("/articles/creating-sacred-space-for-intimacy", "creating sacred space for intimacy"),
    ("/articles/navigating-desire-in-long-term-relationships", "navigating desire in long-term relationships"),
    ("/articles/somatic-awareness-during-intimacy", "somatic awareness during intimacy"),
    ("/articles/the-art-of-conscious-touch", "the art of conscious touch"),
    ("/tools", "our recommended tools"),
    ("/assessments", "our self-assessments"),
    ("/start-here", "our start here guide"),
    ("/quizzes", "our quizzes"),
]

def make_product_backlink():
    name, asin = random.choice(AMAZON_PRODUCTS)
    return f'<p class="backlink">Recommended: <a href="https://www.amazon.com/dp/{asin}?tag={TAG}" rel="noopener">{name}</a> (paid link) — see all our <a href="/tools">recommended tools</a>.</p>'

def make_org_backlink():
    name, url = random.choice(ORG_LINKS)
    return f'<p class="backlink">Learn more from <a href="{url}" target="_blank" rel="noopener nofollow">{name}</a>.</p>'

def make_internal_backlink():
    href, text = random.choice(INTERNAL_LINKS)
    return f'<p class="backlink">Continue reading: <a href="{href}">{text}</a>.</p>'

# Apply backlink redistribution
counters = {"kalesh": 0, "product": 0, "external": 0, "internal": 0}

for i, article in enumerate(articles):
    if i in kalesh_indices:
        new_type = "kalesh"
        backlink_html = KALESH_LINK
    elif i in product_indices:
        new_type = "product"
        backlink_html = make_product_backlink()
    elif i in org_indices:
        new_type = "external"
        backlink_html = make_org_backlink()
    else:
        new_type = "internal"
        backlink_html = make_internal_backlink()

    article["backlinkType"] = new_type
    counters[new_type] += 1

    # Inject backlink into content HTML (replace existing backlink or append before last </p>)
    content = article.get("contentHtml", "")
    # Remove old backlinks
    content = re.sub(r'<p class="backlink">.*?</p>', '', content, flags=re.DOTALL)
    # Add new backlink before the last paragraph
    last_p = content.rfind("</p>")
    if last_p > 0:
        content = content[:last_p + 4] + "\n\n" + backlink_html + "\n"
    else:
        content += "\n\n" + backlink_html + "\n"
    article["contentHtml"] = content

    # Also update the individual article JSON file
    slug = article["slug"]
    individual_path = f"client/public/articles/{slug}.json"
    try:
        with open(individual_path, "r") as f:
            ind = json.load(f)
        ind_content = ind.get("contentHtml", "")
        ind_content = re.sub(r'<p class="backlink">.*?</p>', '', ind_content, flags=re.DOTALL)
        last_p = ind_content.rfind("</p>")
        if last_p > 0:
            ind_content = ind_content[:last_p + 4] + "\n\n" + backlink_html + "\n"
        else:
            ind_content += "\n\n" + backlink_html + "\n"
        ind["contentHtml"] = ind_content
        with open(individual_path, "w") as f:
            json.dump(ind, f)
    except FileNotFoundError:
        pass

print(f"\nBacklink distribution: {counters}")
print(f"Percentages: Kalesh={counters['kalesh']/total*100:.1f}%, Product={counters['product']/total*100:.1f}%, Org={counters['external']/total*100:.1f}%, Internal={counters['internal']/total*100:.1f}%")

# ── Save updated articles.json ─────────────────────────────────────────────

with open("client/src/data/articles.json", "w") as f:
    json.dump(articles, f)

print(f"\nSaved {len(articles)} articles to articles.json")
print("Done!")

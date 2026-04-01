# Sacred Fire Intimacy — TODO

## SCOPE 2A — FTC Amazon Compliance [NEW]
- [ ] Add "As an Amazon Associate I earn from qualifying purchases." to site-wide footer
- [ ] Add Affiliate Disclosure section to Privacy Policy page
- [ ] Add per-article disclosure box above article body for articles with Amazon links
- [ ] Add (paid link) next to each Amazon link
- [ ] Tag all Amazon links with ?tag=spankyspinola-20
- [ ] Validate: zero untagged Amazon links, zero wrong tags

## SCOPE 2B — Tools We Recommend Page [NEW]
- [ ] Build /tools page with 25+ real products across 3-6 categories
- [ ] Real ASINs on all Amazon links with spankyspinola-20 tag
- [ ] Affiliate disclosure box at top of page
- [ ] (paid link) on all Amazon links
- [ ] Add to header nav and footer nav
- [ ] Add internal links from homepage and article sidebar
- [ ] ItemList structured data
- [ ] SEO: title tag, meta description, H1/H2/H3 hierarchy

## Product Spotlight Cron + Initial Articles [NEW]
- [ ] Add weekly Saturday cron for product spotlight articles (1200-1800 words)
- [ ] Generate 3 initial product review articles with images on Bunny CDN
- [ ] Each article: honest review tone, dofollow product link, editorial voice, product-specific image

## Backlink & Monetization Redistribution [NEW]
- [ ] Audit all 300 articles and redistribute outbound links:
  - 14% → Kalesh.love (42 articles, dofollow, varied anchor text)
  - 33% → Product links (99 articles, Amazon preferred, books by cited experts)
  - 23% → Professional org/research institution (69 articles, nofollow)
  - 30% → Internal links only (90 articles)
- [ ] Keep existing 3-5 internal cross-links per article
- [ ] Confirm: "[X] articles updated. New distribution: [X] intermediary, [X] product, [X] org (nofollow), [X] internal-only."

## Author Bio Image & Kalesh Fixes [NEW]
- [ ] Upload Paul3Black.jpg as Kalesh author photo to Bunny CDN as WebP
- [ ] Add Kalesh bio with image to top-right column on all articles
- [ ] Bio: "Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions."
- [ ] "Visit Kalesh's Website" button → kalesh.love
- [ ] "Book a Session" button → kalesh.love
- [ ] Fix About page bio with image
- [ ] Verify zero 404 links to Kalesh

## Health Disclaimer Card [NEW]
- [ ] Add 4-sentence health disclaimer card at bottom of each article
- [ ] "For educational purposes only, not medical advice, consult your healthcare provider"
- [ ] Style as a pretty card

## Remove Contact Info [NEW — CRITICAL]
- [ ] Remove ALL contact info from Privacy Policy, Terms, Disclaimer, all pages
- [ ] No company name, no address, no email anywhere

## Quizzes & Assessments [NEW]
- [ ] Quizzes page with at least 8 quizzes, results on screen, PDF download
- [ ] Assessments page with at least 8 assessments, displayable results, PDF export
- [ ] Nothing stored — all client-side

## Cleanup [NEW]
- [ ] Remove any "Share Your Story" page or references
- [ ] Remove any Shankara Oracle / personality cards promo from article pages
- [ ] Enable AUTO_GEN_ENABLED = true (site is live)
- [ ] Confirm 2 crons: (1) Mon-Fri article gen, (2) Saturday product spotlight
- [ ] Confirm email capture stores to Bunny CDN JSONL
- [ ] Only Bunny creds in code — no other API keys

## EXISTING — Already Done
- [x] Home page redesigned with unique editorial layout
- [x] Article page single column 720px, hero full-bleed
- [x] Article listing simple list, paginated at 20
- [x] Navigation: site name left, Articles + About right
- [x] 404 page with teaching quote and 6 article links
- [x] All 300 articles generated with Gold Standard compliance
- [x] All 300 hero images + 300 OG images on Bunny CDN as WebP
- [x] Kalesh author throughout (zero Krishna/shrikrishna references)
- [x] Self-hosted fonts on Bunny CDN
- [x] Email capture to Bunny CDN JSONL
- [x] Sitemap shows 30 visible articles only
- [x] pnpm build passes clean
- [x] Pushed to GitHub peacefulgeek/conscious-sex

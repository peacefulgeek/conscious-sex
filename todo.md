# Sacred Fire Intimacy — TODO

## HOME PAGE REDESIGN (User demanded unique, artistic, not cookie-cutter)
- [ ] Completely restructure home page — NO featured+sidebar+grid pattern
- [ ] Render template says: NO hero image. Large-type pull quote from latest article (48-64px) on clean background
- [ ] Latest 3 articles as full-width text blocks — title, 3-line excerpt, reading time, date. No images on homepage
- [ ] 5 category links as simple text with article counts. Not cards
- [ ] Footer: minimal — privacy, terms, email one-liner
- [ ] Make it unique, artistic, joyful, spiritually delicious, sensual — undetectable as network site

## ARTICLE PAGE — RENDER TEMPLATE COMPLIANCE
- [ ] SINGLE COLUMN. No sidebar. Max-width 720px centered
- [ ] Hero image full-bleed above title. Title below hero
- [ ] NO Table of Contents
- [ ] Author bio INLINE at bottom before cross-links — NOT sidebar card
- [ ] "About Kalesh" in body font, 2 sentences, link to kalesh.love
- [ ] Cross-links: "More from [Category]" — 3 title-only links. No thumbnails
- [ ] Share buttons: floating left margin on desktop, bottom on mobile
- [ ] Body: min 20px, line-height 1.8, paragraph spacing 1.5em

## ARTICLE LISTING — RENDER TEMPLATE
- [ ] Simple list. Title + date + reading time + category tag. One per row. No cards. No images. Paginated at 20

## NAVIGATION — RENDER TEMPLATE
- [ ] Top-left: site name in text. Top-right: "Articles" "About" only
- [ ] NO hamburger menu on mobile

## 404 PAGE
- [ ] Single column. Teaching quote. 6 article links as text
- [ ] Returns HTTP 404 status (NOT 200)
- [ ] No Kalesh references

## POST-BUILD CHECK 1: EMAIL STORAGE
- [ ] Email form writes to Bunny CDN /data/subscribers.jsonl
- [ ] Zero MailerLite/SMTP2GO/TiDB/DATABASE_URL/getDb references
- [ ] grep validation passes

## POST-BUILD CHECK 2: AUTH CLEANUP
- [ ] Zero OAuth/login/signin/session/magic.link/drizzle references
- [ ] No user accounts, no auth middleware

## POST-BUILD CHECK 3: CRON + MANUS CLEANUP
- [ ] Build scripts/generate-articles.mjs, cron-worker.mjs, start-with-cron.mjs
- [ ] AUTO_GEN_ENABLED = false
- [ ] Remove vite-plugin-manus-runtime from package.json and vite.config.ts
- [ ] Delete __manus__ directory and debug-collector.js
- [ ] Replace forge.manus.im with Anthropic API (api.anthropic.com, Claude 4.6 Sonnet)
- [ ] grep -ri "manus" returns zero

## POST-BUILD CHECK 4: IMAGE AUDIT
- [ ] All 300 hero images on Bunny CDN, zero 404s
- [ ] Zero unsplash.com, zero Manus CDN references
- [ ] grep validation passes

## POST-BUILD CHECK 5: 404 PAGE
- [ ] Returns HTTP 404 status
- [ ] Teaching + 6 article links. Branded. No Kalesh

## POST-BUILD CHECK 6: SITEMAP + PRIVACY
- [ ] Sitemap lists 30 visible articles only at launch
- [ ] RSS matches
- [ ] Privacy references Bunny CDN
- [ ] Cookie consent banner present

## POST-BUILD CHECK 7: FONTS
- [ ] Self-hosted on Bunny CDN via @font-face
- [ ] Zero googleapis, zero CloudFront, zero analytics scripts
- [ ] grep validation passes

## POST-BUILD CHECK 8: KRISHNA BIO
- [ ] "Kalesh — Consciousness Teacher & Writer" only. 40 words max
- [ ] Link to kalesh.love
- [ ] Zero clairvoyant/psychic/contact forms/emails displayed
- [ ] grep validation passes

## POST-BUILD CHECK 9: DYNAMIC ARTICLE COUNT
- [ ] All article counts use published/visible count, not total
- [ ] No inflated numbers

## POST-BUILD CHECK 10: BUILD + DEPLOY
- [ ] pnpm install && pnpm build succeeds
- [ ] Push to GitHub
- [ ] Render deploys successfully
- [ ] Site loads at live domain

## CREDENTIAL SECURITY
- [ ] No API keys in code (except Bunny CDN)
- [ ] grep -ri "sk-ant-api\|ghp_\|eyJ0eXA\|api-29ED\|7cb4cd97" returns zero
- [ ] node_modules NOT in git

## RENDER DEPLOY CONFIG
- [ ] Build Command: pnpm install && pnpm build
- [ ] Start Command: NODE_ENV=production node scripts/start-with-cron.mjs
- [ ] No railway.json in repo
- [ ] Env vars: ANTHROPIC_API_KEY, FAL_KEY, GH_PAT, NODE_ENV=production in Render dashboard

## FINAL CONFIRMATION FORMAT (9 sentences only)
- [ ] Deliver exactly the 9-sentence format from the Render template

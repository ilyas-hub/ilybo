# IlyBo Website — Comprehensive Pre-Launch Review

## Context
IlyBo is a software & AI solutions agency marketing website built with React 19 + Vite (frontend) and Express 5 + MongoDB (backend). The site is a single-page portfolio with an admin CMS, lead capture system, 13-step project wizard, and 11 major homepage sections. This review evaluates launch-readiness for lead generation, trust, and client acquisition.

---

## 1. UI & UX Issues (28 findings)

### CRITICAL

**1.1 — Hero section code editor is meaningless to target clients**
The right-side animated code editor showing TypeScript code (`import { IlyBo } from "@ilybo/secure"`) speaks to developers, not to business owners who are the actual buyers. A business decision-maker sees a wall of code and gains zero value. Replace with a product mockup, client results visualization, or video showing before/after transformations.
`hero-section.tsx:8-23` (CODE_LINES), `hero-section.tsx:237-363` (CodeEditor component)

**1.2 — 13-step project wizard is excessively long**
The wizard has 13 steps (welcome → project → industry → audience → service → features → design → timeline → budget → inspiration → company → contact → complete). Industry benchmarks show form abandonment increases ~10% per additional field. Expected drop-off: 80%+. Consolidate to 4-5 steps maximum or offer a "quick inquiry" alternative.
`project-wizard-section.tsx:159-173` (STEPS array)

**1.3 — No visible focus indicators on ANY interactive element**
Across every section, buttons and links use `hover:` styles but zero `focus:` styles. Keyboard-only users see no visual indication of what is focused. This is a WCAG 2.1 Level A failure affecting all interactive elements site-wide.
Example: `navbar.tsx:62-73` — nav links have hover but no focus ring. Same pattern in every section.

**1.4 — Mobile menu has no focus trap**
When the mobile hamburger menu opens (`navbar.tsx:114-185`), users can Tab behind the overlay into the hidden page content. No focus-trap library is used. Screen reader and keyboard users can interact with elements they cannot see.

### HIGH

**1.5 — Inconsistent stat claims across the page**
- Hero badge: "Partnered with 100+ brands globally"
- Hero social proof: "50+ happy clients"
- Stats section: "30+ Happy Clients"
- About section: "Happy Clients (30+)"
These contradictions (100+ brands vs 30+ clients) destroy credibility. A prospect who notices this will question every claim.
`hero-section.tsx:390-391`, `stats-section.tsx:5-10`, `about-section.tsx:94`

**1.6 — Portfolio project thumbnails are external Freepik CDN links**
All 15 portfolio project images use `https://img.freepik.com/free-vector/...` URLs in seed data. These could break at any time (hotlink policy changes, CDN outages), leaving the portfolio section image-less. Must self-host portfolio images.
`backend/src/seeds/data/portfolio-projects.data.ts`

**1.7 — Mobile navigation lacks "Portfolio/Projects" link**
Navigation only has: How It Works, Services, About, Contact. No direct link to the Projects section — the most important trust-building section for an agency. Users must scroll to find it.
`shared/constants/navigation.ts:1-6`

**1.8 — Cookie consent banner overlaps floating contact buttons**
`FloatingContact` at `bottom-24 right-6` (z-40) vs `CookieConsent` at `bottom-0 inset-x-0` (z-50). On mobile, these overlap, blocking the primary floating CTAs.
`floating-contact.tsx:54`, `cookie-consent.tsx:35`

**1.9 — Yellow background throughout entire page causes eye fatigue**
Primary color `hsl(48 100% 62%)` — a saturated yellow — is used as background for hero, stats, contact, footer, and more. Extended reading on saturated yellow causes strain. Professional agencies use white/neutral backgrounds with brand colors as accents.
`index.css:15` (--primary definition)

**1.10 — Touch targets below 44x44px minimum in multiple locations**
- Services close button: `h-9 w-9` = 36px (below 44px) — `services-section.tsx:232`
- Journey progress dots: `h-1` height — `journey-section.tsx:304-309`
- Review dot indicators: `h-2 w-2` = 8px — `reviews-section.tsx:150-157`
- Journey nav buttons: text-only "Back/Next" with no padding — `journey-section.tsx:280-285`
WCAG 2.5.5 requires minimum 44x44px touch targets.

**1.11 — 50+ icons missing aria-labels site-wide**
Lucide icons across every section have no `aria-label` or `aria-hidden`. Screen readers announce nothing useful for these icons. Critical offenders:
- Star ratings in hero (5 stars, no "5 out of 5 stars" label) — `hero-section.tsx:475-477`
- All service card icons — `services-section.tsx:182`
- All contact info icons — `contact-section.tsx:87`
- Navigation chevrons in reviews — `reviews-section.tsx:141,167`
- FAQ expand/collapse icons — `faq-section.tsx:62`
- Tech stack icons (14+ icons) — `tech-stack-section.tsx:95,166`

**1.12 — Color contrast failures in footer and multiple sections**
`text-black/70` on yellow primary background (`hsl(48 100% 62%)`) likely fails WCAG AA contrast ratio (4.5:1 for normal text). Affected locations:
- Footer body text — `footer.tsx:46,107`
- Footer link hover state — `footer.tsx:54,61,66`
- Contact section placeholders — `contact-section.tsx:196,211,225,240` (`text-black/40` on light bg)
- Journey section: `text-white/40` on colored backgrounds — `journey-section.tsx:240`
- Reviews: `text-black/50` on white — `reviews-section.tsx:117`

### MEDIUM

**1.13 — No skip-to-content link for keyboard/screen reader users**
WCAG 2.1 Level A requirement. Missing entirely.
`routes/__root.tsx`

**1.14 — Scrolled navbar text uses `text-primary` (yellow on dark)**
When scrolled, navbar becomes `bg-black/85` with links as `text-primary` (yellow). Yellow-on-dark-transparent has questionable contrast.
`navbar.tsx:67`

**1.15 — Service cards expand inline, collapsing other cards**
Only one card expandable at a time. Clicking a new card collapses the previous one — disorienting, users lose reading context.
`services-section.tsx:128-132`

**1.16 — Footer newsletter form does nothing**
`handleSubscribe` in `footer.tsx:28-35` sets `isSubscribed = true` and shows "Thanks for subscribing!" but never sends the email anywhere. No API call, no integration. This is a fake form.

**1.17 — Contact info cards show text-only, not clickable links**
Email and phone in contact section cards are `<p>` text, not `<a>` tags. Users must manually copy.
`contact-section.tsx:90-93, 115-117`

**1.18 — Budget displayed only in Indian Rupees (₹)**
Wizard budget options: ₹50K - ₹2L, ₹2L - ₹5L, etc. If targeting "100+ brands globally," this signals a local-only operation.
`project-wizard-section.tsx:151-157`

**1.19 — FAQ section missing `aria-expanded` and `aria-controls`**
FAQ accordion buttons don't communicate open/closed state to screen readers. No `aria-expanded` attribute on buttons, no `aria-controls` linking buttons to content panels.
`faq-section.tsx:45-67`

**1.20 — No `prefers-reduced-motion` support**
Every section uses infinite Framer Motion animations (rotations, bounces, pulses, floats). Users with vestibular disorders or motion sensitivity preferences are not respected. No `prefers-reduced-motion` media query or Framer Motion `useReducedMotion` hook used anywhere.

**1.21 — Stats counter uses `setInterval` instead of `requestAnimationFrame`**
Stats section counter animation runs on 16ms `setInterval` — will drift and cause dropped frames. Should use `requestAnimationFrame` for smooth 60fps animation.
`stats-section.tsx:23-31`

**1.22 — Services section close button has wrong aria-label**
Close button labeled `aria-label="Back to top"` when it should be "Close service details" or similar.
`services-section.tsx:236`

### LOW

**1.23 — "assests" directory misspelled (should be "assets")**
`/frontend/src/assests/` — reflects attention to detail if exposed in build output URLs.

**1.24 — Back-to-top button and floating contact compete for space**
Both at bottom-right on mobile. Positioned at `bottom-6 left-6` (back-to-top) and `bottom-24 right-6` (floating contact), but on small screens they crowd the viewport.
`back-to-top.tsx:29`, `floating-contact.tsx:54`

**1.25 — Dark mode defined in CSS but no toggle exposed**
`.dark` theme variables exist in `index.css:41-67` but no UI toggle. Dead code that adds maintenance burden.

**1.26 — Hero code editor `min-h-[320px]` may overflow on very small screens**
The code editor container has a fixed minimum height that could push content below the fold on short mobile viewports (e.g., iPhone SE landscape).
`hero-section.tsx:262`

**1.27 — Journey section progress dots too small for touch interaction**
Step pills at bottom of journey carousel have `h-1` height progress bars inside tiny button areas. Nearly impossible to tap accurately on mobile.
`journey-section.tsx:289-310`

**1.28 — Tech stack marquee runs continuously — CPU overhead on mobile**
Two marquee rows animate at 30s and 35s duration continuously with triplicated arrays (`[...techs, ...techs, ...techs]`). On mobile, this continuous animation drains battery and CPU.
`tech-stack-section.tsx:185-186`

---

## 2. Content & Copywriting Issues (18 findings)

### CRITICAL

**2.1 — No real case studies, client logos, or named testimonials**
Reviews section uses generic names (Rahul Mehta, Priya Sharma, Amit Patel) with initials-only avatars. No photos, no linked companies, no verifiable details. For an agency asking ₹15L+ per project, this is a major trust gap. Prospects need verifiable social proof.
`reviews-section.tsx` (FALLBACK_REVIEWS)

**2.2 — Value proposition is generic and undifferentiated**
"Build Digital Products That Matter" and "Your vision deserves more than code" could describe any of 50,000 dev agencies. No unique selling proposition. What makes IlyBo different from Toptal, Thoughtbot, or a random Upwork team? The copy doesn't answer this.
`hero-section.tsx:401-407`

**2.3 — 15 seed portfolio projects have suspiciously specific metrics**
Seed data includes claims like "60% admin time reduction," "94% satisfaction," "10x faster report generation," "300% faster booking" across all 15 projects. Every single project has a glowing testimonial from a named executive. This level of detail on fake data will be immediately recognized as fabricated by any experienced buyer.
`backend/src/seeds/data/portfolio-projects.data.ts`

### HIGH

**2.4 — Service claims are unverifiable and bold**
Claims like "99.9% uptime guarantee," "Sub-second load times," "4.8+ avg store rating," "80% task automation" appear in service cards with no backing evidence, case studies, or methodology.
`services-section.tsx` (SERVICES data)

**2.5 — "Partnered with 100+ brands globally" is unsubstantiated**
Appears in hero but zero client logos shown anywhere. If true, show logos. If not true, remove immediately.
`hero-section.tsx:390-391`

**2.6 — FAQ pricing mentions ₹50K and ₹15L+ but no pricing page exists**
Mentioning prices without context (scope definitions, what's included) creates more questions than answers.
`faq-section.tsx` (FALLBACK_FAQS)

**2.7 — "Building Digital Excellence Since 2019" conflicts with "5+ Years Experience"**
2019 to 2026 = 7 years, but stats say "5+." These should be consistent. Also, "since 2019" + "50+ projects" = ~7 projects/year, which is modest.
`about-section.tsx:94`, `stats-section.tsx:5`

**2.8 — CTA language is inconsistent across the page**
At least 6 different CTA wordings: "Get Started" (navbar), "Start Your Project" (hero, wizard section), "Start a Project" (service cards), "Start Your Journey" (journey section), "Let's Talk About Your Project" (services bottom), "Contact Us" (FAQ). Inconsistent CTAs dilute the primary action.

### MEDIUM

**2.9 — No "About the Team" section with real people**
Zero human faces, team member bios, or founder story. Agencies sell trust and relationships. This is a significant credibility gap.

**2.10 — Journey section has 7 steps — too many for a glance**
Most agency process sections show 3-5 steps. Seven looks bureaucratic.
`journey-section.tsx` (JOURNEY_STEPS)

**2.11 — No industry-specific landing content**
12 industries listed in wizard but no dedicated content for any. Industry-targeted content improves conversion dramatically.

**2.12 — Meta description is generic**
`"Ilybo - Professional Software Development Agency"` — doesn't include keywords, services, or differentiators. Poor for SEO CTR.
`frontend/index.html:7`

**2.13 — Service card descriptions inconsistent in depth and tone**
Some are 1-2 sentences ("Custom web applications built with modern frameworks."), others are paragraphs. "When off-the-shelf doesn't cut it, we build custom." breaks the professional tone with colloquial language.
`services-section.tsx:24,75`

**2.14 — Stats section grammar: "Years Experience" should be "Years of Experience"**
`stats-section.tsx:6`

### LOW

**2.15 — "IlyBo" brand name has no explanation or meaning**
Visitors may wonder what the name means. A brief brand story would build connection.

**2.16 — Social media links point to auto-generated profiles**
Twitter: `@IlyBo37352`, LinkedIn: `/in/ilybo-dev-8309763ab/`. These signal a brand-new or inactive presence.
`shared/constants/navigation.ts:22-26`

**2.17 — Fallback testimonials mention "IlyBo" by name repeatedly**
If API returns no data, fallback reviews say "IlyBo transformed our startup..." — felt as fake placeholder content to savvy visitors.
`reviews-section.tsx` (FALLBACK_REVIEWS)

**2.18 — Contact section says "We'll get back to you within 24 hours" — no timezone context**
If targeting global clients, "24 hours" relative to what? Business days or calendar days?
`contact-section.tsx:180`

---

## 3. Conversion & CRO Issues (13 findings)

### CRITICAL

**3.1 — Two competing lead capture forms create confusion**
Both the Contact form (bottom of page) and Project Wizard (13-step modal) submit to `/leads`. No guidance on which to use. The wizard is the primary CTA but the contact form is simpler. This split reduces overall conversions.

**3.2 — No lead magnet, free resource, or low-commitment entry point**
Every CTA asks for a project inquiry. No intermediate step for visitors not ready to buy — no free consultation booking (Calendly only shows if admin configures it), no downloadable resource, no newsletter (footer form is fake). All top-of-funnel traffic is lost.

### HIGH

**3.3 — "Get Started" button opens a 13-step wizard instead of a simple form**
Primary navbar and hero CTAs both trigger the full wizard. For a visitor wanting to ask a quick question, this is a massive barrier.

**3.4 — No phone number or WhatsApp visible in the header/hero**
For an Indian agency targeting businesses, phone/WhatsApp availability is a key trust signal. Floating WhatsApp only appears if CMS-configured. Default phone is a placeholder.
`floating-contact.tsx:14-19`

**3.5 — Contact form has no phone number field**
Collects name, email, company, message — no phone. For B2B lead qualification, phone is critical.
`contact-section.tsx:183-262`

**3.6 — No confirmation email sent after lead submission**
Lead stored in MongoDB but no email sent to the prospect. No confirmation they were heard — reducing trust and follow-through. The Nodemailer setup exists but is only used for password resets.
`backend/src/modules/leads/lead.service.ts`

**3.7 — No admin notification email on new lead**
When a lead comes in, the only way to see it is to check the admin panel manually. No email/Slack/webhook notification to the business owner. Hot leads could sit unseen for hours or days.

### MEDIUM

**3.8 — Success message disappears without next steps**
After form submission: "We'll get back to you within 24 hours" with no next action (book a call, follow us, check email). After wizard: "Done" just closes the modal.

**3.9 — Footer "Privacy Policy" and "Terms of Service" link to `#`**
Essential trust signals for business prospects. Linking to nothing is worse than not having them.
`footer.tsx:173-178`

**3.10 — No exit-intent or scroll-triggered lead capture**
All lead capture is manual (user must click CTA). No behavioral triggers for visitors about to leave.

**3.11 — Wizard doesn't save partial progress**
If a user completes 10 of 13 steps and accidentally closes the modal, all data is lost. No localStorage persistence of partial wizard state.
`project-wizard-section.tsx:1317-1338` (handleClose resets everything)

**3.12 — No social proof near CTAs**
"Start Your Project" buttons appear without nearby trust indicators. Adding "Join 50+ happy clients" near CTAs increases conversion.

### LOW

**3.13 — "View Case Study" text hidden until hover on project cards**
Link text appears only on mouse hover (`projects-section.tsx`). On mobile, there's no hover — this link may be undiscoverable.

---

## 4. Functional & QA Issues (18 findings)

### CRITICAL

**4.1 — XSS vulnerability in dynamic page rendering**
`pages.$slug.tsx:39` uses `dangerouslySetInnerHTML={{ __html: page.content }}` without sanitization. Any HTML/script stored in CMS pages can execute arbitrary JavaScript. Must use DOMPurify or similar.
`frontend/src/routes/pages.$slug.tsx:39`

**4.2 — Footer newsletter form is completely non-functional**
`footer.tsx:28-35` — `handleSubscribe` sets state locally but sends nothing. Users think they've subscribed but haven't. Deceptive UX.

**4.3 — Footer service links all point to `href="#"` (dead links)**
`navigation.ts:16-19` — Web Development, Mobile Apps, UI/UX Design, Cloud Solutions all link to `#`. Clicking does nothing.

### HIGH

**4.4 — Privacy Policy and Terms of Service are dead links (`href="#"`)**
`footer.tsx:173-178` — Legally required pages link nowhere.

**4.5 — Contact email/phone display as text, not links, in contact cards**
`contact-section.tsx:90-93` — Email/phone show as `<p>` text, not `mailto:`/`tel:` links. Footer does have proper links but the main contact section doesn't.

**4.6 — Placeholder contact data in production code**
- Email: `hello@ilybo.com` (verify if real)
- Phone: `+91 98765 43210` (clearly placeholder)
- Location: "Mumbai, India"
Must be verified or replaced before launch.

**4.7 — Page slug uniqueness check missing on update**
`backend/src/modules/pages/page.service.ts:34-36` — Slug uniqueness enforced only on creation, not on update. Two pages could end up with the same slug, causing routing conflicts.

**4.8 — Portfolio project images use external Freepik CDN (can break)**
All 15 project thumbnails link to `img.freepik.com`. Freepik may block hotlinking or change URLs. Self-host these images.
`backend/src/seeds/data/portfolio-projects.data.ts`

### MEDIUM

**4.9 — "Manage Preferences" cookie button does nothing meaningful**
`cookie-consent.tsx:24-28` — `manage()` stores "managed" in localStorage, same as accept. No actual preference management. GDPR compliance gap.

**4.10 — Wizard doesn't validate email format on frontend**
`ContactStep` checks `data.email.trim()` is truthy but no regex/pattern validation. Invalid emails caught only by backend Zod, returning a generic error.
`project-wizard-section.tsx:1005`

**4.11 — No loading state for services section**
Services section has no loading skeleton. If API fails or loads slowly, nothing indicates loading. Contrast with projects, reviews, and FAQ sections which do have skeleton loaders.

**4.12 — No error state for reviews and FAQ sections**
If API calls fail, these sections silently fall back to hardcoded data. No user-visible error indication and no retry mechanism.

**4.13 — Admin delete confirmation uses native `confirm()` in projects table**
`features/admin/components/projects-table.tsx:52` uses browser's `confirm()` instead of the `AlertDialog` component used in other admin tables. Inconsistent UX.

**4.14 — Leads table pagination doesn't reset when filters change**
When admin changes status filter in leads table, the page number stays the same (e.g., page 5). Should reset to page 1 on filter change.

**4.15 — Services section close button setTimeout has no cleanup**
`services-section.tsx:309` — `setTimeout(() => openProjectWizard(), 300)` inside click handler has no cleanup if component unmounts. Potential memory leak.

### LOW

**4.16 — Social link for Twitter/X uses auto-generated handle**
`x.com/IlyBo37352` — unprofessional vanity URL.

**4.17 — Index-based React keys in several places**
`hero-section.tsx:221,460,475` — Using array index as key (`key={i}`) instead of stable identifiers. Potential rendering issues if lists change.

**4.18 — CORS origin splitting doesn't trim whitespace**
`backend/src/app.ts:64` — `env.CORS_ORIGINS.split(',')` doesn't `.map(o => o.trim())`. A space in the .env value (`http://localhost:5173, https://ilybo.com`) would cause CORS failures.

---

## 5. Performance & Technical Quality Issues (16 findings)

### HIGH

**5.1 — No image optimization pipeline**
Images are plain JPEGs from `/assests/`. No WebP, no responsive `srcset`, no `loading="lazy"`, no CDN. Portfolio project images are external CDN links that can break.

**5.2 — SPA with no SSR/SSG means poor initial SEO**
React + Vite is purely client-side rendered. Crawlers see `<div id="root"></div>`. One meta description for entire site. No dynamic meta tags per section.
`frontend/index.html:7-8`

**5.3 — Framer Motion imported in every component — heavy JS bundle**
Every section imports `motion` from `motion/react`. Animation library + all section components load upfront. No code splitting per section. Impacts Time-to-Interactive.

**5.4 — No robots.txt or sitemap.xml**
Search engines have no guidance on crawling. Reduced indexation.

**5.5 — Inter font declared but never loaded**
`font-family: 'Inter'` in CSS (`index.css:131`) but no `<link>` in `index.html`, no `@font-face` declaration, no Google Fonts import. Font falls back to `system-ui`. Typography differs from design intent.

**5.6 — Project wizard is 1,587 lines loaded upfront**
`project-wizard-section.tsx` — entire component loaded even if wizard is never opened. Should be lazy-loaded via `React.lazy()` and `Suspense`.

**5.7 — Tech stack marquee creates continuous repaints**
Two marquee rows with `animation: marquee 30s linear infinite` using triplicated arrays. Continuous CSS transforms cause repaints. On low-end mobile devices, this degrades scrolling performance.
`tech-stack-section.tsx:185-186`

### MEDIUM

**5.8 — No Open Graph / Twitter Card meta tags**
When shared on LinkedIn, Twitter, or Slack, the site shows a generic preview. No OG image, title, or description.
`frontend/index.html`

**5.9 — No error boundary for section components**
If any section fails to render (API error, data issue), the entire page crashes. No `ErrorBoundary` wrapper.

**5.10 — Journey section progress animation uses 16ms interval, not rAF**
`journey-section.tsx:111` — Progress animation runs via `setTimeout(..., 16)` with recursive calls. Should use `requestAnimationFrame` for frame-accurate, battery-efficient animation.

**5.11 — No Lighthouse or Core Web Vitals monitoring**
No Vercel Analytics, no web-vitals library, no performance monitoring configured. Can't measure LCP, FID, CLS in production.

**5.12 — Body size limit is 10kb — may be too restrictive**
`backend/src/app.ts:73` — `express.json({ limit: '10kb' })`. Wizard submissions with long project descriptions could exceed this. The wizard message field concatenates all 13 steps of data into one string.

### LOW

**5.13 — Console index-key warnings expected at runtime**
Multiple components use array index as React key (`hero-section.tsx:221,460,475`). React will warn about this in development console.

**5.14 — TypeScript `as unknown as` type coercion in page service**
`backend/src/modules/pages/page.service.ts:88,152` — Using `as unknown as` for type casting. Could mask runtime type errors.

**5.15 — No compression configured for static assets**
Backend uses `compression` middleware for API responses, but frontend Vite build doesn't configure gzip/brotli pre-compression for static assets.

**5.16 — Multiple `setTimeout` calls without cleanup on unmount**
`footer.tsx:33`, `services-section.tsx:309`, `contact-section.tsx:33` — setTimeout inside components without cleanup in useEffect return. Can cause state updates on unmounted components.

---

## 6. Security & Safety Issues (16 findings)

### CRITICAL

**6.1 — MongoDB credentials hardcoded in `.env` file**
`backend/.env` contains full Atlas connection string with password.
If `.env` is committed to git or deployed publicly, the database is fully exposed.

**6.2 — Admin credentials hardcoded in source code**
`backend/src/seeds/admin.seed.ts` contains hardcoded admin emails and weak passwords committed to source code.

**6.3 — JWT secret is a predictable string**
`JWT_SECRET=your-super-secret-jwt-key-32chars` — literal placeholder value, not a cryptographic secret. Anyone can forge JWT tokens with this.

**6.4 — XSS vulnerability via `dangerouslySetInnerHTML` in CMS pages**
`pages.$slug.tsx:39` renders CMS page content as raw HTML without sanitization. If admin creates a page with `<script>` tags (or if the admin account is compromised), arbitrary JS executes for all visitors.

### HIGH

**6.5 — No rate limiting on lead/contact form submission**
`lead.routes.ts:15` — `POST /leads` has no rate limiter. Auth routes have rate limiting (10/hour login, 5/hour password reset) but lead creation is unprotected. Bots can flood the database.

**6.6 — No CAPTCHA or honeypot on any public form**
Neither the contact form nor the 13-step wizard has any bot protection. No reCAPTCHA, hCaptcha, or honeypot field. Easy target for automated spam.

**6.7 — No CSRF protection implemented**
No CSRF tokens on any form. The public lead submission endpoint is particularly vulnerable since it requires no authentication.

**6.8 — CORS allows only localhost origin**
`CORS_ORIGINS=http://localhost:5173` — must be updated to production domain before launch or all API calls fail.
`backend/.env`

**6.9 — Access tokens stored in localStorage (vulnerable to XSS)**
`features/auth/store/auth-store.ts:36-37` — `localStorage.setItem('accessToken', ...)`. If the XSS in 6.4 is exploited, tokens are trivially stolen. HttpOnly cookies would be more secure.

**6.10 — Lead messages not sanitized before storage**
`backend/src/modules/leads/lead.service.ts:34` — `Lead.create(data)` stores raw user input. If displayed in admin panel without escaping (and admin panel does render message content), stored XSS is possible.

### MEDIUM

**6.11 — OTP exposed in development API responses**
`auth.service.ts:122-133` — In dev mode, actual OTP returned in HTTP response `_dev.otp`. If production NODE_ENV isn't correctly set, this becomes a security vulnerability.

**6.12 — Dev mode OTP also displayed in admin login UI**
`routes/admin/login.tsx:163-167` — Frontend explicitly renders `{devOtp}` in a blue box. If `NODE_ENV` isn't properly set, login OTP is visible on-screen.

**6.13 — No Content Security Policy headers**
Helmet is used but no explicit CSP configured. Third-party script injection risks remain.

**6.14 — Cookie consent doesn't actually manage cookies**
Banner stores consent in localStorage but doesn't conditionally load any tracking scripts. If analytics/tracking added later, consent mechanism needs real implementation.

**6.15 — SMTP credentials optional — email silently fails**
`backend/src/config/env.ts` — `SMTP_USER` and `SMTP_PASS` are `z.string().optional()`. In production, if not set, email (password resets) silently fails with no visible error to users.

### LOW

**6.16 — No security headers for clickjacking protection beyond Helmet defaults**
No explicit `X-Frame-Options` or `frame-ancestors` CSP. The admin panel could potentially be embedded in iframes for clickjacking attacks.

---

## 7. Business & Brand Gaps (14 findings)

### CRITICAL

**7.1 — No Privacy Policy page**
Required by law in EU (GDPR), India (DPDP Act 2023), and many other jurisdictions. Footer links to `#`. Must exist before launch.

**7.2 — No Terms of Service page**
Standard legal requirement for any business website accepting inquiries.

**7.3 — No real client testimonials or case studies**
For an agency charging ₹15L+ per project, zero verifiable client proof is a deal-breaker. Need at minimum 3 real testimonials with photos and company names, ideally 2-3 detailed case studies.

### HIGH

**7.4 — No dedicated "About Us" page with team bios**
The about section is a small card on the homepage. No team photos, no founder story, no company history, no values. Clients hire people, not websites.

**7.5 — No blog or thought leadership content**
Zero organic SEO traffic potential, no authority demonstration, no social media content, no email nurture content.

**7.6 — No individual service pages**
9 services as expandable cards but no dedicated pages. Service pages are critical for SEO ("web development agency Mumbai") and for prospects researching specific needs.

**7.7 — Missing "Careers" or "Join Us" page**
Signals growth and team strength to prospects.

**7.8 — No client logo strip or "Trusted By" section**
Industry standard for agency websites. Completely absent despite claiming "100+ brands globally."

### MEDIUM

**7.9 — No client onboarding or engagement model documentation**
Journey section exists but no details on pricing models (fixed-price vs T&M vs retainer), SLAs, or what happens after signing.

**7.10 — Single-page architecture limits SEO potential**
All content on one page = one URL for every keyword. Individual pages for services, case studies, blog posts would improve search visibility significantly.

**7.11 — No 404 page**
If a user navigates to a non-existent route, TanStack Router shows a default error. No branded 404 page with navigation back to the homepage.

**7.12 — No social proof widgets (Clutch, GoodFirms, Google Reviews)**
No third-party review platform badges. These are standard trust signals for agencies.

### LOW

**7.13 — No sitemap for the CMS pages**
CMS pages (`/pages/:slug`) exist but aren't included in any sitemap. Search engines won't discover them.

**7.14 — Admin panel has no audit log**
Settings changes are saved immediately with no record of who changed what or when. Important for multi-admin setups.

---

## 8. Admin Panel Issues (8 findings)

### HIGH

**8.1 — No admin notification system for new leads**
Leads only visible by manually checking admin panel. No email, Slack, or push notification when a new lead arrives. Hot leads could sit unseen for hours.

**8.2 — No data export functionality**
Admin can view leads, projects, etc. but cannot export to CSV/Excel. Basic requirement for any CRM-adjacent tool.

### MEDIUM

**8.3 — Inconsistent delete confirmation patterns**
Projects table uses native `confirm()` (`projects-table.tsx:52`) while other tables use the proper `AlertDialog` component. Inconsistent UX.

**8.4 — Lead detail view has no quick-reply or email functionality**
Admin can see lead details and change status but cannot reply to the lead directly from the panel. Must copy email and use a separate email client.

**8.5 — No lead assignment or team collaboration features**
Single admin sees everything. No ability to assign leads to team members, add internal notes, or track follow-up status beyond basic status changes.

**8.6 — Analytics dashboard shows internal metrics only**
Admin analytics shows lead counts and project counts via Recharts charts. No Google Analytics integration, no conversion funnel tracking, no visitor metrics.

### LOW

**8.7 — Settings changes saved without confirmation dialog**
Site settings (company info, social links) are saved immediately on submit. No "Are you sure?" confirmation. No undo.

**8.8 — No pagination in services API endpoint**
`backend/src/modules/services/` — Services endpoint returns all items without pagination. Currently 9 services, but if content grows, this becomes a performance issue.

---

## Prioritized Action Plan

### Quick Wins (Low Effort, High Impact) — 18 items

| # | Action | Severity | Files |
|---|--------|----------|-------|
| 1 | Fix contradictory stat numbers (30+ vs 50+ vs 100+) | Critical | `hero-section.tsx`, `stats-section.tsx`, `about-section.tsx` |
| 2 | Replace placeholder phone `+91 98765 43210` with real number | Critical | CMS seed data |
| 3 | Fix dead footer links — services (`#`), Privacy, Terms | Critical | `navigation.ts`, `footer.tsx` |
| 4 | Generate strong random JWT secret (replace placeholder) | Critical | `backend/.env` |
| 5 | Remove hardcoded admin credentials from seed file | Critical | `admin.seed.ts` |
| 6 | Add rate limiting to `POST /leads` endpoint | High | `lead.routes.ts` |
| 7 | Update CORS to production domain | High | `backend/.env` |
| 8 | Make contact section email/phone clickable (`mailto:`/`tel:`) | High | `contact-section.tsx` |
| 9 | Add `robots.txt` and basic `sitemap.xml` | High | `frontend/public/` |
| 10 | Fix newsletter form — connect to backend or remove it | Critical | `footer.tsx` |
| 11 | Add "Projects" link to navigation | High | `navigation.ts` |
| 12 | Add Open Graph meta tags to `index.html` | Medium | `frontend/index.html` |
| 13 | Fix services close button aria-label ("Back to top" → "Close") | Medium | `services-section.tsx:236` |
| 14 | Add `aria-expanded` to FAQ accordion buttons | Medium | `faq-section.tsx` |
| 15 | Trim whitespace in CORS origin splitting | Low | `backend/src/app.ts:64` |
| 16 | Rename `/assests/` to `/assets/` | Low | Directory rename |
| 17 | Clean up social media profile URLs | Medium | Platform settings |
| 18 | Add `loading="lazy"` to all `<img>` tags | Medium | All section components |

### Medium-Effort Improvements — 20 items

| # | Action | Severity | Details |
|---|--------|----------|---------|
| 19 | Sanitize HTML in `pages.$slug.tsx` with DOMPurify | Critical | Prevent XSS — `pages.$slug.tsx:39` |
| 20 | Reduce wizard from 13 to 4-5 steps | Critical | Combine steps, reduce friction |
| 21 | Add honeypot field + rate limiting to contact form and wizard | High | Bot protection |
| 22 | Create Privacy Policy and Terms of Service pages | Critical | Use CMS pages feature |
| 23 | Add email confirmation to lead submission | High | Use existing Nodemailer |
| 24 | Add admin email notification on new lead | High | Nodemailer + lead.service.ts |
| 25 | Self-host portfolio images (replace Freepik CDN) | High | Download + store locally |
| 26 | Add phone field to contact form | Medium | `contact-section.tsx` |
| 27 | Implement image optimization (WebP, responsive srcset) | High | Vite image plugins or CDN |
| 28 | Lazy-load wizard component (code-split) | Medium | `React.lazy()` + Suspense |
| 29 | Add skip-to-content link | Medium | `__root.tsx` |
| 30 | Add focus indicators (`focus-visible:ring-2`) to all interactive elements | Critical | Global CSS or per-component |
| 31 | Add focus trap to mobile menu | High | Use `focus-trap-react` library |
| 32 | Add `prefers-reduced-motion` support | Medium | Framer Motion `useReducedMotion` |
| 33 | Add error boundaries for each section | Medium | Wrapper components |
| 34 | Add OG image for social sharing | Medium | Design + `index.html` |
| 35 | Fix stats counter to use `requestAnimationFrame` | Medium | `stats-section.tsx` |
| 36 | Add wizard partial-progress persistence (localStorage) | Medium | `project-wizard-section.tsx` |
| 37 | Load Inter font properly (Google Fonts or self-hosted) | Medium | `index.html` or `@font-face` |
| 38 | Add branded 404 page | Medium | New route component |

### High-Impact Strategic Enhancements — 17 items

| # | Action | Severity | Details |
|---|--------|----------|---------|
| 39 | Get 3+ real client testimonials with photos and logos | Critical | Content sourcing + design |
| 40 | Create 2-3 detailed case studies with real metrics | Critical | Content creation + new pages |
| 41 | Rewrite value proposition with clear differentiation | Critical | Copywriting |
| 42 | Replace hero code editor with client-oriented visual | Critical | Design + implementation |
| 43 | Add team/founder section with real photos | High | Content + component |
| 44 | Create individual service pages (9 services) | High | Leverages CMS pages feature |
| 45 | Add blog/insights section | High | New module + CMS |
| 46 | Add client logo strip / "Trusted By" section | High | Design + component |
| 47 | Reduce yellow saturation — use white/neutral as primary bg | High | `index.css` theme adjustment |
| 48 | Move to SSR (Next.js) or add pre-rendering for SEO | High | Architecture decision |
| 49 | Add multi-currency budget options to wizard | Medium | Internationalization |
| 50 | Create "About Us" dedicated page | High | Content + page |
| 51 | Add Clutch/GoodFirms/Google Reviews badges | Medium | Third-party integrations |
| 52 | Migrate auth tokens from localStorage to httpOnly cookies | High | Backend + frontend refactor |
| 53 | Add admin lead export (CSV) | Medium | New API endpoint + UI |
| 54 | Add admin email/reply from lead detail | Medium | Nodemailer + UI |
| 55 | Add Google Analytics or Vercel Analytics | Medium | Script integration |

---

## Verification Plan

After implementing changes:
1. **Security:** Rotate all credentials (MongoDB, JWT, admin passwords). Verify `.env` is in `.gitignore`. Run `npm audit`. Test rate limiting on `/leads`. Verify CSP headers.
2. **Forms:** Submit contact form and wizard — verify leads appear in admin, confirmation email received, admin notified.
3. **Links:** Click every link in nav, footer, service cards, and project modals — zero `#` destinations.
4. **Accessibility:** Run axe DevTools on every section. Tab through entire page — verify focus indicators visible. Test with VoiceOver/NVDA. Verify WCAG AA contrast ratios.
5. **Mobile:** Test on iPhone SE (375px), iPhone 14 (390px), Samsung Galaxy S21 (360px). Check: floating buttons, wizard scrolling, nav menu focus trap, cookie banner overlap, touch targets.
6. **SEO:** Run Lighthouse audit. Verify OG tags with Facebook Debugger, Twitter Card Validator, LinkedIn Post Inspector.
7. **Performance:** Lighthouse score target > 90. Check bundle size with `npx vite-bundle-visualizer`. Verify lazy loading of wizard. Test on 3G throttled connection.
8. **Legal:** Verify Privacy Policy and Terms pages are live and linked from footer.
9. **Content:** Have 3 non-team members read the homepage and identify what IlyBo does within 5 seconds (5-second test). Verify all stats are consistent. Verify no placeholder data visible.
10. **Cross-browser:** Test on Chrome, Firefox, Safari (macOS/iOS), Edge. Verify animations don't cause jank.

---

**Total findings: 131**
- Critical: 22
- High: 42
- Medium: 44
- Low: 23

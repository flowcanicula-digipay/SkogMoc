# Security Policy — Skog Mộc by TNP

Skog Mộc by TNP is a statically-exported Next.js marketing website (no server
runtime, no database, no user authentication, no sessions). Most of the
OWASP Top 10 either doesn't apply or is addressed by the architecture itself.
Each category is covered below with an explicit "why", so this doesn't need
re-litigating.

## Reporting a vulnerability

Email **thuyken52914@yahoo.com.vn** with details and reproduction steps. Do not open a
public GitHub issue for security concerns.

## OWASP Top 10 (2021) coverage

### A01 — Broken Access Control

Not applicable. Every page is public static HTML. There is no authentication,
no authorization, no user-specific content, and no admin interface. There is
nothing to bypass.

The only "write" paths are the two contact forms (residential project
inquiries and trade/professional inquiries), which submit directly to
Formspree (a third party). This application never receives, stores, or
serves submitted form data.

### A02 — Cryptographic Failures

No secrets, passwords, or sensitive personal data are stored or processed by
this application. Transport security (HTTPS) is enforced by:
- Hostinger's Let's Encrypt SSL certificate
- The `.htaccess` `RewriteRule` that redirects all HTTP traffic to HTTPS

The Formspree form IDs (`formspree.io/f/XXXXXXXX`) are visible in the
client-side JavaScript. This is expected and harmless — a form ID is a
routing identifier, not a secret. It does not grant access to anything.
Never commit real credentials, API keys, or private tokens to this
repository.

### A03 — Injection

No server-side code exists. No database. No template engine evaluating user
input. Injection attacks have no vector.

- `ProjectInquiryForm.tsx` and `ProfessionalInquiryForm.tsx` submit `FormData`
  directly to Formspree via `fetch()`. This application never interpolates
  user input into HTML, SQL, or shell commands.
- `SchemaJsonLd.tsx` uses `dangerouslySetInnerHTML` — but **only** with a
  hardcoded, developer-controlled object. User input is never passed to this
  component. This must never change without a security review.

### A04 — Insecure Design

Mitigations in place:

**Locale allow-listing**: `src/i18n/routing.ts` defines an explicit list of
valid locales (`['en', 'vi', 'ja']`). An unrecognised locale falls back to
`defaultLocale: 'en'` — arbitrary locale strings are never rendered.

**Form input constraints**: All fields in `ProjectInquiryForm.tsx` and
`ProfessionalInquiryForm.tsx` have `maxLength` attributes and correct `type`
values (`email`, `tel`, `text`, `textarea`). This provides basic
client-side abuse resistance. Formspree applies server-side spam filtering
independently.

**Content Security Policy**: Split across two delivery mechanisms, because
the CSP spec itself restricts what a `<meta>` tag is allowed to enforce —
this isn't a Hostinger limitation. `frame-ancestors`, `report-uri`, and
`sandbox` are ignored by browsers when delivered via `<meta>` (they silently
no-op with a console warning); every other directive works fine in `<meta>`.

1. Most directives — `<meta http-equiv="Content-Security-Policy">` in
   `src/app/[locale]/layout.tsx`:
   ```
   default-src 'none';
   script-src 'self';
   style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
   font-src 'self' https://fonts.gstatic.com;
   connect-src 'self' https://formspree.io;
   img-src 'self' data: https://images.pexels.com;
   base-uri 'self';
   form-action https://formspree.io;
   ```
2. `frame-ancestors` plus `X-Frame-Options` — real HTTP response headers set
   in `public/.htaccess` via `mod_headers` (`Header always set ...`), since
   Hostinger's Apache shared hosting *does* support this — the existing
   `Cache-Control` headers in `.htaccess` already prove it:
   ```
   Header always set X-Frame-Options "DENY"
   Header always set Content-Security-Policy "frame-ancestors 'none'"
   ```
   Browsers enforce the intersection of all applicable CSPs, so the `<meta>`
   policy and this header-based one combine rather than conflict.

If hosting ever moves to a platform with more header control (Cloudflare,
nginx, Vercel), the rest of the CSP could also move out of `<meta>` into
headers for cleaner delivery, but it isn't required for correctness.

**Note on `'unsafe-inline'` for styles**: Required because Tailwind CSS
injects critical styles inline in the static export. If this is a concern,
consider extracting critical CSS to a linked stylesheet in future builds.

### A05 — Security Misconfiguration

- `next.config.ts` uses `output: 'export'` — there is no Next.js server
  process in production to misconfigure.
- `public/.htaccess` sets `Options -Indexes` to disable directory listing.
  Without this, Hostinger's Apache would serve a browsable file listing for
  any directory without an `index.html`.
- No debug endpoints, server logs, or verbose error pages exist in the
  static output.
- Dependencies are listed in `package.json`. Run `npm audit` before every
  deployment and resolve high or critical vulnerabilities before going live.

### A06 — Vulnerable and Outdated Components

- Run `npm audit --audit-level=high` before every deployment.
- Consider enabling GitHub Dependabot (`/.github/dependabot.yml`) for
  automated weekly PRs on npm dependency updates.
- Keep Next.js, next-intl, and React on current stable major versions.
  Breaking changes are rare in patch/minor releases.

### A07 — Identification and Authentication Failures

No login, no sessions, no credentials anywhere in this application. There is
nothing to authenticate.

If a client project-status portal, mood-board login, or admin area is added
in future, do not build authentication from scratch. Use an established
provider (Auth0, Clerk, Supabase Auth). Return to this document and write a
real answer for A07 before shipping any authenticated feature.

### A08 — Software and Data Integrity Failures

- Commit `package-lock.json` (generated by `npm install`) to pin exact
  dependency versions and integrity hashes. This ensures CI builds the same
  code that was reviewed locally.
- If using GitHub Actions for deployment, pin action versions to specific
  SHA or major version tags from official publishers (`actions/checkout@v4`,
  etc.).
- CI deploy workflows should only trigger on pushes to `main` by trusted
  contributors — not on arbitrary pull requests from forked repositories.
- The `SchemaJsonLd.tsx` component is the one place where
  `dangerouslySetInnerHTML` is used. The object passed to it must always be
  hardcoded in the component — never derived from props, URL parameters, or
  any external source.

### A09 — Security Logging and Monitoring Failures

No backend exists to generate logs. Form submissions are visible in the
Formspree dashboard — Formspree handles logging, spam detection, and abuse
alerts on their side.

Hostinger shared hosting provides basic Apache access logs via hPanel. These
are useful for diagnosing crawl errors or unusual traffic.

If traffic analytics are added, use a privacy-respecting tool (Plausible
Analytics recommended — no cookies, no GDPR consent banner required for
basic analytics). Disclose the analytics tool in the site's privacy section
and update the CSP `connect-src` to allow the analytics endpoint.

### A10 — Server-Side Request Forgery (SSRF)

Not applicable. There is no server making outbound requests. The only
outbound calls this application initiates are `fetch()` calls from the
visitor's browser to the hardcoded Formspree endpoints in
`ProjectInquiryForm.tsx` and `ProfessionalInquiryForm.tsx`. No URL is ever
fetched based on visitor-supplied input.

If a server function is ever added that fetches a URL derived from user
input (for example, importing a Pinterest/Houzz board link for mood-board
inspiration), it must use a strict allow-list before shipping.

---

## Data Collected and Privacy

The **project inquiry form** (residential clients, `/contact`) collects:
- Full name
- Email address
- Phone / Zalo / WhatsApp number (optional)
- Property type and approximate plot / floor area
- Province / city
- Project type (architectural design, interior design, furniture design,
  landscape design, or a combination)
- Approximate budget range
- Whether build-connection (introduction to a partnered builder) is wanted
- Preferred follow-up language
- Optional notes / inspiration links / questions

The **professional inquiry form** (`/professionals`) collects:
- Full name and firm/company name (if applicable)
- Professional role (architectural technologist, interior and spatial
  designer, building surveyor, town planner, production designer, historic
  buildings inspector, structural engineer, builder, or other)
- Email address
- Phone number (optional)
- Nature of the collaboration being proposed
- Optional notes

Both forms' data is:
- Transmitted directly from the visitor's browser to Formspree
  (TLS-encrypted)
- Forwarded by Formspree to the business email (thuyken52914@yahoo.com.vn)
- Stored in the Formspree dashboard (subject to Formspree's privacy policy)
- Never processed, stored, or logged by this application itself
- Never sold or shared with third parties

Visitors may request access to, correction of, or deletion of their
submitted data by emailing **thuyken52914@yahoo.com.vn**.

A full privacy policy is published at `/[locale]/privacy/` in all three
languages. That page carries `robots: noindex, follow` so it doesn't compete
for search traffic but remains accessible and crawlable.

## Notes on the /process Page

The `/[locale]/process/` page publishes a plain-language walkthrough of Skog
Mộc by TNP's design process (consultation → concept → development →
documentation → optional build-connection → handover). This content is:
- Descriptive of the studio's own workflow (not a regulatory summary)
- Caveated where it touches anything regulatory (e.g. permit timelines vary
  by province and by project scope) with a note to confirm specifics during
  consultation
- Kept generic enough not to require the frequent legal review that a
  decree-summary page would

No user-supplied data is rendered on this page. The content is entirely
static, sourced from the translation files at build time. There is no
injection risk.

## Notes on the /portfolio Page

The `/[locale]/portfolio/` page is intended to showcase completed
architecture, interior, furniture, and landscape work. **This repository
ships with placeholder copy only — there are no seed projects.** Before
launch, the owner must:
- Replace placeholder project entries with real project photography and
  case-study text in all three locales
- Confirm image rights/licensing for any photography used (own photography,
  licensed stock, or written client permission for project photos)
- Confirm no client-identifying details are published without consent
  (residential clients in particular may prefer the project location kept
  general, e.g. "Thủ Đức, Ho Chi Minh City" rather than a street address)

No user input is rendered on this page; all content is static at build time.

## Notes on the 404 Page

The custom 404 (`src/app/[locale]/not-found.tsx`) is a fully designed page
in the studio's brand voice. It carries no user input, no dynamic content,
and no third-party scripts. The `.htaccess` `ErrorDocument` directive routes
unmatched paths to the locale-appropriate 404 HTML file in `out/`.

---

## Pre-Launch Security Checklist

- [ ] Replace `YOUR_FORM_ID` in `ProjectInquiryForm.tsx` and
      `YOUR_PROFESSIONAL_FORM_ID` in `ProfessionalInquiryForm.tsx` with the
      real Formspree form IDs
- [ ] Enable Formspree spam filtering and optionally reCAPTCHA in the
      dashboard
- [ ] Run `npm install` locally and commit `package-lock.json`
- [ ] Run `npm audit` — resolve all high and critical findings
- [ ] Enable SSL certificate on Hostinger hPanel for the production domain
- [ ] Confirm `.htaccess` HTTP→HTTPS redirect is active after SSL is
      installed
- [ ] Confirm `Options -Indexes` is working: visiting `/assets/` in a
      browser should return 403, not a directory listing
- [ ] Review CSP meta tag if any third-party scripts were added during
      development
- [ ] Confirm `privacy/page.tsx` carries
      `robots: { index: false, follow: true }`
- [ ] Replace placeholder `/portfolio` content with real, rights-cleared
      project photography and case studies, and confirm client consent for
      any identifying details published
- [ ] Confirm `SchemaJsonLd.tsx` only receives hardcoded objects — no user
      input
- [x] Fill in real contact details (email, phone, address) across
      `CLAUDE.md`, this file, and the translation files — still TODO:
      production domain, business hours, privacy "Last updated" date
- [ ] If using GitHub Actions for CI/CD, confirm the deploy workflow only
      triggers on `main` branch pushes, not on pull requests

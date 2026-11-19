# OptimalPower.cz

Website of Optimal Power s.r.o., built with Angular 22 (standalone components, signals, zoneless).

## Commands

| Command          | Purpose                                                        |
| ---------------- | -------------------------------------------------------------- |
| `npm start`      | Dev server on http://localhost:4200                            |
| `npm run build`  | Prerendered build + sitemap to `dist/optimalpower-web/browser` |
| `npm test`       | Unit tests (Vitest)                                            |
| `npm run lint`   | ESLint (angular-eslint)                                        |
| `npm run format` | Prettier                                                       |

## Source layout

```
src/app/
  components/   reusable UI; a child used by one parent lives in the parent's folder
  layout/       shell, navbar, footer
  pages/        one folder per route, composes components
  utils/        pure shared functions (*.util.ts)
  services/     content loading, i18n, title strategy, contact form sending
  pipes/        t (translate), localize, languageLink
  guards/       language route guard
  models/       content and language types
src/styles/     design tokens and global styles
public/
  content/      editable site content (JSON)
  i18n/         UI strings per language
  images/       optimised images (webp)
```

## Editing content

All content is loaded at runtime from `public/content/*.json`; the shape of every file is in
`src/app/models/content.model.ts` (`ContentMap`). Text that differs per language is written as
`{ "cs": "...", "en": "...", "pl": "..." }`; a plain string is used for every language.

- `company.json` – name, address, IČO/DIČ, bank account, e-mail, phone, motto
- `navigation.json` / `footer.json` – menu, footer links, membership logos
- `home.json` – hero, about / offer / service blocks, highlight cards
- `references.json`, `gallery.json`, `faq.json`, `privacy.json`
- `contact.json` – team members and contact form settings (see below)
- `seo.json` – search titles and descriptions per page, share image, business details (see below)

Icons are [Hugeicons](https://hugeicons.com). Names used in JSON (`"icon": "home"`) must be registered
in `src/app/app.icons.ts`.

E-mails in JSON are obfuscated (reversed + Base64) and rendered by `ProtectedEmail`. Encode a new
address with `npm run encode-email -- user@optimalpower.cz`.

## Languages

Routes are prefixed with the language: `/cs/...`, `/en/...`, `/pl/...`. `/` redirects to Czech. Old PHP URLs (`/kontakt`, `/reference`, …) redirect to their new Czech pages.

To add a language: add it to `SUPPORTED_LANGUAGES` in `models/language.model.ts`, create
`public/i18n/<lang>.json`, add its name under `languages` in every dictionary, its Open Graph
locale to `locales` in `seo.json` and the key to localized content.

## SEO

Every page is prerendered to static HTML in every language at build time (`outputMode: "static"`,
server routes in `app.routes.server.ts`), and Angular hydrates it in the browser. Code that touches
browser-only APIs must not run during prerendering (use `afterNextRender`/`afterRenderEffect` or
check `isPlatformBrowser`).

- Each route in `app.routes.ts` names its entry in `seo.json` via `data: { seo: '<key>' }`; that entry
  holds the page's title and meta description per language. A page without one gets `noindex`.
- `SeoService` writes the title, description, canonical URL, hreflang links, Open Graph / Twitter
  tags and JSON-LD (`LocalBusiness` from `company.json` + `seo.json`, `FAQPage` on the FAQ page).
- Canonical URLs end with `/`, the form GitHub Pages serves the prerendered `…/index.html` under.
- `npm run build` runs `scripts/generate-sitemap.mjs` afterwards, which writes `sitemap.xml` from
  the prerendered pages. `public/robots.txt` points crawlers to it.
- `/` and old PHP URLs are prerendered as blank pages that forward to the new ones before the first
  paint (`scripts/rewrite-redirects.mjs`, also run by `postbuild`).

## Contact form

The form is sent through [Web3Forms](https://web3forms.com) and protected by hCaptcha, which
Web3Forms verifies server side. One-time setup:

1. Create an access key on web3forms.com for the address that should receive messages.
2. Save it as the repository secret `WEB3FORMS_ACCESS_KEY` (Settings → Secrets and variables →
   Actions). CI writes it into `public/content/contact.json` before building (prerendered pages
   embed the content they load); the repository copy stays empty.
   For a local test, put the key into `form.accessKey` temporarily and don't commit it.
3. In the Web3Forms dashboard, enable hCaptcha as the spam protection for the form.
   `form.captchaSiteKey` holds Web3Forms' shared hCaptcha site key (free plan). Your own site
   key only works on a paid plan, with its hCaptcha secret set in the Web3Forms dashboard.

## CI/CD

`.github/workflows/ci.yml` runs format check, lint, tests and build on every push and PR, and
deploys `main` to GitHub Pages. Unknown paths are served `404.html`, a copy of the client rendered
shell (`index.csr.html`) that shows the not found page. One-time setup:

1. Repository → Settings → Pages → Source: **GitHub Actions**.
2. Custom domain `optimalpower.cz` (file `public/CNAME`); point DNS to GitHub Pages
   (A records `185.199.108–111.153`, or CNAME for `www`).

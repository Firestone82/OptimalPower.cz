# OptimalPower.cz

Website of Optimal Power s.r.o., built with Angular 22 (standalone components, signals, zoneless).

## Commands

| Command          | Purpose                                             |
| ---------------- | --------------------------------------------------- |
| `npm start`      | Dev server on http://localhost:4200                 |
| `npm run build`  | Production build to `dist/optimalpower-web/browser` |
| `npm test`       | Unit tests (Vitest)                                 |
| `npm run lint`   | ESLint (angular-eslint)                             |
| `npm run format` | Prettier                                            |

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
`{ "cs": "...", "en": "..." }`; a plain string is used for every language.

- `company.json` – name, address, IČO/DIČ, bank account, e-mail, phone, motto
- `navigation.json` / `footer.json` – menu, footer links, membership logos
- `home.json` – hero, about / offer / service blocks, highlight cards
- `realizations.json` – installation maps per year
- `references.json`, `gallery.json`, `faq.json`, `privacy.json`
- `contact.json` – team members and `formEndpoint` (see below)

Icons in JSON (`"icon": "lucideHouse"`) must be registered in `src/app/app.icons.ts`.

## Languages

Routes are prefixed with the language: `/cs/...`, `/en/...`. `/` redirects by browser language
(default Czech). Old PHP URLs (`/kontakt`, `/reference`, …) redirect to their new Czech pages.

To add a language: add it to `SUPPORTED_LANGUAGES` in `models/language.model.ts`, create
`public/i18n/<lang>.json` and add the key to localized content.

## Contact form

Static hosting has no backend. Set `formEndpoint` in `contact.json` to a form service that
accepts JSON POSTs (e.g. Formspree). While it is empty, the form opens the visitor's mail client
addressed to the company e-mail.

## CI/CD

`.github/workflows/ci.yml` runs format check, lint, tests and build on every push and PR, and
deploys `main` to GitHub Pages. One-time setup:

1. Repository → Settings → Pages → Source: **GitHub Actions**.
2. Custom domain `optimalpower.cz` (file `public/CNAME`); point DNS to GitHub Pages
   (A records `185.199.108–111.153`, or CNAME for `www`).

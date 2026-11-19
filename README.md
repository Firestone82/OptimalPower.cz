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
- `references.json`, `gallery.json`, `faq.json`, `privacy.json`
- `contact.json` – team members and contact form settings (see below)

Icons are [Hugeicons](https://hugeicons.com). Names used in JSON (`"icon": "home"`) must be registered
in `src/app/app.icons.ts`.

E-mails in JSON are obfuscated (reversed + Base64) and rendered by `ProtectedEmail`. Encode a new
address with `npm run encode-email -- user@optimalpower.cz`.

## Languages

Routes are prefixed with the language: `/cs/...`, `/en/...`. `/` redirects to Czech. Old PHP URLs (`/kontakt`, `/reference`, …) redirect to their new Czech pages.

To add a language: add it to `SUPPORTED_LANGUAGES` in `models/language.model.ts`, create
`public/i18n/<lang>.json` and add the key to localized content.

## Contact form

The form is sent through [Web3Forms](https://web3forms.com) and protected by hCaptcha, which
Web3Forms verifies server side. One-time setup:

1. Create an access key on web3forms.com for the address that should receive messages.
2. Save it as the repository secret `WEB3FORMS_ACCESS_KEY` (Settings → Secrets and variables →
   Actions). CI writes it into the built `content/contact.json`; the repository copy stays empty.
   For a local test, put the key into `form.accessKey` temporarily and don't commit it.
3. In the Web3Forms dashboard, enable hCaptcha as the spam protection for the form.
   `form.captchaSiteKey` holds Web3Forms' shared hCaptcha site key (free plan). Your own site
   key only works on a paid plan, with its hCaptcha secret set in the Web3Forms dashboard.

## CI/CD

`.github/workflows/ci.yml` runs format check, lint, tests and build on every push and PR, and
deploys `main` to GitHub Pages. One-time setup:

1. Repository → Settings → Pages → Source: **GitHub Actions**.
2. Custom domain `optimalpower.cz` (file `public/CNAME`); point DNS to GitHub Pages
   (A records `185.199.108–111.153`, or CNAME for `www`).

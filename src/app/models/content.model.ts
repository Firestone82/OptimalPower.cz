import { LocalizedText } from './language.model';

export interface ImageRef {
  src: string;
  alt: LocalizedText;
}

export interface LinkRef {
  label: LocalizedText;
  url: string;
}

export interface CompanyContent {
  name: string;
  logo: string;
  motto: LocalizedText;
  address: string;
  ico: string;
  dic: string;
  bankAccount: string;
  /** Encoded with `encodeEmail`, see `utils/email.util.ts`. */
  email: string;
  phone: string;
  foundedYear: number;
  analyticsId?: string;
}

export interface NavigationItem {
  /** Route path relative to the language root, `''` is the home page. */
  path: string;
  /** Translation key of the label. */
  labelKey: string;
  /** Registered icon name, see `app.icons.ts`. */
  icon: string;
}

export interface FooterContent {
  links: (NavigationItem & { external?: boolean })[];
  memberships: (LinkRef & { logo: string })[];
}

export interface HeroContent {
  title: LocalizedText;
  subtitle: LocalizedText;
  image: string;
  primaryAction: NavigationItem;
  secondaryAction: NavigationItem;
}

export interface OfferItem {
  title: LocalizedText;
  children?: LocalizedText[];
}

export interface FeatureContent {
  title: LocalizedText;
  image: ImageRef;
  paragraphs?: LocalizedText[];
  offer?: OfferItem[];
  links?: LinkRef[];
}

export interface HighlightContent {
  title: LocalizedText;
  /** Registered icon name, see `app.icons.ts`. */
  icon: string;
}

export interface HomeContent {
  hero: HeroContent;
  features: FeatureContent[];
  highlightsTitle: LocalizedText;
  highlights: HighlightContent[];
}

export type ReferenceSpecType = 'power' | 'panels' | 'inverter' | 'battery';

export interface ReferenceSpec {
  type: ReferenceSpecType;
  value: string;
  url?: string;
}

export interface ReferenceContent {
  id: string;
  location: string;
  images: ImageRef[];
  specs: ReferenceSpec[];
  testimonial?: { text: LocalizedText; author: LocalizedText };
}

export interface ReferencesContent {
  items: ReferenceContent[];
}

export interface GalleryContent {
  images: ImageRef[];
}

export interface FaqItemContent {
  question: LocalizedText;
  paragraphs?: LocalizedText[];
  bullets?: LocalizedText[];
}

export interface FaqContent {
  items: FaqItemContent[];
}

export interface TeamMemberContent {
  name: string;
  position?: LocalizedText;
  phone?: string;
  /** Encoded with `encodeEmail`, see `utils/email.util.ts`. */
  email?: string;
}

export interface ContactFormConfig {
  /** Web3Forms submit URL. */
  endpoint: string;
  /**
   * Web3Forms access key. Kept empty in the repository; CI fills it from the
   * `WEB3FORMS_ACCESS_KEY` secret when building (see `scripts/inject-form-key.mjs`).
   */
  accessKey: string;
  /** hCaptcha site key; the token is verified by Web3Forms. */
  captchaSiteKey: string;
}

export interface ContactContent {
  form: ContactFormConfig;
  team: TeamMemberContent[];
}

export interface LegalSectionContent {
  /** Anchor id, used by the table of contents. */
  id: string;
  title: LocalizedText;
  paragraphs?: LocalizedText[];
  items?: LocalizedText[];
  /** Shows the company identification and contact details under the text. */
  showCompany?: boolean;
}

/** A legal text page such as the privacy policy or the terms. */
export interface LegalDocumentContent {
  title: LocalizedText;
  /** ISO date the current wording took effect. */
  effectiveFrom: string;
  /** Small illustration shown in the top right corner of the header. */
  image?: ImageRef;
  intro: LocalizedText[];
  sections: LegalSectionContent[];
}

/** Search title and description of one page. */
export interface SeoPageContent {
  /** Shown in search results and the browser tab, followed by ` | <site name>`. */
  title: LocalizedText;
  /** Search result snippet, ideally 120–160 characters. */
  description: LocalizedText;
}

/** Company details for search engines, published as schema.org `LocalBusiness` data. */
export interface SeoBusinessContent {
  /** schema.org type, e.g. `LocalBusiness` or a subtype such as `HomeAndConstructionBusiness`. */
  type: string;
  description: LocalizedText;
  streetAddress: string;
  postalCode: string;
  addressLocality: string;
  /** ISO 3166-1 alpha-2 country code. */
  addressCountry: string;
  /** Regions the company works in. */
  areaServed: string[];
  /** Profiles on other sites, such as Facebook or Google Maps. */
  sameAs: string[];
}

export interface SeoContent {
  /** Origin the site is served from, without a trailing slash. */
  siteUrl: string;
  /** Default share image (1200 × 630) for Open Graph and Twitter cards. */
  image: ImageRef;
  /** Open Graph locale per language, e.g. `cs_CZ`. */
  locales: Record<string, string>;
  business: SeoBusinessContent;
  /** Keyed by the `data.seo` value of a route, see `app.routes.ts`. */
  pages: Record<string, SeoPageContent>;
}

/** Maps every file in `public/content` to its shape. */
export interface ContentMap {
  company: CompanyContent;
  navigation: { items: NavigationItem[] };
  footer: FooterContent;
  home: HomeContent;
  references: ReferencesContent;
  gallery: GalleryContent;
  faq: FaqContent;
  contact: ContactContent;
  privacy: LegalDocumentContent;
  terms: LegalDocumentContent;
  seo: SeoContent;
}

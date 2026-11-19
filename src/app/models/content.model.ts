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
  author: string;
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
  image: string;
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

export interface PrivacyContent {
  feature: FeatureContent;
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
  privacy: PrivacyContent;
}

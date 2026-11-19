export const SUPPORTED_LANGUAGES = ['cs', 'en'] as const;

export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'cs';

/** Text that is either language neutral or provided per language. */
export type LocalizedText = string | Partial<Record<Language, string>>;

/** Nested translation dictionary loaded from `public/i18n/<lang>.json`. */
export interface Dictionary {
  [key: string]: string | Dictionary;
}

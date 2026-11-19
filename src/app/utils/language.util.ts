import { Language, SUPPORTED_LANGUAGES } from '../models/language.model';

export function isLanguage(value: unknown): value is Language {
  return SUPPORTED_LANGUAGES.includes(value as Language);
}

/** Replaces the leading language segment of `url`, keeping path, query and fragment. */
export function replaceUrlLanguage(url: string, language: Language): string {
  const [, rest = ''] = url.match(/^\/[^/?#]*(.*)$/) ?? [];
  return `/${language}${rest}`;
}

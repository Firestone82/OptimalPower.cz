import { DEFAULT_LANGUAGE, Language, LocalizedText } from '../models/language.model';

/** Falls back to the default language, then to any available translation. */
export function resolveLocalized(
  text: LocalizedText | null | undefined,
  language: Language,
): string {
  if (text == null) return '';
  if (typeof text === 'string') return text;
  return text[language] ?? text[DEFAULT_LANGUAGE] ?? Object.values(text)[0] ?? '';
}

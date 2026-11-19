import { Dictionary } from '../models/language.model';

export type TranslateParams = Record<string, string | number>;

/** Resolves a dot separated `key` (e.g. `nav.home`) and replaces `{{param}}` placeholders. */
export function translate(dictionary: Dictionary, key: string, params?: TranslateParams): string {
  const value = key
    .split('.')
    .reduce<string | Dictionary | undefined>(
      (node, part) => (typeof node === 'object' ? node[part] : undefined),
      dictionary,
    );

  if (typeof value !== 'string') return key;
  if (!params) return value;

  return value.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) =>
    name in params ? String(params[name]) : match,
  );
}

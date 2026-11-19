import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Observable, map, of, shareReplay, tap } from 'rxjs';
import { DEFAULT_LANGUAGE, Dictionary, Language, LocalizedText } from '../models/language.model';
import { resolveLocalized } from '../utils/localize.util';
import { TranslateParams, translate } from '../utils/translate.util';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly http = inject(HttpClient);
  private readonly document = inject(DOCUMENT);
  private readonly loaded = signal<Partial<Record<Language, Dictionary>>>({});
  private readonly requests = new Map<Language, Observable<Dictionary>>();

  readonly language = signal<Language>(DEFAULT_LANGUAGE);
  readonly dictionary = computed(() => this.loaded()[this.language()] ?? {});

  constructor() {
    effect(() => this.document.documentElement.setAttribute('lang', this.language()));
  }

  /** Loads the dictionary first so the page never renders raw keys. */
  use(language: Language): Observable<true> {
    return this.loadDictionary(language).pipe(
      tap(() => this.language.set(language)),
      map(() => true as const),
    );
  }

  translate(key: string, params?: TranslateParams): string {
    return translate(this.dictionary(), key, params);
  }

  localize(text: LocalizedText | null | undefined): string {
    return resolveLocalized(text, this.language());
  }

  private loadDictionary(language: Language): Observable<Dictionary> {
    const cached = this.loaded()[language];
    if (cached) return of(cached);

    if (!this.requests.has(language)) {
      const request = this.http.get<Dictionary>(`i18n/${language}.json`).pipe(
        tap((dictionary) => this.loaded.update((all) => ({ ...all, [language]: dictionary }))),
        shareReplay(1),
      );
      this.requests.set(language, request);
    }
    return this.requests.get(language)!;
  }
}

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { BACKGROUND_REQUEST } from '../interceptors/loading.interceptor';
import { ContentMap } from '../models/content.model';

/** Loads and caches the JSON files from `public/content`. */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<keyof ContentMap, Observable<unknown>>();

  load<K extends keyof ContentMap>(name: K): Observable<ContentMap[K]> {
    return this.request(name, false);
  }

  /** Fetches a file ahead of time without showing the progress bar. */
  preload(name: keyof ContentMap): void {
    this.request(name, true).subscribe({ error: () => this.cache.delete(name) });
  }

  private request<K extends keyof ContentMap>(
    name: K,
    background: boolean,
  ): Observable<ContentMap[K]> {
    if (!this.cache.has(name)) {
      const context = new HttpContext().set(BACKGROUND_REQUEST, background);
      this.cache.set(
        name,
        this.http.get<ContentMap[K]>(`content/${name}.json`, { context }).pipe(shareReplay(1)),
      );
    }
    return this.cache.get(name) as Observable<ContentMap[K]>;
  }
}

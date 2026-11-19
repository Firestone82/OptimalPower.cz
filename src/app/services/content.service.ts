import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, shareReplay } from 'rxjs';
import { ContentMap } from '../models/content.model';

/** Loads and caches the JSON files from `public/content`. */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly http = inject(HttpClient);
  private readonly cache = new Map<keyof ContentMap, Observable<unknown>>();

  load<K extends keyof ContentMap>(name: K): Observable<ContentMap[K]> {
    if (!this.cache.has(name)) {
      this.cache.set(
        name,
        this.http.get<ContentMap[K]>(`content/${name}.json`).pipe(shareReplay(1)),
      );
    }
    return this.cache.get(name) as Observable<ContentMap[K]>;
  }
}

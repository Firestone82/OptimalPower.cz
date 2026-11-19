import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ContentMap } from '../models/content.model';
import { ContentService } from '../services/content.service';

/**
 * Holds the navigation until the content files listed in the route's `data.content` are loaded,
 * so the previous page stays visible and the new one renders complete instead of popping in
 * piece by piece.
 *
 * Pages keep reading the content through `ContentService`, which replays the cached response
 * synchronously. A failed request does not block the navigation.
 */
export const contentResolver: ResolveFn<true> = (route) => {
  const content = inject(ContentService);
  const names: (keyof ContentMap)[] = route.data['content'] ?? [];
  if (!names.length) return of(true);
  return forkJoin(names.map((name) => content.load(name).pipe(catchError(() => of(null))))).pipe(
    map(() => true as const),
  );
};

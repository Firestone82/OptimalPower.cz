import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, forkJoin, map, of } from 'rxjs';
import { ContentMap } from '../models/content.model';
import { ContentService } from '../services/content.service';

/**
 * Holds the navigation until the given content files are loaded, so the previous page stays
 * visible and the new one renders complete instead of popping in piece by piece.
 *
 * Pages keep reading the content through `ContentService`, which replays the cached response
 * synchronously. A failed request does not block the navigation.
 */
export function contentResolver(...names: (keyof ContentMap)[]): ResolveFn<true> {
  return () => {
    const content = inject(ContentService);
    return forkJoin(names.map((name) => content.load(name).pipe(catchError(() => of(null))))).pipe(
      map(() => true as const),
    );
  };
}

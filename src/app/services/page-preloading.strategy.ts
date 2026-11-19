import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { ContentMap } from '../models/content.model';
import { ContentService } from './content.service';

/**
 * Once the first page is shown, loads the code and content files (`data.content`) of every other
 * page in the background. Clicking a link then only waits for rendering, not for several
 * round trips to the server one after another.
 */
@Injectable({ providedIn: 'root' })
export class PagePreloadingStrategy implements PreloadingStrategy {
  private readonly content = inject(ContentService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  preload(route: Route, load: () => Observable<unknown>): Observable<unknown> {
    if (!this.isBrowser) return EMPTY;
    const names: (keyof ContentMap)[] = route.data?.['content'] ?? [];
    names.forEach((name) => this.content.preload(name));
    return load();
  }
}

import { Injectable, Injector, inject } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { SeoService } from './seo.service';

/**
 * Passes each finished navigation to `SeoService`, which sets the title and meta tags.
 * Route `title` values are translation keys, used when the page has no entry in `seo.json`.
 */
@Injectable()
export class PageTitleStrategy extends TitleStrategy {
  private readonly injector = inject(Injector);

  override updateTitle(snapshot: RouterStateSnapshot): void {
    // Resolved lazily: SeoService loads content over HTTP, whose interceptor needs the Router,
    // which is still being created when this strategy is.
    this.injector.get(SeoService).setPage({
      url: snapshot.url,
      titleKey: this.buildTitle(snapshot),
      seoKey: deepestChild(snapshot.root).data['seo'],
    });
  }
}

function deepestChild(route: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
  return route.firstChild ? deepestChild(route.firstChild) : route;
}

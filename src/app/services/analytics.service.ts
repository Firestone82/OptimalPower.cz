import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, effect, inject, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ConsentService } from './consent.service';
import { ScriptLoaderService } from './script-loader.service';

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/**
 * Google Analytics 4 with Consent Mode v2. Nothing is loaded from Google until the
 * visitor accepts analytics cookies; page views are sent on every route change.
 */
@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly consent = inject(ConsentService);
  private readonly scripts = inject(ScriptLoaderService);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly measurementId = signal<string | null>(null);
  private loaded = false;
  private lastTrackedUrl: string | null = null;

  constructor() {
    effect(() => {
      const id = this.measurementId();
      const choice = this.consent.choice();
      if (!id) return;
      if (choice === 'granted') this.start(id);
      else if (this.loaded) this.gtag('consent', 'update', { analytics_storage: 'denied' });
      if (choice === 'denied') this.clearCookies();
    });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      // The title strategy sets the page title right after navigation ends.
      .subscribe(() => setTimeout(() => this.trackPageView()));
  }

  /**
   * Enables analytics for the given GA4 measurement ID (`G-…`). Empty disables it.
   * Ignored while prerendering, so the static HTML has no cookie banner baked in.
   */
  init(measurementId: string | undefined): void {
    if (!this.isBrowser || !measurementId || this.measurementId()) return;
    this.consent.required.set(true);
    this.measurementId.set(measurementId);
  }

  private start(id: string): void {
    if (this.loaded) {
      this.gtag('consent', 'update', { analytics_storage: 'granted' });
      return;
    }
    this.loaded = true;
    const view = this.document.defaultView!;
    view.dataLayer = view.dataLayer ?? [];
    view.gtag = function gtag() {
      // gtag.js requires the `arguments` object itself, not an array.
      // eslint-disable-next-line prefer-rest-params
      view.dataLayer!.push(arguments);
    };
    this.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    this.gtag('consent', 'update', { analytics_storage: 'granted' });
    this.gtag('js', new Date());
    this.gtag('config', id, { send_page_view: false });
    this.trackPageView();
    this.scripts
      .load(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`)
      .catch(() => (this.loaded = false));
  }

  private trackPageView(): void {
    const url = this.document.location.href;
    if (!this.loaded || this.consent.choice() !== 'granted' || url === this.lastTrackedUrl) return;
    this.lastTrackedUrl = url;
    this.gtag('event', 'page_view', {
      page_location: url,
      page_title: this.document.title,
    });
  }

  private gtag(...args: unknown[]): void {
    this.document.defaultView?.gtag?.(...args);
  }

  /** Removes `_ga` cookies left from an earlier consent. */
  private clearCookies(): void {
    const domain = this.document.location.hostname.replace(/^www\./, '');
    for (const cookie of this.document.cookie.split(';')) {
      const name = cookie.split('=')[0].trim();
      if (!name.startsWith('_ga')) continue;
      for (const suffix of ['', `; domain=${domain}`, `; domain=.${domain}`]) {
        this.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${suffix}`;
      }
    }
  }
}

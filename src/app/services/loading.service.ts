import { Injectable, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { filter, map } from 'rxjs';

/** Tracks pending HTTP requests and router navigations. */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly pendingRequests = signal(0);
  private readonly navigating = toSignal(
    inject(Router).events.pipe(
      filter(
        (event) =>
          event instanceof NavigationStart ||
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError,
      ),
      map((event) => event instanceof NavigationStart),
    ),
    { initialValue: true },
  );

  readonly busy = computed(() => this.navigating() || this.pendingRequests() > 0);

  requestStarted(): void {
    this.pendingRequests.update((count) => count + 1);
  }

  requestFinished(): void {
    this.pendingRequests.update((count) => Math.max(0, count - 1));
  }
}

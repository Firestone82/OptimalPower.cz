import { Injectable } from '@angular/core';

/** Pause between elements that scroll into view together, so a row of cards cascades. */
const STAGGER_MS = 90;
/** Longest stagger, so the last cards of a large batch don't wait too long. */
const MAX_STAGGER_MS = 450;

/** One `IntersectionObserver` shared by every `RevealDirective`. */
@Injectable({ providedIn: 'root' })
export class RevealService {
  private readonly callbacks = new Map<Element, (delayMs: number) => void>();
  private readonly observer =
    typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver((entries) => this.reveal(entries), {
          rootMargin: '0px 0px -8% 0px',
        });

  /**
   * Calls `onReveal` once, when `element` first scrolls into view.
   *
   * @returns Function that stops watching the element.
   */
  observe(element: Element, onReveal: (delayMs: number) => void): () => void {
    if (!this.observer) {
      onReveal(0);
      return () => undefined;
    }

    this.callbacks.set(element, onReveal);
    this.observer.observe(element);
    return () => this.unobserve(element);
  }

  private reveal(entries: IntersectionObserverEntry[]): void {
    entries
      .filter((entry) => entry.isIntersecting)
      .forEach((entry, order) => {
        const onReveal = this.callbacks.get(entry.target);
        this.unobserve(entry.target);
        onReveal?.(Math.min(order * STAGGER_MS, MAX_STAGGER_MS));
      });
  }

  private unobserve(element: Element): void {
    this.callbacks.delete(element);
    this.observer?.unobserve(element);
  }
}

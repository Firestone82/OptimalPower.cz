import { DestroyRef, Directive, ElementRef, inject, signal } from '@angular/core';
import { RevealService } from '../services/reveal.service';

/**
 * Fades the element in and slides it up the first time it scrolls into view. Elements that
 * appear together are staggered. The animation lives in `styles/_motion.scss`.
 */
@Directive({
  selector: '[appReveal]',
  host: {
    class: 'reveal',
    '[class.revealed]': 'delayMs() !== null',
    '[style.--reveal-delay.ms]': 'delayMs()',
  },
})
export class RevealDirective {
  protected readonly delayMs = signal<number | null>(null);

  constructor() {
    const element = inject<ElementRef<Element>>(ElementRef).nativeElement;
    const stop = inject(RevealService).observe(element, (delayMs) => this.delayMs.set(delayMs));
    inject(DestroyRef).onDestroy(stop);
  }
}

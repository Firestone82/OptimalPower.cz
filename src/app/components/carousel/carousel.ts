import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Icon } from '../icon/icon';

/**
 * Single row of projected items that scrolls sideways: swipe on touch screens, arrow buttons on
 * wider screens. Items per view are set by `--carousel-per-view` (see `carousel.scss`), the
 * arrows hide when everything fits.
 *
 * With `autoplay` it moves by one item on its own and jumps back to the start after the last
 * one. It pauses while hovered, focused or touched, in a background tab and for users who
 * prefer reduced motion.
 *
 * @input autoplay - Milliseconds between automatic steps, `0` turns autoplay off.
 */
@Component({
  selector: 'app-carousel',
  imports: [Icon, TranslatePipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  host: {
    '(window:resize)': 'updateEnds()',
    '(mouseenter)': 'paused.set(true)',
    '(mouseleave)': 'resume()',
    '(focusin)': 'paused.set(true)',
    '(focusout)': 'resume()',
    '(touchstart)': 'paused.set(true)',
    '(touchend)': 'resume()',
  },
})
export class Carousel {
  readonly autoplay = input(0);

  private readonly document = inject(DOCUMENT);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(true);
  protected readonly paused = signal(false);
  /** Bumped on every manual interaction, which restarts the autoplay timer. */
  private readonly interactions = signal(0);

  constructor() {
    afterNextRender(() => this.updateEnds());

    effect((onCleanup) => {
      const delay = this.autoplay();
      this.interactions();
      const reducedMotion = this.document.defaultView?.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
      if (!delay || reducedMotion) return;

      const timer = setInterval(() => {
        if (!this.paused() && this.document.visibilityState === 'visible') this.step(1);
      }, delay);
      onCleanup(() => clearInterval(timer));
    });
  }

  protected previous(): void {
    this.step(-1);
    this.interactions.update((count) => count + 1);
  }

  protected next(): void {
    this.step(1);
    this.interactions.update((count) => count + 1);
  }

  protected resume(): void {
    this.paused.set(false);
    this.interactions.update((count) => count + 1);
  }

  protected updateEnds(): void {
    const { scrollLeft, clientWidth, scrollWidth } = this.track().nativeElement;
    this.atStart.set(scrollLeft <= 1);
    this.atEnd.set(scrollLeft + clientWidth >= scrollWidth - 1);
  }

  /** Scrolls by one item, wrapping around at either end. */
  private step(direction: 1 | -1): void {
    const track = this.track().nativeElement;
    const item = track.firstElementChild as HTMLElement | null;
    if (!item) return;

    if (direction === 1 && this.atEnd()) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === -1 && this.atStart()) {
      track.scrollTo({ left: track.scrollWidth, behavior: 'smooth' });
    } else {
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
      track.scrollBy({ left: direction * (item.offsetWidth + gap), behavior: 'smooth' });
    }
  }
}

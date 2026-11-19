import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  Component,
  ElementRef,
  TemplateRef,
  computed,
  contentChild,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Icon } from '../icon/icon';
import { CarouselDots } from './carousel-dots/carousel-dots';

/**
 * Endless single row of items: swipe on touch screens, arrow buttons on wider screens, dots
 * below show the position. Each item is rendered by the projected `<ng-template let-item>`.
 * Items per view are set by `--carousel-per-view` (see `carousel.scss`); the loop expects
 * more items than fit in one view.
 *
 * The row is rendered twice. Whenever the view drifts into the second copy, it jumps back by
 * one copy without animation, which looks identical, so it can always keep moving forward.
 *
 * With `autoplay` it moves by one item on its own. It pauses while hovered, focused or
 * touched, in a background tab and for users who prefer reduced motion.
 *
 * @input items - Items to show.
 * @input autoplay - Milliseconds between automatic steps, `0` turns autoplay off.
 */
@Component({
  selector: 'app-carousel',
  imports: [NgTemplateOutlet, Icon, CarouselDots, TranslatePipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  host: {
    '(mouseenter)': 'paused.set(true)',
    '(mouseleave)': 'resume()',
    '(focusin)': 'paused.set(true)',
    '(focusout)': 'resume()',
    '(touchstart)': 'paused.set(true)',
    '(touchend)': 'resume()',
  },
})
export class Carousel<T> {
  readonly items = input.required<T[]>();
  readonly autoplay = input(0);

  protected readonly template = contentChild.required<TemplateRef<{ $implicit: T }>>(TemplateRef);
  protected readonly loopItems = computed(() => [...this.items(), ...this.items()]);
  protected readonly active = signal(0);
  protected readonly paused = signal(false);

  private readonly document = inject(DOCUMENT);
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  /** Bumped on every manual interaction, which restarts the autoplay timer. */
  private readonly interactions = signal(0);

  constructor() {
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

  protected manualStep(direction: 1 | -1): void {
    this.step(direction);
    this.restartAutoplay();
  }

  protected goTo(index: number): void {
    this.normalize();
    this.scrollToIndex(index);
    this.restartAutoplay();
  }

  protected resume(): void {
    this.paused.set(false);
    this.restartAutoplay();
  }

  protected onScroll(): void {
    this.active.set(this.currentIndex() % this.items().length);
  }

  private step(direction: 1 | -1): void {
    let index = this.normalize();
    if (direction === -1 && index === 0) {
      index = this.items().length;
      this.jumpTo(index);
    }
    this.scrollToIndex(index + direction);
  }

  private restartAutoplay(): void {
    this.interactions.update((count) => count + 1);
  }

  /** Moves the view out of the second copy and returns the resulting index. */
  private normalize(): number {
    const count = this.items().length;
    const index = this.currentIndex();
    if (index < count) return index;
    this.jumpTo(index - count);
    return index - count;
  }

  private currentIndex(): number {
    return Math.round(this.track().nativeElement.scrollLeft / this.itemStep());
  }

  /** Width of one item including the gap after it. */
  private itemStep(): number {
    const track = this.track().nativeElement;
    const item = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    return (item?.offsetWidth ?? track.clientWidth) + gap;
  }

  private jumpTo(index: number): void {
    this.track().nativeElement.scrollTo({ left: index * this.itemStep(), behavior: 'instant' });
  }

  private scrollToIndex(index: number): void {
    this.track().nativeElement.scrollTo({ left: index * this.itemStep(), behavior: 'smooth' });
  }
}

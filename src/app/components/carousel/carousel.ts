import { Component, ElementRef, afterNextRender, signal, viewChild } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Icon } from '../icon/icon';

/**
 * Single row of projected items that scrolls sideways: swipe on touch screens, arrow buttons on
 * wider screens. Items per view are set by `--carousel-per-view` (see `carousel.scss`), the
 * arrows hide when everything fits.
 */
@Component({
  selector: 'app-carousel',
  imports: [Icon, TranslatePipe],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
  host: { '(window:resize)': 'updateEnds()' },
})
export class Carousel {
  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');

  protected readonly atStart = signal(true);
  protected readonly atEnd = signal(true);

  constructor() {
    afterNextRender(() => this.updateEnds());
  }

  /** Scrolls by one visible page; snapping aligns the result to an item. */
  protected page(direction: 1 | -1): void {
    const track = this.track().nativeElement;
    track.scrollBy({ left: direction * track.clientWidth, behavior: 'smooth' });
  }

  protected updateEnds(): void {
    const { scrollLeft, clientWidth, scrollWidth } = this.track().nativeElement;
    this.atStart.set(scrollLeft <= 1);
    this.atEnd.set(scrollLeft + clientWidth >= scrollWidth - 1);
  }
}

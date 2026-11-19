import { Component, computed, input, output } from '@angular/core';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * Row of dots showing which carousel item is first in view.
 *
 * @input count - Number of items.
 * @input active - Index of the highlighted dot.
 * @output selected - Index of the clicked dot.
 */
@Component({
  selector: 'app-carousel-dots',
  imports: [TranslatePipe],
  templateUrl: './carousel-dots.html',
  styleUrl: './carousel-dots.scss',
})
export class CarouselDots {
  readonly count = input.required<number>();
  readonly active = input(0);
  readonly selected = output<number>();

  protected readonly indexes = computed(() =>
    Array.from({ length: this.count() }, (_, index) => index),
  );
}

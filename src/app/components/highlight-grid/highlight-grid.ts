import { Component, input } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { HighlightContent } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { Carousel } from '../carousel/carousel';
import { SectionHeading } from '../section-heading/section-heading';
import { HighlightCard } from './highlight-card/highlight-card';

/**
 * Centered heading followed by a carousel of highlight cards.
 *
 * @input title - Section heading, already translated.
 * @input items - Cards to render.
 */
@Component({
  selector: 'app-highlight-grid',
  imports: [SectionHeading, Carousel, HighlightCard, LocalizePipe, RevealDirective],
  templateUrl: './highlight-grid.html',
  styleUrl: './highlight-grid.scss',
})
export class HighlightGrid {
  readonly title = input.required<string>();
  readonly items = input.required<HighlightContent[]>();
}

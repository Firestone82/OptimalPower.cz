import { Component, input } from '@angular/core';
import { HighlightContent } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { SectionHeading } from '../section-heading/section-heading';
import { HighlightCard } from './highlight-card/highlight-card';

/**
 * Centered heading followed by a grid of highlight cards.
 *
 * @input title - Section heading, already translated.
 * @input items - Cards to render.
 */
@Component({
  selector: 'app-highlight-grid',
  imports: [SectionHeading, HighlightCard, LocalizePipe],
  templateUrl: './highlight-grid.html',
  styleUrl: './highlight-grid.scss',
})
export class HighlightGrid {
  readonly title = input.required<string>();
  readonly items = input.required<HighlightContent[]>();
}

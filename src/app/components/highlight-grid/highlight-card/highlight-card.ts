import { Component, input } from '@angular/core';

/**
 * Card with an illustration and a short title.
 *
 * @input title - Card title, already translated.
 * @input image - URL of the illustration.
 */
@Component({
  selector: 'app-highlight-card',
  templateUrl: './highlight-card.html',
  styleUrl: './highlight-card.scss',
})
export class HighlightCard {
  readonly title = input.required<string>();
  readonly image = input.required<string>();
}

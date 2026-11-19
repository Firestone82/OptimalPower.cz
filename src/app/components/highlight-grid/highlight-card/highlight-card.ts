import { Component, input } from '@angular/core';
import { Icon } from '../../icon/icon';

/**
 * Card with an icon in a brand circle and a short title.
 *
 * @input title - Card title, already translated.
 * @input icon - Registered icon name, see `app.icons.ts`.
 */
@Component({
  selector: 'app-highlight-card',
  imports: [Icon],
  templateUrl: './highlight-card.html',
  styleUrl: './highlight-card.scss',
})
export class HighlightCard {
  readonly title = input.required<string>();
  readonly icon = input.required<string>();
}

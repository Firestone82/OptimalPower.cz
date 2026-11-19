import { Component, input } from '@angular/core';

/**
 * Heading with the brand underline.
 *
 * @input text - Heading text, already translated.
 * @input level - `1` renders `<h1>` (page title), `2` renders `<h2>`.
 * @input centered - Centers the heading horizontally.
 */
@Component({
  selector: 'app-section-heading',
  templateUrl: './section-heading.html',
  styleUrl: './section-heading.scss',
  host: { '[class.centered]': 'centered()' },
})
export class SectionHeading {
  readonly text = input.required<string>();
  readonly level = input<1 | 2>(2);
  readonly centered = input(false);
}

import { Component, input, model } from '@angular/core';
import { Icon } from '../../icon/icon';
import { FaqItemContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';

/**
 * Single expandable question.
 *
 * @input item - Question, answer paragraphs and bullets.
 * @input number - Ordinal shown before the question.
 * @model expanded - Whether the answer is visible (two-way bindable).
 */
@Component({
  selector: 'app-faq-item',
  imports: [Icon, LocalizePipe],
  templateUrl: './faq-item.html',
  styleUrl: './faq-item.scss',
  host: { '[class.expanded]': 'expanded()' },
})
export class FaqItem {
  readonly item = input.required<FaqItemContent>();
  readonly number = input.required<number>();
  readonly expanded = model(false);
}

import { Component, input, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { FaqItemContent } from '../../models/content.model';
import { FaqItem } from './faq-item/faq-item';

/**
 * Accordion of questions; several answers may be open at once.
 *
 * @input items - Questions with their answers.
 */
@Component({
  selector: 'app-faq-accordion',
  imports: [FaqItem, RevealDirective],
  templateUrl: './faq-accordion.html',
  styleUrl: './faq-accordion.scss',
})
export class FaqAccordion {
  readonly items = input.required<FaqItemContent[]>();

  protected readonly expanded = signal(new Set<number>());

  protected setExpanded(index: number, expanded: boolean): void {
    this.expanded.update((current) => {
      const next = new Set(current);
      if (expanded) next.add(index);
      else next.delete(index);
      return next;
    });
  }
}

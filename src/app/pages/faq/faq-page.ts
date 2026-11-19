import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-faq-page',
  imports: [SectionHeading, FaqAccordion, TranslatePipe],
  templateUrl: './faq-page.html',
  styleUrl: './faq-page.scss',
})
export default class FaqPage {
  protected readonly content = toSignal(inject(ContentService).load('faq'));
}

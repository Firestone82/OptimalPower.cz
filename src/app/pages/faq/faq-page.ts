import { Component, DestroyRef, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FaqAccordion } from '../../components/faq-accordion/faq-accordion';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContentService } from '../../services/content.service';
import { I18nService } from '../../services/i18n.service';
import { SeoService } from '../../services/seo.service';
import { buildFaqSchema } from '../../utils/seo.util';

@Component({
  selector: 'app-faq-page',
  imports: [SectionHeading, FaqAccordion, TranslatePipe],
  templateUrl: './faq-page.html',
  styleUrl: './faq-page.scss',
})
export default class FaqPage {
  protected readonly content = toSignal(inject(ContentService).load('faq'));

  constructor() {
    const seo = inject(SeoService);
    const i18n = inject(I18nService);
    // Lets search engines show the questions directly in results.
    effect(() => {
      const content = this.content();
      seo.setPageSchema(content ? buildFaqSchema(content.items, i18n.language()) : null);
    });
    inject(DestroyRef).onDestroy(() => seo.setPageSchema(null));
  }
}

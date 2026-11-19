import { Component, computed, inject, input } from '@angular/core';
import { CompanyContent, LegalDocumentContent } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { I18nService } from '../../services/i18n.service';
import { SectionHeading } from '../section-heading/section-heading';
import { LegalSection } from './legal-section/legal-section';
import { LegalToc } from './legal-toc/legal-toc';

/**
 * Legal text page: title, effective date, intro, table of contents and numbered sections.
 *
 * @input document - The text to render.
 * @input company - Details shown in sections that set `showCompany`.
 */
@Component({
  selector: 'app-legal-document',
  imports: [SectionHeading, LegalToc, LegalSection, LocalizePipe, TranslatePipe],
  templateUrl: './legal-document.html',
  styleUrl: './legal-document.scss',
})
export class LegalDocument {
  readonly document = input.required<LegalDocumentContent>();
  readonly company = input<CompanyContent>();

  private readonly i18n = inject(I18nService);

  protected readonly effectiveFrom = computed(() =>
    new Intl.DateTimeFormat(this.i18n.language(), { dateStyle: 'long' }).format(
      new Date(this.document().effectiveFrom),
    ),
  );
}

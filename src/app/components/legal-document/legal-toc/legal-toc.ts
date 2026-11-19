import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LegalSectionContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';
import { TranslatePipe } from '../../../pipes/translate.pipe';

/**
 * Table of contents linking to the sections of a legal document. Sticky beside the
 * text on wide screens, collapsible above it on narrow ones.
 *
 * @input sections - Sections to list, in document order.
 */
@Component({
  selector: 'app-legal-toc',
  imports: [RouterLink, LocalizePipe, TranslatePipe],
  templateUrl: './legal-toc.html',
  styleUrl: './legal-toc.scss',
})
export class LegalToc {
  readonly sections = input.required<LegalSectionContent[]>();
}

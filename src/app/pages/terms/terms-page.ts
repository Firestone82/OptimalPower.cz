import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LegalDocument } from '../../components/legal-document/legal-document';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-terms-page',
  imports: [LegalDocument],
  templateUrl: './terms-page.html',
  styleUrl: './terms-page.scss',
})
export default class TermsPage {
  private readonly contentService = inject(ContentService);

  protected readonly content = toSignal(this.contentService.load('terms'));
  protected readonly company = toSignal(this.contentService.load('company'));
}

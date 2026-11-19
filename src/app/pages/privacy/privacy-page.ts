import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { LegalDocument } from '../../components/legal-document/legal-document';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-privacy-page',
  imports: [LegalDocument],
  templateUrl: './privacy-page.html',
  styleUrl: './privacy-page.scss',
})
export default class PrivacyPage {
  private readonly contentService = inject(ContentService);

  protected readonly content = toSignal(this.contentService.load('privacy'));
  protected readonly company = toSignal(this.contentService.load('company'));
}

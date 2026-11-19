import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReferenceList } from '../../components/reference-list/reference-list';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-references-page',
  imports: [SectionHeading, ReferenceList, TranslatePipe],
  templateUrl: './references-page.html',
  styleUrl: './references-page.scss',
})
export default class ReferencesPage {
  protected readonly content = toSignal(inject(ContentService).load('references'));
}

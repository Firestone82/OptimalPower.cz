import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureBlock } from '../../components/feature-block/feature-block';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-privacy-page',
  imports: [FeatureBlock],
  templateUrl: './privacy-page.html',
  styleUrl: './privacy-page.scss',
})
export default class PrivacyPage {
  protected readonly content = toSignal(inject(ContentService).load('privacy'));
}

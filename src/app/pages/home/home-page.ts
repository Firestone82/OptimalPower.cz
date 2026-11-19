import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FeatureBlock } from '../../components/feature-block/feature-block';
import { Hero } from '../../components/hero/hero';
import { HighlightGrid } from '../../components/highlight-grid/highlight-grid';
import { RevealDirective } from '../../directives/reveal.directive';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-home-page',
  imports: [Hero, FeatureBlock, HighlightGrid, LocalizePipe, RevealDirective],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export default class HomePage {
  protected readonly content = toSignal(inject(ContentService).load('home'));
}

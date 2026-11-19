import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ImageGrid } from '../../components/image-grid/image-grid';
import { Lightbox } from '../../components/lightbox/lightbox';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-gallery-page',
  imports: [SectionHeading, ImageGrid, Lightbox, TranslatePipe],
  templateUrl: './gallery-page.html',
  styleUrl: './gallery-page.scss',
})
export default class GalleryPage {
  protected readonly content = toSignal(inject(ContentService).load('gallery'));
  protected readonly lightboxIndex = signal<number | null>(null);
}

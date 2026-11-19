import { Component, computed, input, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';
import { ReferenceContent } from '../../models/content.model';
import { Lightbox } from '../lightbox/lightbox';
import { ReferenceCard } from './reference-card/reference-card';

/**
 * List of completed installations sharing one lightbox.
 *
 * @input items - References in display order.
 */
@Component({
  selector: 'app-reference-list',
  imports: [ReferenceCard, Lightbox, RevealDirective],
  templateUrl: './reference-list.html',
  styleUrl: './reference-list.scss',
})
export class ReferenceList {
  readonly items = input.required<ReferenceContent[]>();

  protected readonly opened = signal<{ reference: ReferenceContent; index: number } | null>(null);
  protected readonly openedImages = computed(() => this.opened()?.reference.images ?? []);

  protected open(reference: ReferenceContent, index: number): void {
    this.opened.set({ reference, index });
  }

  protected onIndexChange(index: number | null): void {
    this.opened.update((opened) => (opened && index !== null ? { ...opened, index } : null));
  }
}

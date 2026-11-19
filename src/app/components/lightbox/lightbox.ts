import { Component, ElementRef, computed, effect, input, model, viewChild } from '@angular/core';
import { Icon } from '../icon/icon';
import { ImageRef } from '../../models/content.model';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';

/**
 * Fullscreen image viewer with keyboard navigation (←, →, Esc).
 *
 * @input images - Images that can be browsed.
 * @model index - Index of the shown image; `null` hides the viewer.
 */
@Component({
  selector: 'app-lightbox',
  imports: [Icon, LocalizePipe, TranslatePipe],
  templateUrl: './lightbox.html',
  styleUrl: './lightbox.scss',
  host: { '(document:keydown)': 'onKeydown($event)' },
})
export class Lightbox {
  readonly images = input.required<ImageRef[]>();
  readonly index = model<number | null>(null);

  protected readonly current = computed(() => {
    const index = this.index();
    return index === null ? undefined : this.images()[index];
  });

  private readonly closeButton = viewChild<ElementRef<HTMLButtonElement>>('closeButton');

  constructor() {
    effect(() => this.closeButton()?.nativeElement.focus());
  }

  protected close(): void {
    this.index.set(null);
  }

  /** Wraps around in both directions. */
  protected step(offset: number): void {
    const count = this.images().length;
    this.index.update((index) => (index === null ? null : (index + offset + count) % count));
  }

  private touchStartX: number | null = null;

  protected onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0]?.clientX ?? null;
  }

  /** Horizontal swipe longer than 50 px switches the image. */
  protected onTouchEnd(event: TouchEvent): void {
    const endX = event.changedTouches[0]?.clientX;
    if (this.touchStartX === null || endX === undefined) return;

    const distance = endX - this.touchStartX;
    this.touchStartX = null;
    if (Math.abs(distance) > 50) this.step(distance < 0 ? 1 : -1);
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (!this.current()) return;

    const actions: Record<string, () => void> = {
      Escape: () => this.close(),
      ArrowLeft: () => this.step(-1),
      ArrowRight: () => this.step(1),
    };
    actions[event.key]?.();
  }
}

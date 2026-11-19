import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Lightbox } from '../../components/lightbox/lightbox';
import { SectionHeading } from '../../components/section-heading/section-heading';
import { YearTabs } from '../../components/year-tabs/year-tabs';
import { LocalizePipe } from '../../pipes/localize.pipe';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ContentService } from '../../services/content.service';

/** Map of installations per year; `?year=` preselects a year. */
@Component({
  selector: 'app-projects-page',
  imports: [SectionHeading, YearTabs, Lightbox, LocalizePipe, TranslatePipe],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.scss',
})
export default class ProjectsPage {
  /** Bound from the `year` query parameter. */
  readonly year = input<string>();

  private readonly content = toSignal(inject(ContentService).load('realizations'));

  protected readonly maps = computed(() =>
    [...(this.content()?.maps ?? [])].sort((a, b) => b.year - a.year),
  );
  protected readonly years = computed(() => this.maps().map((map) => map.year));
  protected readonly selectedYear = linkedSignal(() => {
    const requested = Number(this.year());
    return this.years().includes(requested) ? requested : this.years()[0];
  });
  protected readonly selectedMap = computed(() =>
    this.maps().find((map) => map.year === this.selectedYear()),
  );
  protected readonly lightboxIndex = signal<number | null>(null);
}

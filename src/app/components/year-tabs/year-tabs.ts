import { Component, input, model } from '@angular/core';

/**
 * Segmented control for picking a year.
 *
 * @input years - Selectable years in display order.
 * @input label - Accessible name of the group, already translated.
 * @model selected - Currently selected year (two-way bindable).
 */
@Component({
  selector: 'app-year-tabs',
  templateUrl: './year-tabs.html',
  styleUrl: './year-tabs.scss',
})
export class YearTabs {
  readonly years = input.required<number[]>();
  readonly label = input('');
  readonly selected = model<number>();
}

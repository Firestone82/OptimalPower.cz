import { Component, input } from '@angular/core';

/**
 * Label, projected control and error message.
 * The projected `<input>`/`<textarea>` must use `fieldId` as its `id`.
 *
 * @input fieldId - Id of the projected control.
 * @input label - Label text, already translated.
 * @input required - Shows the required marker.
 * @input error - Error text, already translated; empty hides it.
 */
@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss',
  host: { '[class.invalid]': '!!error()' },
})
export class FormField {
  readonly fieldId = input.required<string>();
  readonly label = input.required<string>();
  readonly required = input(false);
  readonly error = input<string | null>(null);
}

import { Component, input } from '@angular/core';
import { ReferenceSpec } from '../../../../models/content.model';
import { TranslatePipe } from '../../../../pipes/translate.pipe';

/**
 * Definition list of technical parameters.
 *
 * @input specs - Parameters; `type` selects the translated label, `url` makes the value a link.
 */
@Component({
  selector: 'app-reference-specs',
  imports: [TranslatePipe],
  templateUrl: './reference-specs.html',
  styleUrl: './reference-specs.scss',
})
export class ReferenceSpecs {
  readonly specs = input.required<ReferenceSpec[]>();
}

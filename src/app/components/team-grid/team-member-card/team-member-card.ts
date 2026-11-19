import { Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { TeamMemberContent } from '../../../models/content.model';
import { LocalizePipe } from '../../../pipes/localize.pipe';
import { toMailHref, toPhoneHref } from '../../../utils/contact.util';

/**
 * Contact card of a single person.
 *
 * @input member - Name, optional position, phone and e-mail.
 */
@Component({
  selector: 'app-team-member-card',
  imports: [NgIcon, LocalizePipe],
  templateUrl: './team-member-card.html',
  styleUrl: './team-member-card.scss',
})
export class TeamMemberCard {
  readonly member = input.required<TeamMemberContent>();

  /** Initials without academic titles, e.g. "Ing. Martin Mikula" → "MM". */
  protected readonly initials = computed(() =>
    this.member()
      .name.split(/\s+/)
      .filter((part) => !part.endsWith('.'))
      .map((part) => part[0])
      .join('')
      .slice(0, 2),
  );

  protected readonly toMailHref = toMailHref;
  protected readonly toPhoneHref = toPhoneHref;
}

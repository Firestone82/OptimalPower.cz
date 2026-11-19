import { Component, input } from '@angular/core';
import { TeamMemberContent } from '../../models/content.model';
import { TeamMemberCard } from './team-member-card/team-member-card';

/**
 * Grid of team member contact cards.
 *
 * @input members - Team members in display order.
 */
@Component({
  selector: 'app-team-grid',
  imports: [TeamMemberCard],
  templateUrl: './team-grid.html',
  styleUrl: './team-grid.scss',
})
export class TeamGrid {
  readonly members = input.required<TeamMemberContent[]>();
}

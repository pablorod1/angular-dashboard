import { Component } from '@angular/core';
import { Member } from './team-members';
import { TeamMembersDataService } from '../../../services/team-members-data.service';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrl: './team-members.component.css'
})
export class TeamMembersComponent {
  teamMembers!: Member[];

  constructor(private teamMembersDataService: TeamMembersDataService) { }

  ngOnInit() {
    this.teamMembers = this.teamMembersDataService.getMembers();
  }
}

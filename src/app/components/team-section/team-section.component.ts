import { Component, OnInit } from '@angular/core';
import { TeamMembersDataService } from '../../services/team-members-data.service';
import { Member } from '../team-members/team-members';
@Component({
  selector: 'app-team-section',
  templateUrl: './team-section.component.html',
  styleUrl: './team-section.component.css'
})
export class TeamSectionComponent implements OnInit{
  teamMembers: Member[] = []
  constructor (private teamMembersDataService: TeamMembersDataService) { }

  ngOnInit(): void {
    this.teamMembers = this.teamMembersDataService.getMembers();
  }
}

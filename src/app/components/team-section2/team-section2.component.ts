import { Component, OnInit } from '@angular/core';
import { Member } from '../team-members/team-members';
import { TeamMembersDataService } from '../../services/team-members-data.service';

@Component({
  selector: 'app-team-section2',
  templateUrl: './team-section2.component.html',
  styleUrl: './team-section2.component.css'
})
export class TeamSection2Component implements OnInit {
  members!: Member[];
  showPicture = true;
  showInfo = false;
  selectedMember: Member | undefined;

  constructor(private teamMembersDataService: TeamMembersDataService) { }

  ngOnInit(): void {
    this.members = this.teamMembersDataService.getMembers();
  }

  flipCard(){
    this.showPicture = !this.showPicture;
    this.showInfo = !this.showInfo;
  }
}

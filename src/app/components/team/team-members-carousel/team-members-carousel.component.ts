import { Component, OnInit } from '@angular/core';
import { TeamMembersDataService } from '../../../services/team-members-data.service';
import { Member } from '../team-members/team-members';

@Component({
  selector: 'app-team-members-carousel',
  templateUrl: './team-members-carousel.component.html',
  styleUrl: './team-members-carousel.component.css',
})
export class TeamMembersCarouselComponent implements OnInit {
  allTeamMembers!: Member[];
  teamMembers!: Member[];
  responsiveOptions!: any | undefined;

  constructor(private teamMembersDataService: TeamMembersDataService) {}

  ngOnInit(): void {
    this.allTeamMembers = this.teamMembersDataService.getMembers();
    this.teamMembers = this.allTeamMembers.slice(1);
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '425px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }
}

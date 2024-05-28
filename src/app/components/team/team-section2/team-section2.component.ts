import { Component, OnInit } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Member } from '../team-members/team-members';
import { TeamMembersDataService } from '../../../services/team-members-data.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-team-section2',
  templateUrl: './team-section2.component.html',
  styleUrl: './team-section2.component.css',
  animations: [
    trigger('titleAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ]
})
export class TeamSection2Component implements OnInit {
  members!: Member[];
  animateTitle: boolean = false;
  animateCards: boolean = false;

  constructor(private scrollDispatcher: ScrollDispatcher, private teamMembersDataService: TeamMembersDataService) {
    this.scrollDispatcher.scrolled().subscribe(() => {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (scrollOffset > 820) { // Adjust this value as needed
        this.animateTitle = true;
      }
    });
  }

  ngOnInit(): void {
    this.members = this.teamMembersDataService.getMembers();
  }
}

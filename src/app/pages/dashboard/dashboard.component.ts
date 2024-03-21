import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Member } from '../../components/team-members/team-members';
import { TeamMembersDataService } from '../../services/team-members-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  selectedProject = 1;
  teamMembers!: Member[];
  @Output() changeData = new EventEmitter<string>();

  constructor(private teamMembersDataService: TeamMembersDataService) { }

  ngOnInit(): void {
    this.teamMembers = this.teamMembersDataService.getMembers();
  }

  selectProject(projectNumber: number) {
    this.selectedProject = projectNumber;
  }
}


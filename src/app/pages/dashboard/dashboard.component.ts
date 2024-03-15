import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { IssuesChartDataService } from '../../services/issues-chart-data.service';

interface MenuItemInterface {
  label: string;
  icon: string;
  id: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  selectedProject = 1;
  items: MenuItemInterface[] | undefined;
  activeItem!: MenuItemInterface;
  @Output() changeData = new EventEmitter<string>();

  constructor(private issuesChartDataService: IssuesChartDataService) { }

  ngOnInit(){
    this.items = [
      {id:'home', label: 'Home', icon: 'bi bi-home'},
      {id:'budget', label: 'Budget', icon: 'bi bi-cash'},
      {id:'team', label: 'Team', icon: 'bi bi-people'}
    ];
    this.activeItem = this.items[0];
  }

  showLastWeekData(): void {
    this.changeData.emit('lastWeek');
  }
  showCurrentWeekData(): void {
    this.changeData.emit('currentWeek');
  }

  selectProject(projectNumber: number) {
    this.selectedProject = projectNumber;
  }
}


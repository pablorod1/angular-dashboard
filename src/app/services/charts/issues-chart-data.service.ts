import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IssuesChartDataService {
  private currentWeekData: any[] = [
    {
      name: 'Closed',
      type: 'column',
      data: [10, 9, 12, 7, 6, 5, 15],
    },
    {
      name: 'New',
      type: 'line',
      data: [25, 28, 32, 34, 20, 25, 19],
    },
  ];
  private lastWeekData: any[] = [
    {
      name: 'Closed',
      type: 'column',
      data: [4, 7, 15, 9, 8, 6, 12],
    },
    {
      name: 'New',
      type: 'line',
      data: [30, 33, 37, 34, 29, 24, 20],
    },
  ];

  setCurrentWeekData(data: any[]): void {
    this.currentWeekData = data;
  }
  setLastWeekData(data: any[]): void {
    this.lastWeekData = data;
  }
  getCurrentWeekData(): any[] {
    return this.currentWeekData;
  }
  getLastWeekData(): any[] {
    return this.lastWeekData;
  }
}

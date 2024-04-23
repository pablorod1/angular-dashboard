import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskChartDataService {
  private currentWeekData: any[] = [
    {
      data: [ 42, 39, 35, 29 ],
      type: ['API', 'Backend', 'Frontend', 'Issues']
    }
  ];
  private lastWeekData: any[] = [
    {
      data: [ 40, 35, 30, 28 ],
      type: ['API', 'Backend', 'Frontend', 'Issues']
    }
  ];

  setCurrentWeekData(data: any[]): void {
    this.currentWeekData = data;
  }
  setLastWeekData(data: any[]): void {
    this.lastWeekData = data;
  }
  getCurrentWeekData(): any[] {
    return [
      {type: 'API', data: 42},
      {type: 'Backend', data: 39},
      {type: 'Frontend', data: 35},
      {type: 'Issues', data: 29}
    ]
  }
  getLastWeekData(): any[] {
    return [
      {type: 'API', data: 40},
      {type: 'Backend', data: 35},
      {type: 'Frontend', data: 30},
      {type: 'Issues', data: 28}
    ]
  }
}

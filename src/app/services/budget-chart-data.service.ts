import { Injectable } from '@angular/core';
import {
  ApexDataLabels,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class BudgetChartDataService {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public responsive!: ApexResponsive[];

  getCurrentWeekData(): Observable<any[]> {
    this.series = [
      {
        name: 'Project 1',
        data: [30, 14, 25, 15, 16],
      },
    ];
    this.chart = {
      toolbar: {
        show: false
      },
      width: 800,
      type: 'radar', // Add the required 'data' property here
    };
    this.xaxis = {
      categories: ['Concept', 'Design', 'Development', 'Marketing', 'Extras'],
    };
    this.yaxis = {
      show: false,
    };
    this.dataLabels = {
      enabled: true,
      formatter: function (val) {
        return val + '%';
      },
      offsetX: 0,
      offsetY: -10,
    };
    this.markers = {
      size: 4,
      strokeWidth: 0,
    };
    this.responsive = [
      {
        breakpoint: 600,
        options: {
          chart: {
            width: '100%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];
    const data = [
      this.series,
      this.chart,
      this.dataLabels,
      this.markers,
      this.yaxis,
      this.xaxis,
      this.responsive,
    ];
    return of(data);
  }
}

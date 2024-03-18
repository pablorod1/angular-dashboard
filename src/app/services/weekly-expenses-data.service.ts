import { Injectable } from '@angular/core';
import {
  ApexDataLabels,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';
import { ShortcutsMenuComponent } from '../components/shortcuts-menu/shortcuts-menu.component';

@Injectable({
  providedIn: 'root',
})
export class WeeklyExpensesDataService {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public stroke!: ApexStroke;
  public grid!: ApexGrid;
  public colors!: string[];
  public responsive!: ApexResponsive[];

  getCurrentWeekData(): Observable<any[]> {
    this.series = [
      {
        name: 'Current Week Expenses',
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ];
    this.chart = {
      toolbar: {
        show: false,
      },
      height: 100,
      width: 250,
      type: 'line',
      zoom: {
        enabled: false,
      },
    };
    this.dataLabels = {
      enabled: false,
    };
    this.stroke = {
      curve: 'smooth',
    };
    this.xaxis = {
      type: 'category',
      categories: [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
      ],

      labels: {
        show: false,
      },
      axisBorder: {
        show: false // set this to false to hide the y-axis border
      },
      axisTicks:{
        show: false,
      },
    };
    this.colors = ['#0dcaf0'];
    this.yaxis = {
      axisTicks:{
        show: false,
      },
      show: false,
      labels: {
        show: false
      },
      axisBorder: {
        show: false // set this to false to hide the y-axis border
      }
    };
    this.grid = {
      show: false,
    };
    this.responsive = [
      {
        breakpoint: 900,
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
      this.stroke,
      this.responsive,
      this.grid,
      this.colors
    ];
    return of(data);
  }
}

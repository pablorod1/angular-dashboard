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
  ApexFill,
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
  public fill!: ApexFill;

  getCurrentWeekData(): Observable<any> {
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
      labels: {
        show: true,
        style: {
          fontSize: '14px',
          fontWeight: 600,
        },
      }
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
      offsetY: 20,
      background: {
        dropShadow: {
          enabled: true,
          left: 2,
          top: 1,
          opacity: 0.3,
        },
        borderColor: undefined,
      }
    };
    this.markers = {
      size: 5,
      strokeWidth: 0,
    };
    this.fill = {
      opacity: 0.3,
    }
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
    const chartOptions = {
      series: this.series,
      chart: this.chart,
      dataLabels: this.dataLabels,
      markers: this.markers,
      xaxis: this.xaxis,
      yaxis: this.yaxis,
      responsive: this.responsive,
      fill: this.fill,
    };
    return of(chartOptions);
  }
}

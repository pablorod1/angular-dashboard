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
  ApexGrid,
  ApexStroke,
  ApexTooltip
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceChartDataService {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public grid!: ApexGrid;
  public stroke!: ApexStroke;
  public tooltip!: ApexTooltip;
  public responsive!: ApexResponsive[];

  getBalanceChartData(): Observable<any>{
    this.series = [
      {
        name: 'Weekly Users',
        data: [3257, 3290, 3189, 3200, 3250, 3300, 3150]
      }
    ];
    this.chart = {
      height: 100,
      width: '100%',
      type: 'line',
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    };
    this.dataLabels = {
      enabled: false
    };
    this.stroke = {
      curve: 'smooth',
      width: 3
    };
    this.grid = {
      show: false
    };
    this.xaxis = {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    };
    this.yaxis = {
      show: false
    };
    this.tooltip = {
      enabled: true,
      theme: 'dark',
    };
    this.markers = {
      size: 4,
      strokeWidth: 0,
      shape: 'square'
    };
    this.responsive = [
      {
        breakpoint: 1700,
        options: {
          chart: {
            width: '70%',
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ];
    let balance = this.series[0].data[this.series[0].data.length - 1];
    const chartOptions = {
      series: this.series,
      chart: this.chart,
      dataLabels: this.dataLabels,
      markers: this.markers,
      yaxis: this.yaxis,
      xaxis: this.xaxis,
      grid: this.grid,
      stroke: this.stroke,
      tooltip: this.tooltip,
      responsive: this.responsive,
      balance: balance?.toLocaleString('en-US')
    };
    return of(chartOptions);
  }
}

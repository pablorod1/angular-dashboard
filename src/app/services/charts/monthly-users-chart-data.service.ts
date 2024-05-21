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
export class MonthlyUsersChartDataService {

  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public grid!: ApexGrid;
  public stroke!: ApexStroke;
  public tooltip!: ApexTooltip;
  public colors!: string[];
  public responsive!: ApexResponsive[];

  getMonthlyUsersChartData(): Observable<any>{
    this.series = [
      {
        name: 'Monthly Users',
        data: [13257, 13290, 13189, 13200, 13250, 13300, 13254]
      }
    ];
    this.chart = {
      height: 100,
      width: '100%',
      type: 'area',
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
      categories: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL'],
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
      size: 0,
      strokeWidth: 0,
      shape: 'square'
    };
    this.responsive = [
      {
        breakpoint: 1700,
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
    this.colors = ['#4b4bdf'];
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
      colors: this.colors,
      balance: balance?.toLocaleString('en-US')
    };
    return of(chartOptions);
  }
}

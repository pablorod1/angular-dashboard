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
  ApexTooltip,
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';

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
  public tooltip!: ApexTooltip;
  public responsive!: ApexResponsive[];

  getCurrentWeekData(): Observable<any> {
    this.series = [
      {
        name: 'Current Week Expenses',
        data: [3200, 2356, 4567, 2580, 5689, 2580, 5689],
      },
    ];
    this.chart = {
      toolbar: {
        show: false,
      },
      height: '100',
      width: 380,
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // set this to false to hide the y-axis border
      },
      axisTicks: {
        show: false,
      },
    };
    this.tooltip = {
      enabled: true,
      y: {
        formatter: function(value) {
          return value + ' €';
        }
      },
      theme: 'dark',
    };
    this.colors = ['#0dcaf0'];
    this.yaxis = {
      show: false,
    };
    this.grid = {
      show: false,
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
    const total = this.series[0].data.reduce((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
      } else {
        return a;
      }
    }, 0);
    const chartOptions = {
      series: this.series,
      chart: this.chart,
      dataLabels: this.dataLabels,
      markers: this.markers,
      yaxis: this.yaxis,
      xaxis: this.xaxis,
      stroke: this.stroke,
      grid: this.grid,
      colors: this.colors,
      tooltip: this.tooltip,
      responsive: this.responsive,
      total: total?.toLocaleString(),
    };
    return of(chartOptions);
  }

  getLastWeekData(): Observable<any> {
    this.series = [
      {
        name: 'Last Week Expenses',
        data: [4456, 5234, 4567, 2580, 5689, 2580, 5689],
      },
    ];
    this.chart = {
      toolbar: {
        show: false,
      },
      height: 100,
      width: 380,
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // set this to false to hide the y-axis border
      },
      axisTicks: {
        show: false,
      },
    };
    this.tooltip = {
      enabled: true,
      y: {
        formatter: function(value) {
          return value + ' €';
        }
      },
      theme: 'dark',
    };
    this.colors = ['#0dcaf0'];
    this.yaxis = {
      show: false,
    };
    this.grid = {
      show: false,
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
    const total = this.series[0].data.reduce((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
      } else {
        return a;
      }
    }, 0);
    const chartOptions = {
      series: this.series,
      chart: this.chart,
      dataLabels: this.dataLabels,
      markers: this.markers,
      yaxis: this.yaxis,
      xaxis: this.xaxis,
      stroke: this.stroke,
      grid: this.grid,
      colors: this.colors,
      tooltip: this.tooltip,
      responsive: this.responsive,
      total: total?.toLocaleString(),
    };
    return of(chartOptions);
  }
  get2WeeksAgoData(): Observable<any> {
    this.series = [
      {
        name: '2 Week Ago Expenses',
        data: [2678, 3485, 2352, 3157, 4444, 2314, 3567],
      },
    ];
    this.chart = {
      toolbar: {
        show: false,
      },
      height: '100',
      width: 380,
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
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

      labels: {
        show: false,
      },
      axisBorder: {
        show: false, // set this to false to hide the y-axis border
      },
      axisTicks: {
        show: false,
      },
    };
    this.tooltip = {
      enabled: true,
      y: {
        formatter: function(value) {
          return value + ' €';
        }
      },
      theme: 'dark',
    };
    this.colors = ['#0dcaf0'];
    this.yaxis = {
      show: false,
    };
    this.grid = {
      show: false,
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
    const total = this.series[0].data.reduce((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
      } else {
        return a;
      }
    }, 0);
    const chartOptions = {
      series: this.series,
      chart: this.chart,
      dataLabels: this.dataLabels,
      markers: this.markers,
      yaxis: this.yaxis,
      xaxis: this.xaxis,
      stroke: this.stroke,
      grid: this.grid,
      colors: this.colors,
      tooltip: this.tooltip,
      responsive: this.responsive,
      total: total?.toLocaleString(),
    };
    return of(chartOptions);
  }
}

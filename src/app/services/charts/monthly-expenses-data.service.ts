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
  providedIn: 'root'
})
export class MonthlyExpensesDataService {

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

  getCurrentMonthData(): Observable<any> {
    this.series = [
      {
        name: 'Current Month Expenses',
        data: [13034, 12623, 13225, 12443],
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
      categories: ['1st Week', '2nd Week', '3rd Week', '4th Week'], // set this to false to hide the x-axis border

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
    this.colors = ['#ffc107'];
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

  getLastMonthData(): Observable<any> {
    this.series = [
      {
        name: 'Last Month Expenses',
        data: [15567, 15034, 14389, 13926],
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
      categories: ['1st Week', '2nd Week', '3rd Week', '4th Week'],

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
    this.colors = ['#ffc107'];
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
  get2MonthsAgoData(): Observable<any> {
    this.series = [
      {
        name: '2 Months Ago Expenses',
        data: [10345, 12654, 13267, 10500],
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
      categories: ['1st Week', '2nd Week', '3rd Week', '4th Week'],

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
    this.colors = ['#ffc107'];
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

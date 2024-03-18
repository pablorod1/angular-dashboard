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
export class YearlyExpensesDataService {

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

  getCurrentYearData(): Observable<any> {
    this.series = [
      {
        name: 'Current Year Expenses',
        data: [40134, 41768, 41890, 42100, 40350, 45600, 45430, 43200, 44100, 44500, 45350, 46126],
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

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
          return value.toLocaleString() + ' €';
        }
      },
      theme: 'dark',
    };
    this.colors = ['#198754'];
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

  getLastYearData(): Observable<any> {
    this.series = [
      {
        name: 'Last Year Expenses',
        data: [46728, 42371, 45129, 45625, 45709, 44200, 43234, 44100, 44500, 45350, 46126, 46789],
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

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
    this.colors = ['#198754'];
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
  get2YearAgoData(): Observable<any> {
    this.series = [
      {
        name: '2 Year Ago Expenses',
        data: [46324, 45758, 44198, 43200, 46756, 42587, 43586, 41256, 45390, 44178, 42891, 43578],
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

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
    this.colors = ['#198754'];
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

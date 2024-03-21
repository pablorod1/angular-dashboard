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
  ApexTooltip,
  ApexPlotOptions
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EarningsChartDataService {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public grid!: ApexGrid;
  public stroke!: ApexStroke;
  public tooltip!: ApexTooltip;
  public plotOptions!: ApexPlotOptions;
  public responsive!: ApexResponsive[];

  getBalanceChartData(): Observable<any> {
    this.series = [
      {
        name: 'Earnings',
        data: [115, 100, 85, 56, 90, 62, 140],
      },
    ];
    this.chart = {
      height: 100,
      width: '100%',
      type: 'bar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    };
    this.dataLabels = {
      enabled: false,
    };
    this.stroke = {
      width: 0,
    };
    this.grid = {
      show: false,
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
      show: false,
    };
    this.tooltip = {
      enabled: true,
      theme: 'dark',
      y: {
        formatter: function (value) {
          return value + ' €';
        },
      },
    };
    this.markers = {
      size: 4,
      strokeWidth: 0,
      shape: 'square',
    };
    this.plotOptions = {
      bar: {
        columnWidth: '20%',
        isFunnel3d: true,
        borderRadius: 2,
      }
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
      grid: this.grid,
      stroke: this.stroke,
      tooltip: this.tooltip,
      responsive: this.responsive,
      plotOptions: this.plotOptions,
      total: total?.toLocaleString('es-ES', {
        style: 'currency',
        currency: 'EUR',
      }),
    };
    return of(chartOptions);
  }

}

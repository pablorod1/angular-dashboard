import { Injectable } from '@angular/core';
import {
  ApexDataLabels,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ChartComponent,
  ApexNonAxisChartSeries,
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
export class ExpensesChartDataService {
  public series!: ApexNonAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public grid!: ApexGrid;
  public stroke!: ApexStroke;
  public tooltip!: ApexTooltip;
  public plotOptions!: ApexPlotOptions;
  public labels!: string[];
  public responsive!: ApexResponsive[];

  getBalanceChartData(): Observable<any> {
    const balance = 10000;
    const expenses = 8000;
    const balancePercentage = (expenses / balance) * 100;
    this.series = [balancePercentage];
    this.chart = {
      height: 160,
      width: '100%',
      type: 'radialBar',
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
    this.labels = ['Expenses'];
    this.xaxis = {
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
          return value + '%';
        },
      },
    };
    this.markers = {
      size: 4,
      strokeWidth: 0,
      shape: 'square',
    };
    this.plotOptions = {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "100%",
          margin: 0, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false
          },
          value:{
            show: false
          }
        }
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
      labels: this.labels,
      expenses: expenses.toLocaleString('es-ES' , { style: 'currency', currency: 'EUR' }),
    };
    return of(chartOptions);
  }
}

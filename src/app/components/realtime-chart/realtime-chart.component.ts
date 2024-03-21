import { Component, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexChart,
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexFill,
  ApexYAxis,
  ApexXAxis,
  ApexTooltip,
  ApexMarkers,
  ApexAnnotations,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';
import { data } from './series-data';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  grid: ApexGrid;
  colors: any;
  toolbar: any;
};

@Component({
  selector: 'app-realtime-chart',
  templateUrl: './realtime-chart.component.html',
  styleUrl: './realtime-chart.component.css',
})
export class RealtimeChartComponent {
  @ViewChild('chart', { static: false }) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public activeOptionButton = 'all';
  public updateOptionsData = {
    '1m': {
      xaxis: {
        min: new Date('28 Jan 2013').getTime(),
        max: new Date('27 Feb 2013').getTime(),
      },
    },
    '6m': {
      xaxis: {
        min: new Date('27 Sep 2012').getTime(),
        max: new Date('27 Feb 2013').getTime(),
      },
    },
    '1y': {
      xaxis: {
        min: new Date('27 Feb 2012').getTime(),
        max: new Date('27 Feb 2013').getTime(),
      },
    },
    '1yd': {
      xaxis: {
        min: new Date('01 Jan 2013').getTime(),
        max: new Date('27 Feb 2013').getTime(),
      },
    },
    all: {
      xaxis: {
        min: undefined,
        max: undefined,
      },
    },
  };

  constructor() {
    this.initChart();
  }

  initChart(): void {
    this.chartOptions = {
      series: [
        {
          data: data
        },
      ],
      chart: {
        type: 'area',
        height: 350,
        animations: {
          enabled: false
        },

      },

      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      yaxis: {
        labels: {
          style: {
            colors: '#fff',
          },
        },
      },
      xaxis: {
        labels: {
          style: {
            colors: '#fff', // remove to hide the axis line
          },
        },
        type: 'datetime',
        min: new Date('01 Mar 2012').getTime(),
        tickAmount: 6,
      },
      tooltip: {
        theme: 'dark',
        x: {
          format: 'dd MMM yyyy',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
        },
      },
    };
  }
  generateRandomData(length: number) {
    return Array.from({length}, () => Math.floor(Math.random() * 40));
  }

  public updateOptions(option: keyof typeof this.updateOptionsData): void {
    this.activeOptionButton = option;
    this.chart.updateOptions(this.updateOptionsData[option], false, true, true);
  }
}


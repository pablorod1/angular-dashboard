import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
import { Subscription, timer } from 'rxjs';

interface ChartOptions {
  series: { data: [number, number][] }[];
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
}

@Component({
  selector: 'app-realtime-chart',
  templateUrl: './realtime-chart.component.html',
  styleUrl: './realtime-chart.component.css',
})
export class RealtimeChartComponent implements OnDestroy {
  @ViewChild('chart', { static: false }) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public activeOptionButton = 'all';
  public updateInterval = 3000;
  private dataSubscription: Subscription | undefined;

  constructor() {
    this.initChart();
    this.startRealtimeUpdates();
  }

  ngOnDestroy(): void {
    this.stopRealtimeUpdates();
  }

  initChart(): void {
    const transformedData = data.map(([timestamp, value]) => [
      timestamp,
      value,
    ]) as [number, number][];
    this.chartOptions = {
      series: [{ data: transformedData }],
      chart: {
        type: 'area',
        height: 350,
        animations: {
          enabled: true,
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
          formatter: function (val) {
            return val.toFixed(2);
          },
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
  startRealtimeUpdates(): void {
    this.dataSubscription = timer(0, this.updateInterval).subscribe(() => {
      const newDataPoint = this.generateRandomDataPoint();
      if (this.chartOptions && this.chartOptions.series) {
        const updatedSeriesData = [...this.chartOptions.series[0].data, newDataPoint];
        // console.log(updatedSeriesData[updatedSeriesData.length - 1]);
        const updatedSeries = [{ data: updatedSeriesData }];

        // Calculate the visible range
        const visibleRange = 100; // replace with the number of data points you want to show at a time
        const oldestVisibleDataPointIndex = Math.max(updatedSeriesData.length - visibleRange , 0);
        const oldestVisibleDataPointTime = updatedSeriesData[oldestVisibleDataPointIndex][0];

        const newestDataPointTime = updatedSeriesData[updatedSeriesData.length - 1][0];

        this.chartOptions = { ...this.chartOptions, series: updatedSeries };
        this.chart.updateOptions({
          xaxis: {
            min: oldestVisibleDataPointTime,
            max: newestDataPointTime
          },
          chart: {
            animations: {
              enabled: true,
              easing: 'linear',
              speed: 300,
              animateGradually: {
                enabled: true,
                delay: 150
              },
              dynamicAnimation: {
                enabled: true,
                speed: 350
              }
            },
          }
        }, false, true, true);
      }
    });
  }

  stopRealtimeUpdates(): void {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }


  generateRandomDataPoint(): [number, number] {
    if (this.chartOptions && this.chartOptions.series && this.chartOptions.series[0].data) {
      const lastIndex = this.chartOptions.series[0].data.length - 1;
      const lastDataPoint = this.chartOptions.series[0].data[lastIndex];
      const nextTimestamp = lastDataPoint[0] + 86400000; // Añade un día en milisegundos
      const min = 30;
      const max = 40;
      const randomValue = Math.random() * (max - min) + min;
      return [nextTimestamp, randomValue];
    }
    return [0, 0]; // Return default values if data is undefined
  }
}

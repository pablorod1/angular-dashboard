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
  @ViewChild('chart', { static: true }) chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  public activeOptionButton = 'all';
  public updateInterval = 3000; // Intervalo de actualización en milisegundos
  private dataSubscription: Subscription | undefined;
  paused = false;

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
    this.paused = false;
    this.dataSubscription = timer(0, this.updateInterval).subscribe(() => {
      const newDataPoint = this.generateRandomDataPoint(); // Generar datos aleatorios (timestamp, valor)
      if (this.chartOptions && this.chartOptions.series) { // Comprobar si la serie está definida
        const updatedSeriesData = [...this.chartOptions.series[0].data, newDataPoint]; // Añadir el nuevo punto de datos a la serie
        // console.log(updatedSeriesData[updatedSeriesData.length - 1]);
        const updatedSeries = [{ data: updatedSeriesData }]; // Actualizar la serie con los nuevos datos

        // Calculate the visible range
        const visibleRange = 100; // Número de datos visibles en la gráfica
        const oldestVisibleDataPointIndex = Math.max(updatedSeriesData.length - visibleRange , 0); // Índice del punto de datos más antiguo visible
        const oldestVisibleDataPointTime = updatedSeriesData[oldestVisibleDataPointIndex][0]; // Fecha del punto de datos más antiguo visible

        const newestDataPointTime = updatedSeriesData[updatedSeriesData.length - 1][0]; // Fecha del punto de datos más reciente

        this.chartOptions = { ...this.chartOptions, series: updatedSeries }; // Actualizar la serie de datos en las opciones de la gráfica
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
      this.paused = true;
    }
  }


  generateRandomDataPoint(): [number, number] {
    if (this.chartOptions && this.chartOptions.series && this.chartOptions.series[0].data) {
      const lastIndex = this.chartOptions.series[0].data.length - 1; // Índice del último punto de datos
      const lastDataPoint = this.chartOptions.series[0].data[lastIndex]; // Último punto de datos
      const nextTimestamp = lastDataPoint[0] + 86400000; // Añade un día en milisegundos
      const min = 35;
      const max = 40;
      const randomValue = Math.random() * (max - min) + min;
      return [nextTimestamp, randomValue];
    }
    return [0, 0]; // Devuelve un punto de datos por defecto
  }
}

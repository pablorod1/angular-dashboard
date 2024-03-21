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
  ApexPlotOptions,
  ApexLegend,
  ApexTitleSubtitle
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationChartDataService {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public tooltip!: ApexTooltip;
  public plotOptions!: ApexPlotOptions;
  public legend!: ApexLegend;
  public title!: ApexTitleSubtitle;
  public responsive!: ApexResponsive[];

  getLocationChartData(): Observable<any>{
    this.series = [
      {
        name: 'Location',
        data: [
          {
            x: 'INTC',
            y: 1.2,
          },
          {
            x: 'GS',
            y: 0.4,
          },
          {
            x: 'CVX',
            y: -1.4,
          },
          {
            x: 'GE',
            y: 2.7,
          },
          {
            x: 'CAT',
            y: -0.3,
          },
          {
            x: 'RTX',
            y: 5.1,
          },
          {
            x: 'CSCO',
            y: 1.3,
          },
          {
            x: 'IBM',
            y: 0.7,
          },
          {
            x: 'MSFT',
            y: 3.9,
          },
          {
            x: 'VZ',
            y: 1.3,
          },
          {
            x: 'AAPL',
            y: 2.1,
          },
          {
            x: 'BA',
            y: 1.2,
          },
          {
            x: 'TSLA',
            y: 4.7,
          },
          {
            x: 'NVDA',
            y: 2.3,
          },
          {
            x: 'AMD',
            y: 3.1,
          },
          {
            x: 'QCOM',
            y: 1.7,
          },
          {
            x: 'WMT',
            y: 1.3,
          },
          {
            x: 'DIS',
            y: 2.1,
          },
          {
            x: 'JNJ',
            y: 1.2,
          },
          {
            x: 'PFE',
            y: 1.7,
          },
          {
            x: 'MRK',
            y: 1.3,
          },
          {
            x: 'UNH',
            y: 2.1,
          },
          {
            x: 'COST',
            y: 1.2,
          },
          {
            x: 'HD',
            y: 1.7,
          },
          {
            x: 'NKE',
            y: 1.3,
          },
          {
            x: 'MCD',
            y: 2.
          }
        ]
      }
    ];
    this.legend = {
      show: false
    };
    this.chart = {
      height: 350,
      type: 'treemap',
      toolbar: {
        show: false
      }
    };
    this.title = {
      text: 'Location',
      align: 'center',
      style: {
        fontSize: '20px'
      }
    };
    this.dataLabels = {
      enabled: true,
      offsetY: -3
    };
    this.plotOptions = {
      treemap: {
        enableShades: true,
        shadeIntensity: 0.5,
        reverseNegativeShade: true,
        colorScale: {
          ranges: [
            {
              from: -6,
              to: 0,
              color: '#CD363A'
            },
            {
              from: 0.001,
              to: 6,
              color: '#52B12C'
            }
          ]
        }
      }
    };
    this.tooltip = {
      theme: 'dark',
    }
    const chartOptions = {
      series: this.series,
      chart: this.chart,
      dataLabels: this.dataLabels,
      tooltip: this.tooltip,
      responsive: this.responsive,
      title: this.title,
      legend: this.legend,
      plotOptions: this.plotOptions,
    };

    return of(chartOptions)
  }
}

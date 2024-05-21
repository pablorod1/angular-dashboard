import { Injectable } from '@angular/core';
import { locationData } from '../../components/charts/location-chart/location-data';
import { groupBy } from 'lodash';
import {
  ApexDataLabels,
  ApexResponsive,
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions,
  ApexLegend,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

  getLocationChartData(): Observable<any> {
    const groupedData = groupBy(locationData, 'parent');

    this.series = Object.entries(groupedData).map(([community, data]) => {
      const color = data[0].color;
      return {
        name: community,
        data: data.map((item) => ({ x: item.x, y: item.y})),
        color: color,
      }
    });
    this.legend = {
      show: false,
    };
    this.chart = {
      height: 700,
      type: 'treemap',
      toolbar: {
        show: false,
      },
    };
    this.title = {
      text: 'Location',
      align: 'center',
      style: {
        fontSize: '20px',
      },
    };
    this.dataLabels = {
      enabled: true,
      offsetY: -3,
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
              color: '#CD363A',
            },
            {
              from: 0.001,
              to: 6,
              color: '#52B12C',
            },
          ],
        },
      },
    };
    this.tooltip = {
      theme: 'dark',
    };
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

    return of(chartOptions);
  }
}

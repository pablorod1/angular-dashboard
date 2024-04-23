import { Component, ViewChild, OnInit } from '@angular/core';
import { LocationChartDataService } from '../../../services/charts/location-chart-data.service';
import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexChart,
  ApexPlotOptions,
  ApexLegend,
  ChartComponent,
  ApexTooltip
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};

@Component({
  selector: 'app-location-chart',
  templateUrl: './location-chart.component.html',
  styleUrl: './location-chart.component.css',
})
export class LocationChartComponent implements OnInit {
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  dataLabels!: ApexDataLabels;
  tooltip!: ApexTooltip;
  plotOptions!: ApexPlotOptions;
  title!: ApexTitleSubtitle;
  legend!: ApexLegend;

  constructor(private locationChartDataService: LocationChartDataService) {}

  ngOnInit(): void {
    this.locationChartDataService.getLocationChartData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.dataLabels = data.dataLabels;
      this.tooltip = data.tooltip;
      this.plotOptions = data.plotOptions;
      this.title = data.title;
      this.legend = data.legend;
    });
  }

}

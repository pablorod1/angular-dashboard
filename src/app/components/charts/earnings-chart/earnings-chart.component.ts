import { Component } from '@angular/core';
import { EarningsChartDataService } from '../../../services/charts/earnings-chart-data.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ApexTooltip,
  ApexPlotOptions
} from 'ng-apexcharts';

@Component({
  selector: 'app-earnings-chart',
  templateUrl: './earnings-chart.component.html',
  styleUrl: './earnings-chart.component.css'
})
export class EarningsChartComponent {
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  dataLabels!: ApexDataLabels;
  markers!: ApexMarkers;
  yaxis!: ApexYAxis;
  xaxis!: ApexXAxis;
  grid!: ApexGrid;
  stroke!: ApexStroke;
  tooltip!: ApexTooltip;
  plotOptions!: ApexPlotOptions;
  responsive!: ApexResponsive[];
  total!: number;

  constructor(private earningsChartDataService: EarningsChartDataService) {}

  ngOnInit(): void{
    this.earningsChartDataService.getBalanceChartData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.dataLabels = data.dataLabels;
      this.markers = data.markers;
      this.yaxis = data.yaxis;
      this.xaxis = data.xaxis;
      this.grid = data.grid;
      this.stroke = data.stroke;
      this.tooltip = data.tooltip;
      this.plotOptions = data.plotOptions;
      this.responsive = data.responsive;
      this.total = data.total;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { BalanceChartDataService } from '../../../services/charts/balance-chart-data.service';
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
} from 'ng-apexcharts';

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrl: './balance-chart.component.css'
})
export class BalanceChartComponent implements OnInit{
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  dataLabels!: ApexDataLabels;
  markers!: ApexMarkers;
  yaxis!: ApexYAxis;
  xaxis!: ApexXAxis;
  grid!: ApexGrid;
  stroke!: ApexStroke;
  tooltip!: ApexTooltip;
  responsive!: ApexResponsive[];
  colors!: string[];
  balance!: number;

  constructor(private balanceChartDataService: BalanceChartDataService) {}

  ngOnInit(): void{
    this.balanceChartDataService.getBalanceChartData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.dataLabels = data.dataLabels;
      this.markers = data.markers;
      this.yaxis = data.yaxis;
      this.xaxis = data.xaxis;
      this.grid = data.grid;
      this.stroke = data.stroke;
      this.tooltip = data.tooltip;
      this.responsive = data.responsive;
      this.colors = data.colors;
      this.balance = data.balance;
    });
  }

}

import { Component } from '@angular/core';
import { ExpensesChartDataService } from '../../services/expenses-chart-data.service';
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
  ApexPlotOptions,
} from 'ng-apexcharts';

@Component({
  selector: 'app-expenses-chart',
  templateUrl: './expenses-chart.component.html',
  styleUrl: './expenses-chart.component.css',
})
export class ExpensesChartComponent {
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
  expenses!: number;
  labels!: string[];

  constructor(private expensesChartDataService: ExpensesChartDataService) {}

  ngOnInit(): void {
    this.expensesChartDataService.getBalanceChartData().subscribe((data) => {
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
      this.labels = data.labels;
      this.expenses = data.expenses;
    });
  }
}

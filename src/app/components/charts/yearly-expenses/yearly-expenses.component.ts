import { Component } from '@angular/core';
import { YearlyExpensesDataService } from '../../../services/charts/yearly-expenses-data.service';
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
  selector: 'app-yearly-expenses',
  templateUrl: './yearly-expenses.component.html',
  styleUrl: './yearly-expenses.component.css'
})
export class YearlyExpensesComponent {
  series!: ApexAxisChartSeries;
  chart!: ApexChart;
  xaxis!: ApexXAxis;
  responsive!: ApexResponsive[];
  dataLabels!: ApexDataLabels;
  yaxis!: ApexYAxis;
  grid!: ApexGrid;
  markers!: ApexMarkers;
  stroke!: ApexStroke;
  tooltip!: ApexTooltip;
  colors!: string[];
  totalExpenses!: number;

  constructor(private yearlyExpensesDataService: YearlyExpensesDataService) {}

  ngOnInit(): void {
    this.yearlyExpensesDataService.getCurrentYearData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.xaxis = data.xaxis;
      this.responsive = data.responsive;
      this.dataLabels = data.dataLabels;
      this.yaxis = data.yaxis;
      this.grid = data.grid;
      this.markers = data.markers;
      this.stroke = data.stroke;
      this.tooltip = data.tooltip;
      this.colors = data.colors;
      this.totalExpenses = data.total;
    });
  }
  showLastYearData(): void {
    this.yearlyExpensesDataService.getLastYearData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.xaxis = data.xaxis;
      this.responsive = data.responsive;
      this.dataLabels = data.dataLabels;
      this.yaxis = data.yaxis;
      this.grid = data.grid;
      this.markers = data.markers;
      this.stroke = data.stroke;
      this.tooltip = data.tooltip;
      this.colors = data.colors;
      this.totalExpenses = data.total;
    });
  }
  showCurrentYearData(): void {
    this.yearlyExpensesDataService.getCurrentYearData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.xaxis = data.xaxis;
      this.responsive = data.responsive;
      this.dataLabels = data.dataLabels;
      this.yaxis = data.yaxis;
      this.grid = data.grid;
      this.markers = data.markers;
      this.stroke = data.stroke;
      this.tooltip = data.tooltip;
      this.colors = data.colors;
      this.totalExpenses = data.total;
    });
  }
  show2YearsAgoData(): void {
    this.yearlyExpensesDataService.get2YearAgoData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.xaxis = data.xaxis;
      this.responsive = data.responsive;
      this.dataLabels = data.dataLabels;
      this.yaxis = data.yaxis;
      this.grid = data.grid;
      this.markers = data.markers;
      this.stroke = data.stroke;
      this.tooltip = data.tooltip;
      this.colors = data.colors;
      this.totalExpenses = data.total;
    });
  }
}

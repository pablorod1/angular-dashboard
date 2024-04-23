import { Component } from '@angular/core';
import { WeeklyExpensesDataService } from '../../../services/charts/weekly-expenses-data.service';
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
  selector: 'app-weekly-expenses',
  templateUrl: './weekly-expenses.component.html',
  styleUrl: './weekly-expenses.component.css',
})
export class WeeklyExpensesComponent {
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

  constructor(private weeklyExpensesDataService: WeeklyExpensesDataService) {}

  ngOnInit(): void {
    this.weeklyExpensesDataService.getCurrentWeekData().subscribe((data) => {
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
  showLastWeekData(): void {
    this.weeklyExpensesDataService.getLastWeekData().subscribe((data) => {
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
  showCurrentWeekData(): void {
    this.weeklyExpensesDataService.getCurrentWeekData().subscribe((data) => {
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
  show2WeeksAgoData(): void {
    this.weeklyExpensesDataService.get2WeeksAgoData().subscribe((data) => {
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

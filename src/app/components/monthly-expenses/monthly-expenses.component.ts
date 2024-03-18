import { Component } from '@angular/core';
import { MonthlyExpensesDataService } from '../../services/monthly-expenses-data.service';
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
  selector: 'app-monthly-expenses',
  templateUrl: './monthly-expenses.component.html',
  styleUrl: './monthly-expenses.component.css'
})
export class MonthlyExpensesComponent {
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

  constructor(private monthlyExpensesDataService: MonthlyExpensesDataService) {}

  ngOnInit(): void {
    this.monthlyExpensesDataService.getCurrentMonthData().subscribe((data) => {
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
    this.monthlyExpensesDataService.getLastMonthData().subscribe((data) => {
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
    this.monthlyExpensesDataService.getCurrentMonthData().subscribe((data) => {
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
    this.monthlyExpensesDataService.get2MonthsAgoData().subscribe((data) => {
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

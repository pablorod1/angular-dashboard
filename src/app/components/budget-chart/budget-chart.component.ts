import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetChartDataService } from '../../services/budget-chart-data.service';
import {
  ApexDataLabels,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ChartComponent,
  ApexFill,
} from 'ng-apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexXAxis } from 'ng-apexcharts';

@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.css',
})
export class BudgetChartComponent implements OnInit {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public responsive!: ApexResponsive[];
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public fill!: ApexFill;

  constructor(private budgetChartDataService: BudgetChartDataService) {}

  ngOnInit(): void {
    this.budgetChartDataService.getCurrentWeekData().subscribe((data) => {
      this.series = data.series;
      this.chart = data.chart;
      this.dataLabels = data.dataLabels;
      this.markers = data.markers;
      this.yaxis = data.yaxis;
      this.xaxis = data.xaxis;
      this.responsive = data.responsive;
      this.fill = data.fill;
    });
  }
}

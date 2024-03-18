import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetChartDataService } from '../../services/budget-chart-data.service';
import {
  ApexDataLabels,
  ApexMarkers,
  ApexResponsive,
  ApexYAxis,
  ChartComponent,
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

  constructor(private budgetChartDataService: BudgetChartDataService) {}

  ngOnInit(): void {
    this.budgetChartDataService
      .getCurrentWeekData()
      .subscribe(
        ([series, chart, dataLabels, markers, yaxis, xaxis, responsive]) => {
          this.series = series;
          this.chart = chart;
          this.dataLabels = dataLabels;
          this.yaxis = yaxis;
          this.xaxis = xaxis;
          this.responsive = responsive;
          this.markers = markers;
        }
      );
  }

}

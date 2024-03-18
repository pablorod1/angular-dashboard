import { Component } from '@angular/core';
import { WeeklyExpensesDataService } from '../../services/weekly-expenses-data.service';
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
} from 'ng-apexcharts';

@Component({
  selector: 'app-weekly-expenses',
  templateUrl: './weekly-expenses.component.html',
  styleUrl: './weekly-expenses.component.css',
})
export class WeeklyExpensesComponent {
  public series!: ApexAxisChartSeries;
  public chart!: ApexChart;
  public dataLabels!: ApexDataLabels;
  public markers!: ApexMarkers;
  public responsive!: ApexResponsive[];
  public yaxis!: ApexYAxis;
  public xaxis!: ApexXAxis;
  public stroke!: ApexStroke;
  public grid!: ApexGrid;
  public colors!: string[];

  constructor(private weeklyExpensesDataService: WeeklyExpensesDataService) {}

  ngOnInit(): void {
    this.weeklyExpensesDataService
      .getCurrentWeekData()
      .subscribe(
        ([
          series,
          chart,
          dataLabels,
          stroke,
          markers,
          yaxis,
          xaxis,
          responsive,
          grid, colors
        ]) => {
          this.series = series;
          this.chart = chart;
          this.dataLabels = dataLabels;
          this.markers = markers;
          this.yaxis = yaxis;
          this.xaxis = xaxis;
          this.stroke = stroke;
          this.responsive = responsive;
          this.markers = markers;
          this.grid = grid;
          this.colors = colors;
        }
      );
  }
}

import { Component } from '@angular/core';
import { MonthlyUsersChartDataService } from '../../../services/charts/monthly-users-chart-data.service';
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
  selector: 'app-monthly-users',
  templateUrl: './monthly-users.component.html',
  styleUrl: './monthly-users.component.css'
})
export class MonthlyUsersComponent {
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
  balance!: number;

  constructor(private monthlyUsersChartDataService: MonthlyUsersChartDataService) {}

  ngOnInit(): void{
    this.monthlyUsersChartDataService.getMonthlyUsersChartData().subscribe((data) => {
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
      this.balance = data.balance;
    });
  }

}

import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { TaskChartDataService } from '../../services/task-chart-data.service';
import {
  ChartComponent,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexTheme,
  ApexTitleSubtitle,
  ApexFill,
  ApexStroke,
  ApexYAxis,
  ApexLegend,
  ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  legend: ApexLegend;
  dataLabels: any;
  plotOptions: ApexPlotOptions;
};

@Component({
  selector: 'app-tasks-charts',
  templateUrl: './tasks-charts.component.html',
  styleUrl: './tasks-charts.component.css',
})
export class TasksChartsComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  totalTasksCount!: number;
  completedTaskCount!: number;

  constructor(
    private tasksChartDataService: TaskChartDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const currentWeekData = this.tasksChartDataService.getCurrentWeekData();
    const seriesData = currentWeekData.map((item) => item.data);
    this.totalTasksCount = seriesData.reduce((a, b) => a + b, 0);
    const randomNum = Math.floor(Math.random() * this.totalTasksCount);
    this.completedTaskCount = this.totalTasksCount - randomNum;
    this.chartOptions = {
      series: seriesData,
      chart: {
        width: 600,
        type: 'polarArea',
      },
      labels: ['API', 'Backend', 'Frontend', 'Issues'],
      fill: {
        opacity: 0.8,
      },
      stroke: {
        width: 2,
        colors: ['#fff'],
      },
      yaxis: {
        show: false,
      },
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        polarArea: {
          rings: {
            strokeWidth: 1,
          },
        },
      },
      dataLabels: {
        enabled: true,
      },
      theme: {
        monochrome: {
          enabled: true,
          shadeTo: 'light',
          shadeIntensity: 0.5,
        },
      },
      responsive: [
        {
          breakpoint: 900,
          options: {
            chart: {
              width: '100%',
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
  showCurrentWeekData(): void {
    const data = this.tasksChartDataService.getCurrentWeekData();
    const seriesData = data.map((item) => item.data);
    this.chartOptions.series = seriesData;
    this.totalTasksCount = seriesData.reduce((a, b) => a + b, 0);
    this.cdRef.detectChanges();
  }
  showLastWeekData(): void {
    const data = this.tasksChartDataService.getLastWeekData();
    const seriesData = data.map((item) => item.data);
    this.chartOptions.series = seriesData;
    this.totalTasksCount = seriesData.reduce((a, b) => a + b, 0);
    this.cdRef.detectChanges();
  }
}

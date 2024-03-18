import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IssuesChartDataService } from '../../services/issues-chart-data.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexMarkers
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  colors: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
  markers: ApexMarkers;
};



@Component({
  selector: 'app-issues-chart',
  templateUrl: './issues-chart.component.html',
  styleUrl: './issues-chart.component.css'
})
export class IssuesChartComponent {
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  newIssuesCount!: number;
  closedIssuesCount!: number;

  constructor( private issuesChartDataService: IssuesChartDataService, private cdRef: ChangeDetectorRef) {
    const currentWeekData = this.issuesChartDataService.getCurrentWeekData();
    this.chartOptions = {
      series: currentWeekData,
      chart: {
        height: 350,
        type: "line",
        toolbar: {
          show: false
        }
      },
      colors: ["#198754", "#0d6efd"],
      stroke: {
        width: [0, 4]
      },
      dataLabels: {
        offsetX: 0,
        offsetY: -10,
        enabled: true,
        enabledOnSeries: [1],
        background: {
          dropShadow: {
            enabled: true,
            left: 2,
            top: 1,
            opacity: 0.3,
          },
          borderColor: undefined,
        }
      },
      labels: [
        "MON",
        "TUE",
        "WED",
        "THU",
        "FRI",
        "SAT",
        "SUN",
      ],
      xaxis: {
        type: "category"
      },
      markers: {
        size: 5,
        strokeWidth: 0,
      },
      tooltip: {
        theme: "dark",
      }
    };
    this.newIssuesCount = currentWeekData[1].data.reduce((a: number, b: number) => a + b, 0);
    this.closedIssuesCount = currentWeekData[0].data.reduce((a: number, b: number) => a + b, 0);
  }

  showLastWeekData(): void {
    const data = this.issuesChartDataService.getLastWeekData();
    this.chartOptions.series = data;
    this.newIssuesCount = data[1].data.reduce((a: number, b: number) => a + b, 0);
    this.closedIssuesCount = data[0].data.reduce((a: number, b: number) => a + b, 0);
    this.cdRef.detectChanges();
  }

  showCurrentWeekData(): void {
    const data = this.issuesChartDataService.getCurrentWeekData();
    this.chartOptions.series = data;
    this.newIssuesCount = data[1].data.reduce((a: number, b: number) => a + b, 0);
    this.closedIssuesCount = data[0].data.reduce((a: number, b: number) => a + b, 0);
    this.cdRef.detectChanges();
  }

}


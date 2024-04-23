import { Injectable, ViewChild } from '@angular/core';
import { BudgetTableDataService } from './budget-table-data.service';
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexTooltip,
  ApexDataLabels,
  ChartComponent,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
};
@Injectable({
  providedIn: 'root',
})
export class BudgetChartDataService {
  @ViewChild('chart') chart!: ChartComponent;

  constructor(private budgetTableDataService: BudgetTableDataService) {}
  getBudgetChartData() {
    const budgetTableData = this.budgetTableDataService.getBudgetTableData();
    const budgetChartData = budgetTableData.map((data) => {
      if (typeof data.expensesPercentage !== 'number') {
        console.error('expensesPercentage is not a number:', data.expensesPercentage);
        return null;
      }
      return {
        series: [data.expensesPercentage],
        chart: {
          height: 270,
          type: 'radialBar',
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 3,
            left:0,
            blur: 2,
            color: data.color,
            opacity: 0.3,
          },
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '70%',
            },
            track: {
              background: data.color,
              opacity: 0.2,
            },
            dataLabels: {
              name: {
                fontSize: '20px',
                fontWeight: 600,
              },
              value: {
                fontSize: '16px',
                fontWeight: 'bold',
              },
            },
          },
        },
        tooltip: {
          enabled: true,
          show: true,
          theme: 'dark',
          followCursor: false,
          y: {
            formatter: function (val: any) {
              return val + '%';
            },
          },
        },
        stroke: {
          lineCap: 'round',
        },
        colors: [data.color],
        labels: [data.name],
        remaining: data.remaining,
        expenses: data.expenses,
      };
    }).filter(Boolean);
    return budgetChartData;
  }
}

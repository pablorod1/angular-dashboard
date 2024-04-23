import { Component, OnInit, ViewChild } from '@angular/core';
import { BudgetChartDataService } from '../../../services/charts/budget-chart-data.service';
import { BudgetTableDataService } from '../../../services/charts/budget-table-data.service';
import { Budget } from '../budget-table/budget';
@Component({
  selector: 'app-budget-chart',
  templateUrl: './budget-chart.component.html',
  styleUrl: './budget-chart.component.css',
})
export class BudgetChartComponent implements OnInit {
  charts!: any[];
  budgetTableData!: Budget[];

  constructor(
    private budgetChartDataService: BudgetChartDataService,
    private budgetTableDataService: BudgetTableDataService
  ) {}

  ngOnInit(): void {
    this.charts = this.budgetChartDataService.getBudgetChartData();
    this.budgetTableData = this.budgetTableDataService.getBudgetTableData();
  }
}

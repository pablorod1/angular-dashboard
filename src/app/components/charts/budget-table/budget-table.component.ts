import { Component } from '@angular/core';
import { Budget } from './budget';
import { BudgetTableDataService } from '../../../services/charts/budget-table-data.service';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-budget-table',
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})
export class BudgetTableComponent {
  budgetTableData!: Budget[];
  cols!: Column[];

  constructor(private budgetTableDataService: BudgetTableDataService) {}

  ngOnInit() {
    this.budgetTableData = this.budgetTableDataService.getBudgetTableData();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'totalBudget', header: 'Total Budget (EUR)' },
      { field: 'expenses', header: 'Expenses (EUR)' },
      { field: 'expensesPercentage', header: 'Expenses Percentage (%)' },
      { field: 'remaining', header: 'Remaining (EUR)' },
      { field: 'remainingPercentage', header: 'Remaining Percentage (%)' }
    ];

  }
  getBadgeClass(name: string): string {
    switch (name) {
      case 'Concept':
        return 'bg-danger';
      case 'Development':
        return 'bg-warning';
      case 'Design':
        return 'bg-info';
      case 'Marketing':
        return 'bg-success';
      case 'Extras':
        return 'bg-primary';
      default:
        return 'bg-primary'; // Add a default return statement to handle unmatched cases
    }
  }
}

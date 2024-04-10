import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BudgetTableDataService {
  getBudgetTableData() {
    return [
      {
        id: 1,
        name: 'Concept',
        totalBudget: 15000,
        expenses: 14000,
        expensesPercentage: 93.33,
        remaining: 1000,
        remainingPercentage: 6.67,
        color: '#DC3545'
      },
      {
        id: 2,
        name: 'Design',
        totalBudget: 20000,
        expenses: 10000,
        expensesPercentage: 50,
        remaining: 10000,
        remainingPercentage: 50,
        color: '#0DCAF0'
      },
      {
        id: 3,
        name: 'Development',
        totalBudget: 30456,
        expenses: 25876,
        expensesPercentage: 84.99,
        remaining: 5580,
        remainingPercentage: 15.01,
        color: '#FFC107'
      },
      {
        id: 4,
        name: 'Marketing',
        totalBudget: 12567,
        expenses: 12567,
        expensesPercentage: 100,
        remaining:  0,
        remainingPercentage: 0,
        color: '#198754'
      },
      {
        id: 5,
        name: 'Extras',
        totalBudget: 17894,
        expenses: 15678,
        expensesPercentage: 87.5,
        remaining: 2216,
        remainingPercentage: 12.5
      }
    ]
  }
}

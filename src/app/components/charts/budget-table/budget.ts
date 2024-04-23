export interface Budget {
  id: number;
  name: string;
  totalBudget: number;
  expenses: number;
  expensesPercentage: number;
  remaining: number;
  remainingPercentage: number;
}

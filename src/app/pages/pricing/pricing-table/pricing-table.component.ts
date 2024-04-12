import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrl: './pricing-table.component.css'
})
export class PricingTableComponent {
  pricingType = 'monthly';
  value = [1];
  plans = [
    {
      name: 'Personal',
      monthlyPrice: 9,
      yearlyPrice: 6,
    },
    {
      name: 'Premium',
      monthlyPrice: 19,
      yearlyPrice: 14,
    },
    {
      name: 'Enterprise',
      monthlyPrice: 49,
      yearlyPrice: 39,
    }
  ];
}

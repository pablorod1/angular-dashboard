import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing-classic',
  templateUrl: './pricing-classic.component.html',
  styleUrl: './pricing-classic.component.css'
})
export class PricingClassicComponent {
  pricingType = 'monthly';

  toggleMonthly(){
    this.pricingType = 'monthly';
  }
  toggleYearly(){
    this.pricingType = 'yearly';
  }
}

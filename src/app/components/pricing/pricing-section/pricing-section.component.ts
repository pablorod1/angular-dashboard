import { Component } from '@angular/core';

@Component({
  selector: 'app-pricing-section',
  templateUrl: './pricing-section.component.html',
  styleUrl: './pricing-section.component.css'
})
export class PricingSectionComponent {
  pricingType = 'monthly';

  toggleMonthly(){
    this.pricingType = 'monthly';
  }
  toggleYearly(){
    this.pricingType = 'yearly';
  }
}

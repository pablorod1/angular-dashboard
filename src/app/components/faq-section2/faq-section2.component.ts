import { Component } from '@angular/core';

@Component({
  selector: 'app-faq-section2',
  templateUrl: './faq-section2.component.html',
  styleUrl: './faq-section2.component.css'
})
export class FaqSection2Component {
  accordionData: any[] = [
    {
      header: 'Is there a 14-day free trial?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
    },
    {
      header: 'Can I cancel my subscription?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
    },
    {
      header: 'Can I upgrade my plan?',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
    }
  ]
}

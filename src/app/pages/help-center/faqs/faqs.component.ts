import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.css'
})
export class FaqsComponent {
  frequentlyQuestions = [
    {
      title: 'Most Asked',
      questions: [
        {
          header: 'Is there a 14-day free trial?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'What is the refund policy?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        }
      ]
    },
    {
      title: 'General Questions',
      questions: [
        {
          header: 'How to download your items',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'I have forgotten my password',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How to contact an author?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        }
      ]
    },
    {
      title: 'Licenses',
      questions: [
        {
          header: 'What is the refund policy?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        }
      ]
    },
    {
      title: 'Payments',
      questions: [
        {
          header: 'What is the refund policy?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        }
      ]
    },
    {
      title: 'Support',
      questions: [
        {
          header: 'What is the refund policy?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        },
        {
          header: 'How do I cancel my subscription?',
          content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus eget sapien.'
        }
      ]
    }

  ]
}

import { Component, OnInit } from '@angular/core';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';

@Component({
  selector: 'app-features-section3',
  templateUrl: './features-section3.component.html',
  styleUrl: './features-section3.component.css',
  animations: [
    trigger('containerAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(500px)', scale: 0.6 }),
        animate('800ms ease-out', style({ opacity: 1, scale: 1, transform: 'none' })),
      ]),
    ]),
  ]
})
export class FeaturesSection3Component implements OnInit {
  features: any[] = [];
  responsiveOptions: any[] | undefined;
  animateContainer: boolean = false;

  constructor(private scrollDispatcher: ScrollDispatcher) {
    this.scrollDispatcher.scrolled().subscribe(() => {
      const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

      if (scrollOffset > 300) { // Adjust this value as needed
        this.animateContainer = true;
      }
    });
  }

  ngOnInit() {
    this.features = [
      {
        title: 'Ask Anything',
        description: 'Ask any question and get answers from real people with first-hand experience',
        icon: 'bi bi-chat',
        backgroundColor: 'bg-success text-white',
        url: '/help-home'
      },
      {
        title: 'Get Paid',
        description: 'Earn money by answering questions and sharing your knowledge with others',
        icon: 'bi bi-cash',
        backgroundColor: 'bg-warning text-white',
        url: '/pricing-classic'
      },
      {
        title: 'Share Knowledge',
        description: 'Share your knowledge and experience with others and help them succeed',
        icon: 'bi bi-share',
        backgroundColor: 'bg-info text-white',
        url: '/blog'
      },
      {
        title: 'Build Reputation',
        description: 'Build your reputation by answering questions and helping others succeed',
        icon: 'bi bi-star',
        backgroundColor: 'bg-danger text-white',
        url: '/dashboard'
      },
      {
        title: 'Get Recognized',
        description: 'Get recognized for your expertise and knowledge in your field of interest',
        icon: 'bi bi-award',
        backgroundColor: 'bg-primary text-white',
        url: '/poi'
      },
      {
        title: 'Grow Your Network',
        description: 'Grow your network by connecting with other professionals and experts in your field',
        icon: 'bi bi-people',
        backgroundColor: 'bg-secondary text-white',
        url: '/analytics'
      },
      {
        title: 'Stay Informed',
        description: 'Stay informed about the latest trends and developments in your field of interest',
        icon: 'bi bi-newspaper',
        backgroundColor: 'bg-dark text-white',
        url: '/help-home'
      }
    ]
    this.responsiveOptions = [
        {
            breakpoint: '1600px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '768px',
            numVisible: 1,
            numScroll: 1
        }
    ];
}
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-features-section',
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css'
})
export class FeaturesSectionComponent {
  features: any[] = [
    {
      title: 'Easy to Use',
      icon: 'bi bi-pencil-square',
      description: 'Our platform is easy to use and intuitive. No need for a manual.'
    },
    {
      title: 'Secure',
      icon: 'bi bi-shield-check',
      description: 'We use the latest security protocols to keep your data safe.'
    },
    {
      title: '24/7 Support',
      icon: 'bi bi-headset',
      description: 'We have a dedicated support team ready to assist you.'
    },
    {
      title: 'Customizable',
      icon: 'bi bi-gear',
      description: 'Customize the platform to suit your needs.'
    },
    {
      title: 'Mobile App',
      icon: 'bi bi-phone',
      description: 'Access the platform on the go with our mobile app.'
    },
    {
      title: 'Free Updates',
      icon: 'bi bi-arrow-repeat',
      description: 'We provide free updates to keep the platform up to date.'
    }
  ];
}

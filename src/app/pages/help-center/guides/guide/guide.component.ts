import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guide',
  templateUrl: './guide.component.html',
  styleUrl: './guide.component.css'
})
export class GuideComponent implements OnInit {
  guideTitle!: string;
  guide!: any;
  guides = [
    {
      id: 1,
      title: 'Getting Started',
      url: 'guides/getting-started',
      guidesLinks: [
        {title: 'What is this app?', id: 1},
        {title: 'Start using the app', id: 2},
        {title: 'Signing in to the dashboard', id: 3},
        {title: 'Navigating within the app', id: 4},
      ]
    },
    {
      id: 2,
      title: 'Projects',
      url: 'guides/projects',
      guidesLinks: [
        {title: 'Creating a new project', id: 1},
        {title: 'Editing a project', id: 2},
        {title: 'Displaying a project', id: 3},
        {title: 'Deleting a project', id: 4},
        {title: 'Project permissions', id: 5},
        {title: 'Project settings', id: 6},
      ]
    },
    {
      id: 3,
      title: 'Settings',
      url: 'guides/settings',
      guidesLinks: [
        {title: 'General Settings', id: 1},
        {title: 'Project Settings', id: 2},
        {title: 'Media Settings', id: 3},
        {title: 'User Settings', id: 4},
        {title: 'Advanced Settings', id: 5},
        {title: 'Security Settings', id: 6},
        {title: 'Notification Settings', id: 7},
      ]
    },
    {
      id: 4,
      title: 'Billing',
      url: 'guides/billing',
      guidesLinks: [
        {title: 'Billing Overview', id: 1},
        {title: 'Changing your plan', id: 2},
        {title: 'Updating your payment method', id: 3},
        {title: 'Viewing your invoices', id: 4},
        {title: 'Payment history', id: 5},
        {title: 'Updating Payment Information', id: 6},
      ]
    },
    {
      id: 5,
      title: 'Account',
      url: 'guides/account',
      guidesLinks: [
        {title: 'Account Overview', id: 1},
        {title: 'Changing your email', id: 2},
        {title: 'Changing your password', id: 3},
        {title: 'Deleting your account', id: 4},
        {title: 'Account security', id: 5},
        {title: 'Account notifications', id: 6},
        {title: 'Account settings', id: 7},
      ]
    }
  ]

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.guideTitle = params['guidesLinks.title'].toString();
      this.guide = this.guides.find(guidesLinks => guidesLinks.title === this.guideTitle);
    });
  }
}

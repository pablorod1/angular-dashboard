import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.css'
})
export class GuidesComponent {

  guideTitle!: string;

  constructor(
    private router: Router
  ) {}

  guides = [
    {
      id: 1,
      title: 'Getting Started',
      url: 'guides/getting-started',
      guidesLinks: [
        {title: 'What is this app?'},
        {title: 'Start using the app'},
        {title: 'Signing in to the dashboard'},
        {title: 'Navigating within the app'},
      ]
    },
    {
      id: 2,
      title: 'Projects',
      url: 'guides/projects',
      guidesLinks: [
        {title: 'Creating a new project'},
        {title: 'Editing a project'},
        {title: 'Displaying a project'},
        {title: 'Deleting a project'},
        {title: 'Project permissions'},
        {title: 'Project settings'},
      ]
    },
    {
      id: 3,
      title: 'Settings',
      url: 'guides/settings',
      guidesLinks: [
        {title: 'General Settings'},
        {title: 'Project Settings'},
        {title: 'Media Settings'},
        {title: 'User Settings'},
        {title: 'Advanced Settings'},
        {title: 'Security Settings'},
        {title: 'Notification Settings'},
      ]
    },
    {
      id: 4,
      title: 'Billing',
      url: 'guides/billing',
      guidesLinks: [
        {title: 'Billing Overview'},
        {title: 'Changing your plan'},
        {title: 'Updating your payment method'},
        {title: 'Viewing your invoices'},
        {title: 'Payment history'},
        {title: 'Updating Payment Information'},
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

  viewGuide(guide: any) {
    this.guideTitle = guide.guidesLinks.title.replace(/ /g, '-').toLowerCase();
    this.router.navigate(['/guide', this.guideTitle]);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.css'
})
export class GuidesComponent {


  guides = [
    {
      id: 1,
      title: 'Getting Started',
      url: 'guides/getting-started',
      guides: [
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
      guides: [
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
      guides: [
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
      guides: [
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
      guides: [
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
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-guides',
  templateUrl: './guides.component.html',
  styleUrl: './guides.component.css'
})
export class GuidesComponent {
  guides = [
    {
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
      title: 'Account',
      url: 'guides/account',
      guides: [
        {title: 'Account Overview'},
        {title: 'Changing your email'},
        {title: 'Changing your password'},
        {title: 'Deleting your account'},
        {title: 'Account security'},
        {title: 'Account notifications'},
        {title: 'Account settings'},
      ]
    }
  ]
}

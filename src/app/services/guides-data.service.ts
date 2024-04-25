import { Injectable } from '@angular/core';

export interface Guide {
  id: number;
  title: string;
  url: string;
  guideList: { title: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class GuidesDataService {
  private guides: Guide[] = [
    {
      id: 1,
      title: 'Getting Started',
      url: 'guides/getting-started',
      guideList: [
        { title: 'What is this app?' },
        { title: 'Start using the app' },
        { title: 'Signing in to the dashboard' },
        { title: 'Navigating within the app' },
      ],
    },
    {
      id: 2,
      title: 'Projects',
      url: 'guides/projects',
      guideList: [
        { title: 'Creating a new project' },
        { title: 'Editing a project' },
        { title: 'Displaying a project' },
        { title: 'Deleting a project' },
        { title: 'Project permissions' },
        { title: 'Project settings' },
      ],
    },
    {
      id: 3,
      title: 'Settings',
      url: 'guides/settings',
      guideList: [
        { title: 'General Settings' },
        { title: 'Project Settings' },
        { title: 'Media Settings' },
        { title: 'User Settings' },
        { title: 'Advanced Settings' },
        { title: 'Security Settings' },
        { title: 'Notification Settings' },
      ],
    },
    {
      id: 4,
      title: 'Billing',
      url: 'guides/billing',
      guideList: [
        { title: 'Billing Overview' },
        { title: 'Changing your plan' },
        { title: 'Updating your payment method' },
        { title: 'Viewing your invoices' },
        { title: 'Payment history' },
        { title: 'Updating Payment Information' },
      ],
    },
    {
      id: 5,
      title: 'Account',
      url: 'guides/account',
      guideList: [
        { title: 'Account Overview' },
        { title: 'Changing your email' },
        { title: 'Changing your password' },
        { title: 'Deleting your account' },
        { title: 'Account security' },
        { title: 'Account notifications' },
        { title: 'Account settings' },
      ],
    },
  ];

  getGuides(): Guide[] {
    return this.guides;
  }

  getGuideById(id: number): Guide {
    return this.guides.find((guide) => guide.id === id) || ({} as Guide);
  }
}

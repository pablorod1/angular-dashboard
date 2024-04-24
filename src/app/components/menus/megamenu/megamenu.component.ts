import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MailsDataService } from '../../../services/mails-data.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-megamenu',
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
})
export class MegamenuComponent {
  items: MegaMenuItem[] | undefined;
  mailsCount!: number;

  constructor(private mailsDataService: MailsDataService) {}

  ngOnInit() {
    this.mailsCount = this.mailsDataService.unreadedCount;
    this.items = [
      {
        label: 'Dashboards',
        icon: 'bi bi-speedometer2',
        items: [
          [
            {
              label: 'Dashboards',
              items: [
                {
                  label: 'Overview',
                  icon: 'bi bi-clipboard-data',
                  reloadData: true,
                  routerLink: '/dashboard',
                },
                {
                  label: 'Analytics',
                  icon: 'bi bi-graph-up',
                  reloadData: true,
                  routerLink: '/analytics',
                },
                {
                  label: 'Points of Interest',
                  icon: 'bi bi-geo',
                  reloadData: true,
                  routerLink: '/poi',
                },
              ],
            },
          ],
        ],
      },
      {
        label: 'Applications',
        icon: 'bi bi-app-indicator',
        items: [
          [
            {
              label: 'App Examples',
              items: [
                {
                  label: 'Ecommerce',
                  icon: 'bi bi-cart',
                  reloadData: true,
                  routerLink: '/ecommerce',
                },
                {
                  label: 'File Manager',
                  icon: 'bi bi-folder',
                  reloadData: true,
                  routerLink: '/file-manager',
                },
                {
                  label: 'Mailbox',
                  icon: 'bi bi-envelope',
                  reloadData: true,
                  routerLink: '/mailbox',
                  badge: this.mailsCount.toString(),
                },
                { label: 'Notes', icon: 'bi bi-sticky', routerLink: '/notes', reloadData: true },
                {
                  label: 'Scrumboard',
                  icon: 'bi bi-kanban',
                  reloadData: true,
                  routerLink: '/scrumboard',
                },
                {
                  label: 'Tasks',
                  icon: 'bi bi-check2-all',
                  reloadData: true,
                  routerLink: '/tasks',
                },
              ],
            },
          ],
          [
            {
              label: 'Help Center',
              items: [
                {
                  label: 'Home',
                  icon: 'bi bi-house',
                  reloadData: true,
                  routerLink: '/help-home',
                },
                { label: 'FAQs', icon: 'bi bi-question', routerLink: '/faqs' },
                {
                  label: 'Guides',
                  icon: 'bi bi-bookmark',
                  reloadData: true,
                  routerLink: '/guides',
                },
                {
                  label: 'Support',
                  icon: 'bi bi-life-preserver',
                  reloadData: true,
                  routerLink: '/support',
                },
              ],
            },
          ],
        ],
      },

      {
        label: 'Pages',
        icon: 'bi bi-window-stack',
        items: [
          [
            {
              label: 'Example Pages',
              items: [
                {
                  label: 'About Us',
                  icon: 'bi bi-info-circle',
                  reloadData: true,
                  routerLink: '/about',
                },
                {
                  label: 'Landing Page',
                  icon: 'bi bi-rocket-takeoff',
                  reloadData: true,
                  routerLink: '/landing',
                },
                {
                  label: 'Blog Posts',
                  icon: 'bi bi-easel',
                  reloadData: true,
                  routerLink: '/blog',
                },
                {
                  label: 'Coming Soon',
                  icon: 'bi bi-clock',
                  reloadData: true,
                  routerLink: '/coming-soon',
                },

                {
                  label: 'Profile',
                  icon: 'bi bi-person-circle',
                  reloadData: true,
                  routerLink: '/profile',
                },
                {
                  label: 'Settings',
                  icon: 'bi bi-gear',
                  reloadData: true,
                  routerLink: '/acc-settings',
                },
              ],
            },
          ],
          [
            {
              label: 'Error',
              items: [
                {
                  label: 'Error 404',
                  icon: 'bi bi-exclamation-triangle',
                  reloadData: true,
                  routerLink: '/error-404',
                },
                {
                  label: 'Error 500',
                  icon: 'bi bi-exclamation-diamond',
                  reloadData: true,
                  routerLink: '/error-500',
                },
                {
                  label: 'Maintenance',
                  icon: 'bi bi-tools',
                  reloadData: true,
                  routerLink: '/maintenance',
                },
              ],
            },
          ],
          [
            {
              label: 'Pricing',
              items: [
                {
                  label: 'Classic',
                  icon: 'bi bi-cash-coin',
                  reloadData: true,
                  routerLink: 'pricing-classic',
                },
                {
                  label: 'Table',
                  icon: 'bi bi-table',
                  reloadData: true,
                  routerLink: '/pricing-table',
                },
              ],
            },
            {
              label: 'Invoice',
              items: [
                {
                  label: 'Single',
                  icon: 'bi bi-file-earmark-text',
                  reloadData: true,
                  routerLink: '/invoice-classic/1',
                },
                {
                  label: 'Table',
                  icon: 'bi bi-card-list',
                  reloadData: true,
                  routerLink: '/invoice-table',
                },
              ],
            },
          ],
        ],
      },
      {
        label: 'Authentication',
        icon: 'bi bi-shield-lock',
        items: [
          [
            {
              label: 'Sign In',
              items: [
                { label: 'Classic', routerLink: '/signin-classic' },
                { label: 'Modern', routerLink: '/signin-modern' },
                { label: 'Full Screen', routerLink: '/signin-fullscreen' },
              ],
            },
            {
              label: 'Sign Up',
              items: [
                { label: 'Classic', routerLink: '/signup-classic' },
                { label: 'Modern', routerLink: '/signup-modern' },
                { label: 'Full Screen', routerLink: '/signup-fullscreen' },
              ],
            },
            {
              label: 'Sign Out',
              items: [
                { label: 'Classic', routerLink: '/signout-classic' },
                { label: 'Modern', routerLink: '/signout-modern' },
                { label: 'Full Screen', routerLink: '/signout-fullscreen' },
              ],
            },
          ],
          [
            {
              label: 'Forgot Password',
              items: [
                { label: 'Classic', routerLink: '/forgot-classic' },
                { label: 'Modern', routerLink: '/forgot-modern' },
                { label: 'Full Screen', routerLink: '/forgot-fullscreen' },
              ],
            },
            {
              label: 'Reset Password',
              items: [
                { label: 'Classic', routerLink: '/reset-classic' },
                { label: 'Modern', routerLink: '/reset-modern' },
                { label: 'Full Screen', routerLink: '/reset-fullscreen' },
              ],
            },
          ],
          [
            {
              label: 'Unlock Session',
              items: [
                { label: 'Classic', routerLink: '/unlock-classic' },
                { label: 'Modern', routerLink: '/unlock-modern' },
                { label: 'Full Screen', routerLink: '/unlock-fullscreen' },
              ],
            },
            {
              label: 'Confirmation Email',
              items: [
                { label: 'Classic', routerLink: '/confirmation-classic' },
                { label: 'Modern', routerLink: '/confirmation-modern' },
                {
                  label: 'Full Screen',
                  reloadData: true,
                  routerLink: '/confirmation-fullscreen',
                },
              ],
            },
          ],
        ],
      },
    ];
  }
}

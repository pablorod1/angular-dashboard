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
                  command: () => { location.reload(); },
                },
                {
                  label: 'Analytics',
                  icon: 'bi bi-graph-up',
                  reloadData: true,
                  routerLink: '/analytics',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Points of Interest',
                  icon: 'bi bi-geo',
                  reloadData: true,
                  routerLink: '/poi',
                  command: () => { location.reload(); },
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
                  label: 'File Manager',
                  icon: 'bi bi-folder',
                  reloadData: true,
                  routerLink: '/file-manager',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Mailbox',
                  icon: 'bi bi-envelope',
                  reloadData: true,
                  routerLink: '/mailbox',
                  command: () => { location.reload(); },
                  badge: this.mailsCount.toString(),
                },
                { label: 'Notes', icon: 'bi bi-sticky', routerLink: '/notes', command: () => { location.reload(); }, },

                {
                  label: 'Scrumboard',
                  icon: 'bi bi-kanban',
                  reloadData: true,
                  routerLink: '/scrumboard-home',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Tasks',
                  icon: 'bi bi-check2-all',
                  reloadData: true,
                  routerLink: '/tasks',
                  command: () => { location.reload(); },
                },
              ],
            },
            {
              label: 'Ecommerce',
              items: [
                {

                    label: 'Store',
                    icon: 'bi bi-bag',
                    reloadData: true,
                    routerLink: '/ecommerce',
                    command: () => { location.reload(); },

                },
                {
                  label: 'Inventory',
                  icon: 'bi bi-box-seam',
                  reloadData: true,
                  routerLink: '/inventory',
                  command: () => {location.reload();},
                }
              ]
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
                  command: () => { location.reload(); },
                },
                { label: 'FAQs', icon: 'bi bi-question', routerLink: '/faqs', command: () => { location.reload(); }, },

                {
                  label: 'Guides',
                  icon: 'bi bi-bookmark',
                  reloadData: true,
                  routerLink: '/guides',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Support',
                  icon: 'bi bi-life-preserver',
                  reloadData: true,
                  routerLink: '/support',
                  command: () => { location.reload(); },
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
                  command: () => { location.reload(); },
                },
                {
                  label: 'Landing Page',
                  icon: 'bi bi-rocket-takeoff',
                  reloadData: true,
                  routerLink: '/landing',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Blog Posts',
                  icon: 'bi bi-easel',
                  reloadData: true,
                  routerLink: '/blog',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Coming Soon',
                  icon: 'bi bi-clock',
                  reloadData: true,
                  routerLink: '/coming-soon',
                  command: () => { location.reload(); },
                },

                {
                  label: 'Profile',
                  icon: 'bi bi-person-circle',
                  reloadData: true,
                  routerLink: '/profile',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Settings',
                  icon: 'bi bi-gear',
                  reloadData: true,
                  routerLink: '/acc-settings',
                  command: () => { location.reload(); },
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
                  command: () => { location.reload(); },
                },
                {
                  label: 'Error 500',
                  icon: 'bi bi-exclamation-diamond',
                  reloadData: true,
                  routerLink: '/error-500',
                  command: () => { location.reload(); },
                },
                {
                  label: 'Maintenance',
                  icon: 'bi bi-tools',
                  reloadData: true,
                  routerLink: '/maintenance',
                  command: () => { location.reload(); },
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
                  command: () => { location.reload(); },
                },
                {
                  label: 'Table',
                  icon: 'bi bi-table',
                  reloadData: true,
                  routerLink: '/pricing-table',
                  command: () => { location.reload(); },
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
                  command: () => { location.reload(); },
                },
                {
                  label: 'Table',
                  icon: 'bi bi-card-list',
                  reloadData: true,
                  routerLink: '/invoice-table',
                  command: () => { location.reload(); },
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
                { label: 'Classic', routerLink: '/signin-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/signin-modern', command: () => { location.reload(); }, },
                { label: 'Full Screen', routerLink: '/signin-fullscreen', command: () => { location.reload(); }, },

              ],
            },
            {
              label: 'Sign Up',
              items: [
                { label: 'Classic', routerLink: '/signup-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/signup-modern', command: () => { location.reload(); }, },
                { label: 'Full Screen', routerLink: '/signup-fullscreen', command: () => { location.reload(); }, },
              ],
            },
            {
              label: 'Sign Out',
              items: [
                { label: 'Classic', routerLink: '/signout-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/signout-modern', command: () => { location.reload(); }, },
                { label: 'Full Screen', routerLink: '/signout-fullscreen', command: () => { location.reload(); }, },
              ],
            },
          ],
          [
            {
              label: 'Forgot Password',
              items: [
                { label: 'Classic', routerLink: '/forgot-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/forgot-modern', command: () => { location.reload(); }, },
                { label: 'Full Screen', routerLink: '/forgot-fullscreen', command: () => { location.reload(); }, },
              ],
            },
            {
              label: 'Reset Password',
              items: [
                { label: 'Classic', routerLink: '/reset-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/reset-modern', command: () => { location.reload(); }, },
                { label: 'Full Screen', routerLink: '/reset-fullscreen', command: () => { location.reload(); }, },
              ],
            },
          ],
          [
            {
              label: 'Unlock Session',
              items: [
                { label: 'Classic', routerLink: '/unlock-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/unlock-modern', command: () => { location.reload(); }, },
                { label: 'Full Screen', routerLink: '/unlock-fullscreen', command: () => { location.reload(); }, },
              ],
            },
            {
              label: 'Confirmation Email',
              items: [
                { label: 'Classic', routerLink: '/confirmation-classic', command: () => { location.reload(); }, },
                { label: 'Modern', routerLink: '/confirmation-modern', command: () => { location.reload(); }, },
                {
                  label: 'Full Screen',
                  reloadData: true,
                  routerLink: '/confirmation-fullscreen',
                  command: () => { location.reload(); },
                },
              ],
            },
          ],
        ],
      },
    ];
  }
}

import { Component } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { MailsDataService } from '../../services/mails-data.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-megamenu',
  templateUrl: './megamenu.component.html',
  styleUrl: './megamenu.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ]
})
export class MegamenuComponent {
  items: MegaMenuItem[] | undefined;
  mailsCount!: number;

  constructor( private mailsDataService: MailsDataService){}

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
                { label: 'Overview', icon: 'bi bi-clipboard-data', routerLink: '/dashboard' },
                { label: 'Analytics', icon: 'bi bi-graph-up', routerLink: '/analytics' },
                { label: 'Points of Interest', icon: 'bi bi-geo', routerLink: '/poi' },
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
                { label: 'Courses', icon: 'bi bi-book', routerLink: '/courses' },
                { label: 'Chat', icon: 'bi bi-chat', routerLink: '/chat' },
                { label: 'Contacts', icon: 'bi bi-people', routerLink: '/contacts' },
                { label: 'Ecommerce', icon: 'bi bi-cart', routerLink: '/ecommerce' },
                { label: 'File Manager', icon: 'bi bi-folder', routerLink: '/file-manager' },
                { label: 'Mailbox', icon: 'bi bi-envelope', routerLink: '/mailbox', badge: this.mailsCount.toString() },
                { label: 'Notes', icon: 'bi bi-sticky', routerLink: '/notes' },
                { label: 'Scrumboard', icon: 'bi bi-kanban', routerLink: '/scrumboard' },
                { label: 'Tasks', icon: 'bi bi-check2-all', routerLink: '/tasks' },
              ],
            },
          ],
          [
            {
              label: 'Help Center',
              items: [
                { label: 'Home', icon: 'bi bi-house', routerLink: '/help-home' },
                { label: 'FAQs', icon: 'bi bi-question', routerLink: '/faqs' },
                { label: 'Guides', icon: 'bi bi-bookmark', routerLink: '/guides' },
                { label: 'Support', icon: 'bi bi-life-preserver', routerLink: '/support' },
              ],
            }
          ]
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
                { label: 'Activities', icon: 'bi bi-calendar', routerLink: '/activities' },
                { label: 'Coming Soon', icon: 'bi bi-clock', routerLink: '/coming-soon' },
                { label: 'Maintenance', icon: 'bi bi-tools', routerLink: '/maintenance' },
                { label: 'Profile', icon: 'bi bi-person-circle', routerLink: '/profile' },
                { label: 'Settings', icon: 'bi bi-gear', routerLink: '/acc-settings' },
              ],
            },
          ],
          [
            {
              label: 'Error',
              items: [
                { label: 'Error 404', icon: 'bi bi-exclamation-triangle', routerLink: '/error-404'},
                { label: 'Error 500', icon: 'bi bi-exclamation-diamond', routerLink: '/error-500' },
              ],
            }
          ],
          [
            {
              label: 'Pricing',
              items: [
                { label: 'Classic', icon: 'bi bi-cash-coin', routerLink: 'pricing-classic' },
                { label: 'Table', icon: 'bi bi-table', routerLink: '/pricing-table' },
              ],
            },
            {
              label: 'Invoice',
              items: [
                { label: 'Classic', icon: 'bi bi-file-earmark-text', routerLink: '/invoice-classic' },
                { label: 'Table', icon: 'bi bi-table', routerLink: '/invoice-table' },
              ],
            }
          ]
        ],
      },
      {
        label: 'Authentication',
        icon: 'bi bi-shield-lock',
        items: [
          [
            {
              label: 'Sign In',
              items: [{ label: 'Classic', routerLink: '/signin-classic' }, { label: 'Modern', routerLink:'/signin-modern' }, {label: 'Full Screen', routerLink:'/signin-fullscreen'}],
            },
            {
              label: 'Sign Up',
              items: [{ label: 'Classic', routerLink: '/signup-classic' }, { label: 'Modern', routerLink: '/signup-modern' }, {label: 'Full Screen', routerLink: '/signup-fullscreen'}],
            },
            {
              label: 'Sign Out',
              items: [{ label: 'Classic', routerLink: '/signout-classic' }, { label: 'Modern', routerLink: '/signout-modern' }, {label: 'Full Screen', routerLink: '/signout-fullscreen'}],
            },
          ],
          [
            {
              label: 'Forgot Password',
              items: [{ label: 'Classic', routerLink:'/forgot-classic' }, { label: 'Modern', routerLink: '/forgot-modern' }, {label: 'Full Screen', routerLink: '/forgot-fullscreen'}],
            },
            {
              label: 'Reset Password',
              items: [{ label: 'Classic', routerLink: '/reset-classic' }, { label: 'Modern', routerLink: '/reset-modern' }, {label: 'Full Screen', routerLink: '/reset-fullscreen'}],
            },
          ],
          [
            {
              label: 'Unlock Session',
              items: [{ label: 'Classic', routerLink:'/unlock-classic' }, { label: 'Modern', routerLink: '/unlock-modern' }, {label: 'Full Screen', routerLink: '/unlock-fullscreen'}],
            },
            {
              label: 'Confirmation Email',
              items: [{ label: 'Classic', routerLink:'/confirmation-classic' }, { label: 'Modern', routerLink:'/confirmation-modern' }, {label: 'Full Screen', routerLink: '/confirmation-fullscreen'}],
            }
          ]
        ],
      },
    ];
  }
}

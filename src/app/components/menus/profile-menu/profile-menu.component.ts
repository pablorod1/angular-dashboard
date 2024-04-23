import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.css',
})
export class ProfileMenuComponent implements OnInit {
  items!: MenuItem[];
  userStatus: string = 'online';

  ngOnInit() {
    this.items = [
      {
        label: 'Signed in as',
        description: 'javiermartinez@lucentialab.es',
      },
      {
        separator: true,
      },
      {
        label: 'Profile',
        icon: 'bi-person-circle',
        link: '/profile'
      },
      {
        label: 'Settings',
        icon: 'bi-gear',
        link: '/acc-settings'
      },
      {
        label: 'Status',
        icon: 'bi-three-dots',
        items: [
          {
            label: 'Online',
            badge: ' ',
            severity: 'success',
            status: 'online',
            command: () => { this.changeStatus.call(this, 'online'); }
          },
          {
            label: 'Away',
            badge: ' ',
            severity: 'warning',
            command: () => { this.changeStatus.call(this, 'away'); }
          },
          {
            label: 'Busy',
            badge: ' ',
            severity: 'danger',
            command: () => { this.changeStatus.call(this, 'busy'); }
          },
          {
            label: 'Invisible',
            badge: ' ',
            severity: 'secondary',
            status: 'invisible',
            command: () => { this.changeStatus.call(this, 'invisible'); }
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: 'Log out',
        icon: 'bi-box-arrow-right',
      },
    ];
  }
  changeStatus(newStatus: string) {
    this.userStatus = newStatus;
    console.log('New status: ', this.userStatus);
  }
}

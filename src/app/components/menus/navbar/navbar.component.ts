import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  animations: [
    trigger('navbarAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100px)' }),
        animate('1s ease-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ]),
  ]
})
export class NavbarComponent {
  sidebarVisible :boolean = false;
}

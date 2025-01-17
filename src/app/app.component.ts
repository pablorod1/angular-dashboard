import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Angular Template';

  constructor(
    private primengConfig: PrimeNGConfig,
    private permissionsService: NgxPermissionsService
  ) {}

  ngOnInit() {
    //Localstorage perms
    // const role = localStorage.getItem('role') || '';
    // Load Perms CLIENT SELLER

    this.permissionsService.loadPermissions(['CLIENT', 'SELLER']);

    this.primengConfig.ripple = true; //optional animation
    this.primengConfig.zIndex = {
      modal: 100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };
  }
}

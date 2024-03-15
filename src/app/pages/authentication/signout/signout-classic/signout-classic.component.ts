import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-classic',
  templateUrl: './signout-classic.component.html',
  styleUrl: './signout-classic.component.css',
})
export class SignoutClassicComponent implements OnInit {
  countdown: number = 5;

  constructor(private router: Router) {}

  ngOnInit() {
    const interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        clearInterval(interval);
        this.router.navigate(['/signin-classic']);
      }
    }, 1000);
  }
}

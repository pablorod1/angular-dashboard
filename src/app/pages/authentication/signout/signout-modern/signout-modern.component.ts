import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-modern',
  templateUrl: './signout-modern.component.html',
  styleUrl: './signout-modern.component.css'
})
export class SignoutModernComponent {
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

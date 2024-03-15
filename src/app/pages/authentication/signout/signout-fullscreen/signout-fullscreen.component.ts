import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-fullscreen',
  templateUrl: './signout-fullscreen.component.html',
  styleUrl: './signout-fullscreen.component.css'
})
export class SignoutFullscreenComponent {
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

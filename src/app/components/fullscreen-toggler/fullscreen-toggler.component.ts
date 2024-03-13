import { Component } from '@angular/core';

@Component({
  selector: 'app-fullscreen-toggler',
  templateUrl: './fullscreen-toggler.component.html',
  styleUrl: './fullscreen-toggler.component.css'
})
export class FullscreenTogglerComponent {
  fullscreen: boolean = false;
  toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      this.fullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        this.fullscreen = false;
      }
    }
  }
}

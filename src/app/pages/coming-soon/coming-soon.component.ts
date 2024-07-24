import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrl: './coming-soon.component.css'
})
export class ComingSoonComponent implements OnInit {
  @ViewChild('card') card!: ElementRef;
  countdown!: string;
  days!: number;
  hours!: number;
  minutes!: number;
  seconds!: number;
  showDialog = false;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown(){
    const countDownDate = new Date('Jul 30, 2024 12:31:20').getTime();

    if (this.days === 0 && this.hours === 0 && this.minutes === 0 && this.seconds === 0) {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
      this.seconds = 0;
      this.countdown = 'The time is up!';
    } else {
      setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
  
        // Calculo de tiempo
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        this.countdown = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        this.days = days;
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;
  
  
      }, 1000);
    }
  }
  toggleDialog(){
    this.showDialog = !this.showDialog;
  }
}

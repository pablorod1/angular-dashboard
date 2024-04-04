import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrl: './acc-settings.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AccSettingsComponent {
  showSettings = false;
  showPayments = true;
  showNotifications = false;
  googleConnected = true;
  githubConnected = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  toggleSettings() {
    this.showSettings = true;
    this.showNotifications = false;
    this.showPayments = false;
  }
  togglePayments() {
    this.showSettings = false;
    this.showNotifications = false;
    this.showPayments = true;
  }
  toggleNotifications() {
    this.showSettings = false;
    this.showNotifications = true;
    this.showPayments = false;
  }
  toggleGoogleConnected() {
    this.googleConnected = !this.googleConnected;
    if(!this.googleConnected){
      this.messageService.add({
        severity: 'warn',
        icon: 'bi bi-exclamation-circle',
        summary: 'Google Account Unlinked',
        detail: 'Press the button to link it again.',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'success',
        icon: 'bi bi-check',
        summary: 'Google Account Linked',
        detail: 'You have successfully linked your Google account.',
        life: 3000,
      });

    }
  }
  toggleGithubConnected() {
    this.githubConnected = !this.githubConnected;
    if(!this.githubConnected){
      this.messageService.add({
        severity: 'warn',
        icon: 'bi bi-exclamation-circle',
        summary: 'GitHub Account Unlinked',
        detail: 'Press the button to link it again.',
        life: 3000,
      });
    } else {
      this.messageService.add({
        severity: 'success',
        icon: 'bi bi-check',
        summary: 'GitHub Account Linked',
        detail: 'You have successfully linked your GitHub account.',
        life: 3000,
      });

    }
  }
}

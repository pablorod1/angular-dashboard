import { Component, OnInit, ViewChild } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import { MailsDataService } from '../../../services/mails-data.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  sidebarVisible: boolean = false;
  unreadedMails!: number;

  isHelpCenterVisible = false;
  isAuthVisible = false;
  isSignInVisible = false;
  isSignUpVisible = false;
  isSignOutVisible = false;
  isForgotVisible = false;
  isResetVisible = false;
  isUnlockVisible = false;
  isConfirmationVisible = false;
  isComingVisible = false;
  isErrorVisible = false;
  isPricingVisible = false;
  isInvoiceVisible = false;

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  constructor( private mailsDataService: MailsDataService){}

  ngOnInit(): void {
    this.unreadedMails = this.mailsDataService.getUnreadMailsCount();
  }


  toggleHelpCenter() {
    this.isHelpCenterVisible = !this.isHelpCenterVisible;
  }
  toggleAuth() {
    this.isAuthVisible = !this.isAuthVisible;
  }
  toggleSignIn($event: Event) {
    $event.stopPropagation();
    this.isSignInVisible = !this.isSignInVisible;
  }
  toggleSignUp($event: Event) {
    $event.stopPropagation();
    this.isSignUpVisible = !this.isSignUpVisible;
  }
  toggleSignOut($event: Event) {
    $event.stopPropagation();
    this.isSignOutVisible = !this.isSignOutVisible;
  }
  toggleForgot($event: Event) {
    $event.stopPropagation();
    this.isForgotVisible = !this.isForgotVisible;
  }
  toggleReset($event: Event) {
    $event.stopPropagation();
    this.isResetVisible = !this.isResetVisible;
  }
  toggleUnlock($event: Event) {
    $event.stopPropagation();
    this.isUnlockVisible = !this.isUnlockVisible;
  }
  toggleConfirmation($event: Event) {
    $event.stopPropagation();
    this.isConfirmationVisible = !this.isConfirmationVisible;
  }
  toggleComing($event: Event) {
    $event.stopPropagation();
    this.isComingVisible = !this.isComingVisible;
  }
  toggleError($event: Event) {
    $event.stopPropagation();
    this.isErrorVisible = !this.isErrorVisible;
  }
  togglePricing($event: Event) {
    $event.stopPropagation();
    this.isPricingVisible = !this.isPricingVisible;
  }
  toggleInvoice($event: Event) {
    $event.stopPropagation();
    this.isInvoiceVisible = !this.isInvoiceVisible;
  }
}

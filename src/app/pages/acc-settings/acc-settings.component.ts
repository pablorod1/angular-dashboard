import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PaymentMethodsService} from '../../services/payment-methods.service';
import { PaymentMethod } from '../../services/payment-methods.service';

@Component({
  selector: 'app-acc-settings',
  templateUrl: './acc-settings.component.html',
  styleUrl: './acc-settings.component.css',
  providers: [MessageService, ConfirmationService],
})
export class AccSettingsComponent implements OnInit {
  googleConnected = true;
  githubConnected = false;
  showNewDialog = false;
  showEditDialog = false;
  notifications = false;
  editingPaymentMethod!: PaymentMethod;
  paymentMethods: PaymentMethod[] = [];
  newPaymentMethod: PaymentMethod = {
    id: this.paymentMethods.length + 1,
    accountName: '',
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    balance: 0,
    icon: '',
  };
  value: any;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private paymentMethodsService: PaymentMethodsService
  ) {}

  ngOnInit(): void {
    this.paymentMethods = this.paymentMethodsService.getAllPaymentMethods();
    this.editingPaymentMethod = {
      id: 0,
      accountName: '',
      bankName: '',
      accountNumber: '',
      routingNumber: '',
      balance: 0,
      icon: '',
    };
  }

  toggleGoogleConnected() {
    this.googleConnected = !this.googleConnected;
    if (!this.googleConnected) {
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
    if (!this.githubConnected) {
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
  hideAccountNumber(accountNumber: string): string {
    const parts = accountNumber.split(' ');
    if (parts.length === 4) {
      parts[1] = '****';
      parts[2] = '****';
    }
    return parts.join(' ');
  }
  deletePaymentMethod(event: Event, id: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this payment method?',
      header: 'Delete Payment Method',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paymentMethodsService.deletePaymentMethod(id);
        this.paymentMethods = this.paymentMethodsService.getAllPaymentMethods();
        this.messageService.add({
          severity: 'success',
          icon: 'bi bi-check',
          summary: 'Payment Method Deleted',
          detail: 'The payment method has been successfully deleted.',
          life: 3000,
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          icon: 'bi bi-info-circle',
          summary: 'Operation Cancelled',
          detail: 'You have cancelled the operation.',
          life: 3000,
        });
      }
    });
  }
  cancelAddPaymentMethod(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this new payment method?',
      header: 'Cancel New Payment Method',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showNewDialog = false;
        this.messageService.add({
          severity: 'info',
          icon: 'bi bi-info-circle',
          summary: 'Operation Cancelled',
          detail: 'You have cancelled the operation.',
          life: 3000,
        });
      },
    });
  }
  confirmAddPaymentMethod(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to add this new payment method?',
      header: 'Add New Payment Method',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paymentMethodsService.addPaymentMethod(this.newPaymentMethod);
        this.showNewDialog = false;
        this.messageService.add({
          severity: 'success',
          icon: 'bi bi-check',
          summary: 'Payment Method Added',
          detail: 'The payment method has been successfully added.',
          life: 3000,
        });
      },
      reject: () => {}
    });
  }
  editPaymentMethod(paymentMethod: PaymentMethod) {
    this.editingPaymentMethod = { ...paymentMethod };
    this.showEditDialog = true;
  }
  confirmEditPaymentMethod(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to update this payment method?',
      header: 'Update Payment Method',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paymentMethodsService.updatePaymentMethod(this.editingPaymentMethod);
        this.showEditDialog = false;
        this.messageService.add({
          severity: 'success',
          icon: 'bi bi-check',
          summary: 'Payment Method Updated',
          detail: 'The payment method has been successfully updated.',
          life: 3000,
        });
      },
      reject: () => {}
    });
  }
  cancelEditPaymentMethod(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this edit?',
      header: 'Cancel Edit',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.showEditDialog = false;
        this.messageService.add({
          severity: 'info',
          icon: 'bi bi-info-circle',
          summary: 'Operation Cancelled',
          detail: 'You have cancelled the operation.',
          life: 3000,
        });
      },
    });
  }
}

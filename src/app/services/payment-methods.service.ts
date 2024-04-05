import { Injectable } from '@angular/core';

export interface PaymentMethod {
  id: number;
  accountName: string;
  bankName: string;
  accountNumber: string;
  routingNumber: string;
  balance: number;
  icon: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodsService {
  private paymentMethods: PaymentMethod[] = [
    {
      id: 1,
      accountName: 'Javier Martínez',
      bankName: 'BBVA Bank',
      accountNumber: '1234 5678 9012 3456',
      routingNumber: '123456789',
      balance: 123456.78,
      icon: 'fa-brands fa-cc-visa visa',
    },
    {
      id: 2,
      accountName: 'Javier Martínez',
      bankName: 'Santanter Bank',
      accountNumber: '0987 6543 2109 8765',
      routingNumber: '987654321',
      balance: 987654.32,
      icon: 'fa-brands fa-cc-mastercard',
    },
  ];

  constructor() { }

  getAllPaymentMethods(): PaymentMethod[] {
    return this.paymentMethods;
  }

  deletePaymentMethod(id: number): void {
    const index = this.paymentMethods.findIndex(method => method.id === id);
    if (index !== -1) {
      this.paymentMethods.splice(index, 1);
    }
  }
  addPaymentMethod(paymentMethod: PaymentMethod): void {
    const maxId = Math.max(...this.paymentMethods.map(method => method.id));
    paymentMethod.id = maxId + 1;
    this.paymentMethods.push(paymentMethod);
  }
  updatePaymentMethod(paymentMethod: PaymentMethod): void {
    const index = this.paymentMethods.findIndex(method => method.id === paymentMethod.id);
    if (index !== -1) {
      this.paymentMethods[index] = paymentMethod;
    }
  }
}

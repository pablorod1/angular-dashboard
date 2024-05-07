import { Injectable } from '@angular/core';

export interface Product {
  name: string;
  price: number;
  quantity: number;
}

export interface Invoice {
  id: number;
  invoice: string;
  billFrom: {
    name: string;
    email: string;
    address: string;
  };
  billTo: {
    name: string;
    email: string;
    imageUrl: string;
    address: string;
  };
  products: Product[];
  totalAmount: number;
  status: string;
  dueDate: string;
  issuedDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class InvoicesTableDataService {

  private invoices: Invoice[] = [
      {
        id: 1,
        invoice: '#INV-001001',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'John Doe', email: 'johndoe@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture2.webp', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 1000 + 2000 * 2 + 500 * 5,
        status: 'Paid',
        issuedDate: 'Jan 6, 2021',
        dueDate: 'Jan 12, 2021'
      },
      {
        id: 2,
        invoice: '#INV-001002',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Jessica Stones', email: 'jessicastones@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture3.webp', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 1000,
        status: 'Unpaid',
        issuedDate: 'Jan 6, 2021',
        dueDate: 'Jan 11, 2021',
      },
      {
        id: 3,
        invoice: '#INV-001003',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Pedro López', email: 'pedrolopez@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture4.webp', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        products: [
          {name: 'Product 1', price: 1500, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 1500,
        status: 'Expired',
        issuedDate: 'Jan 6, 2021',
        dueDate: 'Jan 11, 2021',
      },
      {
        id: 4,
        invoice: '#INV-001004',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Juan Pérez', email: 'juanperez@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture7.webp', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 2000,
        status: 'Paid',
        issuedDate: 'Jan 5, 2021',
        dueDate: 'Jan 8, 2021',
      },
      {
        id: 5,
        invoice: '#INV-001005',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'María Elena', email: 'mariaelena@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture5.webp', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 3000,
        status: 'Paid',
        issuedDate: 'Jan 4, 2021',
        dueDate: 'Jan 7, 2021',
      },
      {
        id: 6,
        invoice: '#INV-001006',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Carlos Rodríguez', email: 'carlosrodriguez@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture6.webp', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 500,
        status: 'Unpaid',
        issuedDate: 'Jan 3, 2021',
        dueDate: 'Jan 6, 2021',
      },
    ]

  getInvoices(): Invoice[]{
    return this.invoices;
  }

  addInvoice(invoice: Invoice): void {
    const maxId = Math.max(...this.invoices.map(invoice => invoice.id));
    invoice.id = maxId + 1;
    this.invoices.push(invoice);
  }
  deleteInvoice(id: number): void {
    const index = this.invoices.findIndex(invoice => invoice.id === id);
    if (index !== -1) {
      this.invoices.splice(index, 1);
    }
  }
  updateInvoice(invoiceToUpdate: Invoice): void {
    const index = this.invoices.findIndex(invoice => invoice.id === invoiceToUpdate.id);
    if (index !== -1) {
      this.invoices[index] = invoiceToUpdate;
    }
  }

  getInvoiceId(id: number): Invoice {
    return this.invoices.find(invoice => invoice.id === id) as Invoice;
  }
}

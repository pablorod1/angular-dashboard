import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoicesTableDataService {
  selectedInvoice: any;

  getInvoicesData() {
    return [
      {
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
        dueDate: 'Jan 6, 2021',
        issuedDate: 'Jan 11, 2021'
      },
      {
        invoice: '#INV-001003',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Pedro López', email: 'pedrolopez@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture4.webp'},
        products: [
          {name: 'Product 1', price: 1500, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 1500,
        status: 'Expired',
        dueDate: 'Jan 6, 2021',
        issuedDate: 'Jan 11, 2021'
      },
      {
        invoice: '#INV-001004',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Juan Pérez', email: 'juanperez@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture7.webp'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 2000,
        status: 'Paid',
        dueDate: 'Jan 5, 2021',
        issuedDate: 'Jan 8, 2021'
      },
      {
        invoice: '#INV-001005',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'María Elena', email: 'mariaelena@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture5.webp'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 3000,
        status: 'Paid',
        dueDate: 'Jan 4, 2021',
        issuedDate: 'Jan 7, 2021'
      },
      {
        invoice: '#INV-001006',
        billFrom: {name: 'Javier Martínez', email: 'javiermartinez@lucentialab.es', address: 'Calle de la Princesa, 1, 28008 Madrid'},
        billTo: {name: 'Carlos Rodríguez', email: 'carlosrodriguez@lucentialab.es', imageUrl: '/assets/profile-pictures/profile-picture6.webp'},
        products: [
          {name: 'Product 1', price: 1000, quantity: 1},
          {name: 'Product 2', price: 2000, quantity: 2},
          {name: 'Product 3', price: 500, quantity: 5},
        ],
        totalAmount: 500,
        status: 'Unpaid',
        dueDate: 'Jan 3, 2021',
        issuedDate: 'Jan 6, 2021'
      },


    ]
  }

  getInvoices(){
    return Promise.resolve(this.getInvoicesData());
  }
}

import { Component, OnInit } from '@angular/core';
import { InvoicesTableDataService } from '../../../services/invoices-table-data.service';
import { Invoice } from '../../../services/invoices-table-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrl: './invoices-table.component.css',
  providers: [ConfirmationService, MessageService],
})
export class InvoicesTableComponent implements OnInit {
  cols!: Column[];
  invoices: Invoice[] = [];
  statusOptions!: string[];
  createInvoiceDialog = false;
  editingInvoice!: Invoice;
  editingInvoiceDialog = false;
  newInvoice: Invoice = {
    id: this.invoices.length + 1,
    invoice: '',
    billFrom: {
      name: '',
      email: '',
      address: '',
    },
    billTo: {
      name: '',
      email: '',
      address: '',
      imageUrl: '',
    },
    products: [
      {
        name: '',
        price: 0,
        quantity: 0,
      },
    ],
    totalAmount: 0,
    status: '',
    dueDate: '',
    issuedDate: '',
  };

  constructor(
    private invoicesTableDataService: InvoicesTableDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    // this.invoicesTableDataService.getInvoices().then((data) => {
    //   this.invoices = data;
    // });
    this.statusOptions = ['Paid', 'Unpaid', 'Expired'];
    this.invoices = this.invoicesTableDataService.getInvoices();
    this.editingInvoice = {
      id: 0,
      invoice: '',
      billFrom: {
        name: '',
        email: '',
        address: '',
      },
      billTo: {
        name: '',
        email: '',
        address: '',
        imageUrl: '',
      },
      products: [],
      totalAmount: 0,
      status: '',
      dueDate: '',
      issuedDate: '',
    };

    this.cols = [
      { field: 'invoice', header: 'Invoice' },
      { field: 'customer', header: 'Customer' },
      { field: 'amount', header: 'Amount' },
      { field: 'status', header: 'Status' },
      { field: 'date', header: 'Date' },
    ];
  }
  getSeverity(status: string) {
    switch (status) {
      case 'Paid':
        return 'success';
      case 'Unpaid':
        return 'danger';
      case 'Expired':
        return 'warning';
      default:
        return 'primary';
    }
  }
  viewInvoice(invoice: Invoice) {
    this.router.navigate(['/invoice-classic', invoice.id]);
  }
  toggleCreateInvoice() {
    this.createInvoiceDialog = true;
  }

  cancelCreateInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this new invoice?',
      header: 'Cancel New Invoice',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.createInvoiceDialog = false;
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

  confirmCreateInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to add this new invoice?',
      header: 'Add New Invoice',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invoicesTableDataService.addInvoice(this.newInvoice);
        this.createInvoiceDialog = false;
        this.messageService.add({
          severity: 'success',
          icon: 'bi bi-check',
          summary: 'Invoice Added',
          detail: 'The invoice has been successfully added.',
          life: 3000,
        });
      },
      reject: () => {},
    });
  }

  deleteInvoice(event: Event, id: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this invoice?',
      header: 'Delete Invoice',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invoicesTableDataService.deleteInvoice(id);
        this.invoices = this.invoicesTableDataService.getInvoices();
        this.messageService.add({
          severity: 'success',
          icon: 'bi bi-check',
          summary: 'Invoice Deleted',
          detail: 'The invoice has been successfully deleted.',
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
      },
    });
  }

  editInvoice(invoice: Invoice) {
    this.editingInvoice = { ...invoice };
    this.editingInvoiceDialog = true;
  }

  confirmEditInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to update this invoice?',
      header: 'Update Invoice',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.invoicesTableDataService.updateInvoice(this.editingInvoice);
        this.editingInvoiceDialog = false;
        this.messageService.add({
          severity: 'success',
          icon: 'bi bi-check',
          summary: 'Invoice Updated',
          detail: 'The invoice has been successfully updated.',
          life: 3000,
        });
      },
      reject: () => {},
    });
  }
  cancelEditInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this edit?',
      header: 'Cancel Edit',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.editingInvoiceDialog = false;
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

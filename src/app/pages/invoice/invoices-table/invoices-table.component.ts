import { Component, OnInit } from '@angular/core';
import { InvoicesTableDataService } from '../../../services/invoices-table-data.service';
import { Invoice } from '../invoice';
import { data } from '../../../components/realtime-chart/series-data';
import { ConfirmationService, MessageService } from 'primeng/api';

interface Column {
  field: string;
  header: string;
}

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrl: './invoices-table.component.css',
})
export class InvoicesTableComponent implements OnInit {
  cols!: Column[];
  invoices!: any[];
  createInvoiceDialog = false;

  constructor(private invoicesTableDataService: InvoicesTableDataService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  ngOnInit() {
    // this.invoicesTableDataService.getInvoices().then((data) => {
    //   this.invoices = data;
    // });

    this.invoices = this.invoicesTableDataService.getInvoicesData();


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
  toggleCreateInvoice(){
    this.createInvoiceDialog = true;
  }

  cancelCreateInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this new payment method?',
      header: 'Cancel New Payment Method',
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
}

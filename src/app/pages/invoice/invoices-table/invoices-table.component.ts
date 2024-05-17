import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoicesTableDataService } from '../../../services/invoices-table-data.service';
import { Invoice } from '../../../services/invoices-table-data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import * as FileSaver from 'file-saver';

interface Column {
  field: string;
  header: string;
}
interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-invoices-table',
  templateUrl: './invoices-table.component.html',
  styleUrl: './invoices-table.component.css',
  providers: [ConfirmationService, MessageService],
})
export class InvoicesTableComponent implements OnInit {
  cols!: Column[];
  exportColumns!: ExportColumn[];
  @ViewChild('invoicesTable') invoicesTable!: Table;
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
    // Status Options
    this.statusOptions = ['Paid', 'Unpaid', 'Expired'];

    // Get Invoices
    this.invoices = this.invoicesTableDataService.getInvoices();

    // Initialize Editing Invoice
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

    // Header Columns
    this.cols = [
      { field: 'invoice', header: 'Invoice' },
      { field: 'customer', header: 'Customer' },
      { field: 'amount', header: 'Amount' },
      { field: 'status', header: 'Status' },
      { field: 'date', header: 'Date' },
    ];
  }

  // Tags Severity
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

  // Redirect to Invoice Details
  viewInvoice(invoice: any) {
    this.router.navigate(['/invoice-classic', invoice.id]);
  }

  // Toggle Create Invoice
  toggleCreateInvoice() {
    this.createInvoiceDialog = true;
    // Get the last invoice number
    const lastInvoiceNumber = this.invoices[this.invoices.length - 1].invoice;

    // Extract the numeric part from the invoice number
    const numberPart = parseInt(lastInvoiceNumber.replace('#INV-', ''), 10);

    // Increment the numeric part
    const newNumberPart = numberPart + 1;

    // Create the new invoice number
    const newInvoiceNumber =
      '#INV-' + newNumberPart.toString().padStart(6, '0');

    // Create the new invoice
    this.newInvoice.invoice = newInvoiceNumber;
  }

  // Cancel Create Invoice
  cancelCreateInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this new invoice?',
      header: 'Cancel New Invoice',
      icon: 'bi bi-exclamation-triangle',
      accept: () => {
        this.createInvoiceDialog = false;
        this.newInvoice = {
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

  // Confirm Create Invoice
  confirmCreateInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to add this new invoice?',
      header: 'Add New Invoice',
      icon: 'bi bi-exclamation-triangle',
      accept: () => {
        this.invoicesTableDataService.addInvoice(this.newInvoice);
        this.createInvoiceDialog = false;
        this.newInvoice = {
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

  // Delete Invoice
  deleteInvoice(event: Event, id: number): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this invoice?',
      header: 'Delete Invoice',
      icon: 'bi bi-exclamation-triangle',
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

  // Edit Invoice
  editInvoice(invoice: Invoice) {
    this.editingInvoice = { ...invoice };
    this.editingInvoiceDialog = true;
  }

  // Confirm Edit Invoice
  confirmEditInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to update this invoice?',
      header: 'Update Invoice',
      icon: 'bi bi-exclamation-triangle',
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

  // Cancel Edit Invoice
  cancelEditInvoice(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to cancel this edit?',
      header: 'Cancel Edit',
      icon: 'bi bi-exclamation-triangle',
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

  // Add Product to New Invoice
  addProductNewInvoice() {
    this.newInvoice.products.push({ name: '', price: 0, quantity: 0 });
  }

  // Add Product to Editing Invoice
  addProductEditingInvoice() {
    this.editingInvoice.products.push({ name: '', price: 0, quantity: 0 });
  }

  // Export Table PDF
  exportPdf() {
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        (doc as any).autoTable(this.exportColumns, this.invoices);
        doc.save('invoices.pdf');
      });
    });
  }

  // Export Table Excel
  exportExcel() {
    import('xlsx').then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(this.invoices);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'invoices');
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(data, fileName + '_export' + EXCEL_EXTENSION);
  }
}

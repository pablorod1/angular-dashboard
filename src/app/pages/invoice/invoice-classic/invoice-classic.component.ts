import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InvoicesTableDataService } from '../../../services/invoices-table-data.service';
import { Invoice } from '../../../services/invoices-table-data.service';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
} from '@angular/animations';
@Component({
  selector: 'app-invoice-classic',
  templateUrl: './invoice-classic.component.html',
  styleUrl: './invoice-classic.component.css',
  animations: [
    trigger('detailsAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50px)' }),
        animate('300ms ease-in-out', style({ opacity: 1, transform: 'none' })),
      ]),
    ])
  ]
})
export class InvoiceClassicComponent implements OnInit {
  invoices!: Invoice[];
  showDetails = false;
  invoice!: Invoice;
  invoiceId!: number;

  constructor(private invoicesTableDataService: InvoicesTableDataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.invoices = this.invoicesTableDataService.getInvoices();
    this.route.params.subscribe(params => {
      this.invoiceId = +params['id'];
      this.invoice = this.invoices.find(invoice => invoice.id === this.invoiceId) || {} as Invoice;
    });
  }

  // toggleDetails(){
  //   this.showDetails = !this.showDetails;
  // }
}

import { Component, Input, OnInit } from '@angular/core';
import { InvoicesTableDataService } from '../../../services/invoices-table-data.service';
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
  invoices!: any[];
  showDetails = false;

  constructor(private invoicesTableDataService: InvoicesTableDataService) {}

  ngOnInit() {
    this.invoices = this.invoicesTableDataService.getInvoicesData();
  }

  toggleDetails(){
    this.showDetails = !this.showDetails;
  }
}

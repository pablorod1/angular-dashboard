import { Component } from '@angular/core';
import { MailsDataService } from '../../services/mails-data.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css',
})
export class MailboxComponent {
  tagsVisible: boolean = false;

  // applyGlobalFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.productTable.filterGlobal(filterValue, 'contains');
  // }

  constructor (private mailsDataService: MailsDataService) {}

  tags!: any[];

  selectedTags!: any[];

  ngOnInit() {

    this.tags = [ 'Primary', 'Social', 'Promotions', 'Forums', 'Spam']; ;
  }
}

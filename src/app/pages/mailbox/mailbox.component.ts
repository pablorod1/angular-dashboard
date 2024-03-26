import { Component, OnInit } from '@angular/core';
import { MailsDataService } from '../../services/mails-data.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css',
  providers: [ConfirmationService, MessageService]
})
export class MailboxComponent implements OnInit {
  // applyGlobalFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.productTable.filterGlobal(filterValue, 'contains');
  // }

  constructor(private mailsDataService: MailsDataService, private confirmationService: ConfirmationService, private messageService: MessageService) {}

  confirmDelete(event: Event) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Are you sure that you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon:"none",
        rejectIcon:"none",
        rejectButtonStyleClass:"p-button-text",
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Mail Deleted', detail: 'Check Trash Inbox' });
            this.markAsTrash();
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  }

  tags!: any[];
  mails!: any[];
  spamMails!: any[];
  trashMails!: any[];
  selectedMail!: any;
  unreadedCount!: number;
  showInbox = true;
  showSpam = false;
  showTrash = false;
  showStarred = false;
  showImportant = false;
  showSocial = false;
  showPersonal = false;
  showPromotions = false;
  showForums = false;
  activeNavItem!: string;
  newLabelName: string = '';

  ngOnInit() {
    this.mails = this.mailsDataService.getMailsData();
    this.mails.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    this.unreadedCount = this.mails.filter(mail => !mail.readed).length;
    this.spamMails = this.mailsDataService.getSpamMailsData();
    this.spamMails.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    this.trashMails = this.mailsDataService.getTrashMailsData();
    this.trashMails.sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime());
    this.tags = [
      { name: 'Social', checked: false },
      { name: 'Personal', checked: false },
      { name: 'Promotions', checked: false },
      { name: 'Forums', checked: false },
    ];

    this.selectedMail = this.mails[0];
    this.tags.forEach(tag => {
      tag.checked = this.selectedMail.tags.includes(tag.name);
    });
  }

  markAsRead(): void {
    if (this.selectedMail) {
      this.selectedMail.readed = this.selectedMail.readed = true;
      this.unreadedCount = this.mails.filter(mail => !mail.readed).length;
    }
  }

  markAsUnread(): void {
    if (this.selectedMail) {
      this.selectedMail.readed = this.selectedMail.readed = false;
      this.unreadedCount = this.mails.filter(mail => !mail.readed).length;
    }
  }

  markAllAsRead(): void {
    this.mails.forEach((mail) => (mail.readed = true));
    this.unreadedCount = this.mails.filter(mail => !mail.readed).length;

  }
  selectMail(mail: any) {
    this.selectedMail = mail;
    this.tags.forEach(tag => {
      tag.checked = this.selectedMail.tags.includes(tag.name);
    });

  }

  // Inbox Mails
  toggleShowInbox() {
    this.showInbox = true;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.mails[0];
  }

  // Spam Mails
  toggleShowSpam() {
    this.showSpam = true;
    this.showTrash = false;
    this.showInbox = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.spamMails[0];
  }

  markAsSpam(): void {
    if (this.selectedMail) {
      this.selectedMail.spam = !this.selectedMail.spam;
      if (this.selectedMail.spam) {
        // If the mail is marked as spam, add it to the spamMails array and remove it from the mails array
        this.spamMails.push(this.selectedMail);
        const index = this.mails.indexOf(this.selectedMail);
        if (index > -1) {
          this.mails.splice(index, 1);
        }
      } else {
        // If the mail is unmarked as spam, add it back to the mails array and remove it from the spamMails array
        this.mails.push(this.selectedMail);
        const index = this.spamMails.indexOf(this.selectedMail);
        if (index > -1) {
          this.spamMails.splice(index, 1);
        }
      }
      this.selectedMail = this.mails[0];
    }
  }

  // Trash Mails
  toggleShowTrash() {
    this.showTrash = true;
    this.showInbox = false;
    this.showSpam = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.trashMails[0];
  }
  markAsTrash(): void {
    if (this.selectedMail) {
      this.selectedMail.trash = !this.selectedMail.trash;
      if (this.selectedMail.trash) {
        // If the mail is marked as spam, add it to the spamMails array and remove it from the mails array
        this.trashMails.push(this.selectedMail);
        const index = this.mails.indexOf(this.selectedMail);
        if (index > -1) {
          this.mails.splice(index, 1);
        }
      } else {
        // If the mail is unmarked as spam, add it back to the mails array and remove it from the spamMails array
        this.mails.push(this.selectedMail);
        const index = this.trashMails.indexOf(this.selectedMail);
        if (index > -1) {
          this.trashMails.splice(index, 1);
        }
      }
      this.selectedMail = this.mails[0];
    }
  }

  // Starred Mails
  get starredMails() {
    return this.mails.filter((mail) => mail.starred);
  }
  toggleShowStarred() {
    this.showStarred = true;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.mails[0];
  }
  markAsStarred(): void {
    if (this.selectedMail) {
      this.selectedMail.starred = !this.selectedMail.starred;
    }
  }

  // Important Mails
  get importantMails() {
    return this.mails.filter((mail) => mail.important);
  }
  toggleShowImportant() {
    this.showImportant = true;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.mails[0];
  }
  markAsImportant(): void {
    if (this.selectedMail) {
      this.selectedMail.important = !this.selectedMail.important;
    }
  }

  // Social Mails
  get socialMails() {
    return this.mails.filter((mail) => mail.tags.includes('Social'));
  }
  toggleShowSocial() {
    this.showSocial = true;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.mails[0];
  }

  // Personal Mails
  get personalMails() {
    return this.mails.filter((mail) => mail.tags.includes('Personal'));
  }
  toggleShowPersonal() {
    this.showPersonal = true;
    this.showSpam = false;
    this.showStarred = false;
    this.showInbox = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showForums = false;
    this.showPromotions = false;
    this.selectedMail = this.mails[0];
  }

  // Promotions Mails
  get promotionsMails() {
    return this.mails.filter((mail) => mail.tags.includes('Promotions'));
  }
  toggleShowPromotions() {
    this.showPromotions = true;
    this.showStarred = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.selectedMail = this.mails[0];
  }

  // Forums Mails
  get forumsMails() {
    return this.mails.filter((mail) => mail.tags.includes('Forums'));
  }
  toggleShowForums() {
    this.showForums = true;
    this.showStarred = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showPromotions = false;
    this.selectedMail = this.mails[0];
  }


  // Update Mail Tags with Checkbox
  updateMailTags(tag: any) {
    if (!tag.checked) {
      // If the checkbox is unchecked and the tag is not already in the selectedMail's tags, add it
      if (!this.selectedMail.tags.includes(tag.name)) {
        this.selectedMail.tags.push(tag.name);
      }
    } else {
      // If the checkbox is checked and the tag is in the selectedMail's tags, remove it
      const index = this.selectedMail.tags.indexOf(tag.name);
      if (index > -1) {
        this.selectedMail.tags.splice(index, 1);
      }
    }
  }
}

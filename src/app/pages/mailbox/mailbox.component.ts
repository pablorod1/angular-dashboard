import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MailsDataService } from '../../services/mails-data.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
  FilterService,
} from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrl: './mailbox.component.css',
  providers: [ConfirmationService, MessageService, FilterService],
})
export class MailboxComponent implements OnInit {
  sidebarVisible: boolean = false;
  submitted = false;
  composeForm!: FormGroup;
  tags!: any[];

  mails!: any[];
  spamMails!: any[];
  trashMails!: any[];
  sentMails!: any[];
  draftMails!: any[];

  selectedMail!: any;
  unreadedCount!: number;

  showInbox = true;
  showSent = false;
  showDraft = false;
  showSpam = false;
  showTrash = false;
  showStarred = false;
  showImportant = false;
  showSocial = false;
  showPersonal = false;
  showPromotions = false;
  showForums = false;
  showCompose = false;

  activeNavItem!: string;
  newLabelName: string = '';

  constructor(
    private mailsDataService: MailsDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private filterService: FilterService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {}
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  ngOnInit() {
    this.mails = this.mailsDataService.getMailsData();
    this.mails.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );
    this.unreadedCount = this.mails.filter((mail) => !mail.readed).length;

    this.sentMails = this.mailsDataService.getSentMailsData();
    this.sentMails.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    this.draftMails = this.mailsDataService.getDraftMailsData();
    this.draftMails.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    this.spamMails = this.mailsDataService.getSpamMailsData();
    this.spamMails.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    this.trashMails = this.mailsDataService.getTrashMailsData();
    this.trashMails.sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
    );

    this.tags = [
      { name: 'Social', checked: false },
      { name: 'Personal', checked: false },
      { name: 'Promotions', checked: false },
      { name: 'Forums', checked: false },
    ];

    this.selectedMail = this.mails[0];
    this.tags.forEach((tag) => {
      tag.checked = this.selectedMail.tags.includes(tag.name);
    });

    // Compose Form
    this.composeForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]],
      message: [''],
    });
  }

  markAsRead(): void {
    if (this.selectedMail) {
      this.selectedMail.readed = this.selectedMail.readed = true;
      this.unreadedCount = this.mails.filter((mail) => !mail.readed).length;
    }
  }

  markAsUnread(): void {
    if (this.selectedMail) {
      this.selectedMail.readed = this.selectedMail.readed = false;
      this.unreadedCount = this.mails.filter((mail) => !mail.readed).length;
    }
  }

  markAllAsRead(): void {
    this.mails.forEach((mail) => (mail.readed = true));
    this.unreadedCount = this.mails.filter((mail) => !mail.readed).length;
  }
  selectMail(mail: any) {
    this.selectedMail = mail;
    this.tags.forEach((tag) => {
      tag.checked = this.selectedMail.tags.includes(tag.name);
    });
  }

  // Inbox Mails
  toggleShowInbox() {
    this.showInbox = true;
    this.showDraft = false;
    this.showSent = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.mails[0];
  }

  toggleShowSent() {
    this.showSent = true;
    this.showDraft = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.mails[0];
  }

  toggleShowDraft(){
    this.showDraft = true;
    this.showInbox = false;
    this.showSent = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.draftMails[0];
  }

  confirmDraft(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to save this message as draft?',
      header: 'Confirmation',
      icon: 'bi bi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        if (this.composeForm.valid || this.composeForm.invalid) {
          const newMail = {
            sender: 'Me',
            email: this.composeForm.value.email,
            title: this.composeForm.value.title,
            message: this.composeForm.value.message,
            timestamp: new Date(),
          };
          this.draftMails.push(newMail);
          this.showCompose = !this.showCompose;
          this.messageService.add({
            severity: 'warn',
            icon: 'bi bi-archive',
            summary: 'Draft Saved',
            detail: 'Check Draft Inbox',
            life: 3000,
          });
          this.toggleShowDraft();
        }
      },
      reject: () => {},
    });
  }

  confirmSend(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to send this message?',
      header: 'Confirmation',
      icon: 'bi bi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        if (this.composeForm.valid) {
          const newMail = {
            sender: 'Me',
            email: this.composeForm.value.email,
            title: this.composeForm.value.title,
            message: this.composeForm.value.message,
            timestamp: new Date(),
          };
          this.sentMails.push(newMail);
          this.showCompose = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Mail Sent',
            detail: 'Receiver: ' + this.composeForm.value.email,
            life: 3000,
          });
          this.toggleShowSent();
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Please fill all the required fields',
            life: 2000,
          });
        }
      },
      reject: () => {},
    });
  }

  // Spam Mails
  toggleShowSpam() {
    this.showSpam = true;
    this.showDraft = false;
    this.showSent = false;
    this.showTrash = false;
    this.showInbox = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
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
    this.showDraft = false;
    this.showSent = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
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
  confirmDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'bi bi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Mail Deleted',
          detail: 'Check Trash Inbox',
        });
        this.markAsTrash();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  // Starred Mails
  get starredMails() {
    return this.mails.filter((mail) => mail.starred);
  }
  toggleShowStarred() {
    this.showStarred = true;
    this.showDraft = false;
    this.showSent = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.starredMails[0];
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
    this.showDraft = false;
    this.showSent = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.importantMails[0];
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
    this.showDraft = false;
    this.showInbox = false;
    this.showSent = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showStarred = false;
    this.showImportant = false;
    this.showPersonal = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.socialMails[0];
  }

  // Personal Mails
  get personalMails() {
    return this.mails.filter((mail) => mail.tags.includes('Personal'));
  }
  toggleShowPersonal() {
    this.showPersonal = true;
    this.showDraft = false;
    this.showSpam = false;
    this.showSent = false;
    this.showStarred = false;
    this.showInbox = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showForums = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.personalMails[0];
  }

  // Promotions Mails
  get promotionsMails() {
    return this.mails.filter((mail) => mail.tags.includes('Promotions'));
  }
  toggleShowPromotions() {
    this.showPromotions = true;
    this.showDraft = false;
    this.showSent = false;
    this.showStarred = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showForums = false;
    this.sidebarVisible = false;
    this.selectedMail = this.promotionsMails[0];
  }

  // Forums Mails
  get forumsMails() {
    return this.mails.filter((mail) => mail.tags.includes('Forums'));
  }
  toggleShowForums() {
    this.showForums = true;
    this.showDraft = false;
    this.showSent = false;
    this.showStarred = false;
    this.showInbox = false;
    this.showSpam = false;
    this.showTrash = false;
    this.showImportant = false;
    this.showSocial = false;
    this.showPersonal = false;
    this.showPromotions = false;
    this.sidebarVisible = false;
    this.selectedMail = this.forumsMails[0];
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

  // Control Selected Mail
  selectNextMail() {
    let currentMailList;
    let currentState = '';

    if (this.showSpam) {
      currentState = 'spam';
      currentMailList = this.spamMails;
    } else if (this.showTrash) {
      currentState = 'trash';
      currentMailList = this.trashMails;
    } else if (this.showStarred) {
      currentState = 'starred';
      currentMailList = this.starredMails;
    } else if (this.showImportant) {
      currentState = 'important';
      currentMailList = this.importantMails;
    } else if (this.showSocial) {
      currentState = 'social';
      currentMailList = this.socialMails;
    } else if (this.showPersonal) {
      currentState = 'personal';
      currentMailList = this.personalMails;
    } else if (this.showPromotions) {
      currentState = 'promotions';
      currentMailList = this.promotionsMails;
    } else if (this.showForums) {
      currentState = 'forums';
      currentMailList = this.forumsMails;
    } else {
      currentState = 'default';
      currentMailList = this.mails;
    }

    const index = currentMailList.indexOf(this.selectedMail);

    switch (currentState) {
      case 'spam':
      case 'trash':
      case 'starred':
      case 'important':
      case 'social':
      case 'personal':
      case 'promotions':
      case 'forums':
      case 'default':
        if (index < currentMailList.length - 1) {
          this.selectedMail = currentMailList[index + 1];
        }
        break;
    }
  }
  selectPreviousMail() {
    let currentMailList;
    let currentState = '';

    if (this.showSpam) {
      currentState = 'spam';
      currentMailList = this.spamMails;
    } else if (this.showTrash) {
      currentState = 'trash';
      currentMailList = this.trashMails;
    } else if (this.showStarred) {
      currentState = 'starred';
      currentMailList = this.starredMails;
    } else if (this.showImportant) {
      currentState = 'important';
      currentMailList = this.importantMails;
    } else if (this.showSocial) {
      currentState = 'social';
      currentMailList = this.socialMails;
    } else if (this.showPersonal) {
      currentState = 'personal';
      currentMailList = this.personalMails;
    } else if (this.showPromotions) {
      currentState = 'promotions';
      currentMailList = this.promotionsMails;
    } else if (this.showForums) {
      currentState = 'forums';
      currentMailList = this.forumsMails;
    } else {
      currentState = 'default';
      currentMailList = this.mails;
    }

    const index = currentMailList.indexOf(this.selectedMail);

    switch (currentState) {
      case 'spam':
      case 'trash':
      case 'starred':
      case 'important':
      case 'social':
      case 'personal':
      case 'promotions':
      case 'forums':
      case 'default':
        if (index > 0) {
          this.selectedMail = currentMailList[index - 1];
        }
        break;
    }
  }

  //Print Mail
  printMail() {
    const printWindow = window.open('', '_blank');
    const emailElement = document.querySelector('.msg-content');
    const emailElement2 = document.querySelector('.user-info');
    const emailContent = emailElement ? emailElement.innerHTML : '';
    const emailContent2 = emailElement2 ? emailElement2.innerHTML : '';

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print email</title>
            <style>
              /* Add any additional styles for printing here */
            </style>
          </head>
          <body onload="window.print();window.close()">
            ${emailContent2}
            ${emailContent}
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  }

  toggleShowCompose() {
    this.showCompose = true;
  }

  // Toggle Sidebar
  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }
}

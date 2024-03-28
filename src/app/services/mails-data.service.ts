import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MailsDataService {
  mails: any[] = this.getMailsData();
  unreadedCount: number = 3;
  getMailsData() {
    return [
      {
        sender: 'Pedro López',
        email: 'pedrolopez@lucentialab.es',
        title: 'Meeting with the team at 7pm for the project review',
        message:
          'We should meet at 7pm for the project review and discuss the next steps lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum',
        timestamp: 'Tue 13, 12:50 PM',
        img: '../../../assets/profile-picture4.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        receiver2: 'Natalia Sánchez',
        receiverEmail2: 'nataliasanchez@lucentialab.es',
        receiver3: 'Maria Elena',
        receiverEmail3: 'mariaelena@lucentialab.es',
        readed: false,
        starred: true,
        important: true,
        tags: ['Social', 'Personal'],
        spam: false,
      },
      {
        sender: 'Jessica Stones',
        email: 'jessicastones@lucentialab.es',
        title: 'Report',
        message: 'I finished the report, please check it out',
        timestamp: 'Tue 13, 11:30 AM',
        img: '../../../assets/profile-picture3.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: false,
        starred: false,
        important: false,
        tags: ['Promotions'],
        spam: false,
      },
      {
        sender: 'John Doe',
        email: 'johndoe@lucentialab.es',
        title: 'Party',
        message:
          'Dude, I heard you are going to the party tonight, is that true?',
        timestamp: 'Tue 13, 10:00 AM',
        img: '../../../assets/profile-picture2.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        receiver2: 'Maria Elena',
        receiverEmail2: 'mariaelena@lucentialab.es',
        readed: false,
        starred: true,
        important: false,
        tags: ['Forums'],
        spam: false,
      },
      {
        sender: 'Maria Elena',
        email: 'mariaelena@lucentialab.es',
        title: 'Project',
        message: 'I need your help with the project',
        timestamp: 'Tue 12, 10:00 AM',
        img: '../../../assets/profile-picture5.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: true,
        important: false,
        starred: false,
        tags: ['Personal'],
        spam: false,
      },
      {
        sender: 'Natalia Sánchez',
        email: 'nataliasanchez@lucentialab.es',
        title: 'Meeting',
        message: "Don't forget to bring the documents for the meeting",
        timestamp: 'Mon 12, 9:00 AM',
        img: '../../../assets/profile-picture9.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: true,
        starred: true,
        important: false,
        tags: ['Social'],
        spam: false,
      },
      {
        sender: 'Natalia Sánchez',
        email: 'nataliasanchez@lucentialab.es',
        title: 'Meeting',
        message: "Don't forget to bring the documents for the meeting",
        timestamp: 'Mon 12, 9:00 AM',
        img: '../../../assets/profile-picture9.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: true,
        starred: false,
        important: false,
        tags: ['Personal'],
        spam: false,
      },
      {
        sender: 'Natalia Sánchez',
        email: 'nataliasanchez@lucentialab.es',
        title: 'Meeting',
        message: "Don't forget to bring the documents for the meeting",
        timestamp: 'Mon 12, 9:00 AM',
        img: '../../../assets/profile-picture9.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: true,
        important: false,
        starred: false,
        tags: ['Promotions'],
        spam: false,
      },
      {
        sender: 'Natalia Sánchez',
        email: 'nataliasanchez@lucentialab.es',
        title: 'Meeting',
        message: "Don't forget to bring the documents for the meeting",
        timestamp: 'Sun 11, 9:00 AM',
        img: '../../../assets/profile-picture9.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: true,
        starred: false,
        important: false,
        tags: ['Forums'],
        spam: false,
      },
    ];
  }
  getSentMailsData() {
    return [
      {
        sender: 'me',
        email: 'javiermartinez@lucentialab.es',
        title: 'Meeting with the team at 7pm for the project review',
        message:
          'We should meet at 7pm for the project review and discuss the next steps',
        timestamp: 'Tue 13, 12:50 PM',
        img: '../../../assets/profile-picture.webp',
        receiver: 'Pedro López',
        receiverEmail: 'pedrolopez@lucentialab.es',
      },
    ];
  }

  getDraftMailsData(){
    return [
      {
        sender: 'me',
        email: 'drafts@mail.com',
        timestamp: 'Tue 13, 12:50 PM',
        message: 'This is a draft',
        title: 'Draft',
      }
    ]
  }

  getSpamMailsData() {
    return [
      {
        sender: 'Pedro López',
        email: 'pedrolopez@lucentialab.es',
        title: 'Meeting',
        message: 'We should meet at 7pm',
        timestamp: 'Mar 13, 12:50 PM',
        img: '../../../assets/profile-picture4.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        receiver2: 'Natalia Sánchez',
        receiverEmail2: 'nataliasanchez@lucentialab.es',
        receiver3: 'Maria Elena',
        receiverEmail3: 'mariaelena@lucentialab.es',
        readed: false,
        starred: true,
        important: true,
        tags: ['Social', 'Personal'],
        spam: true,
      },
      {
        sender: 'Jessica Stones',
        email: 'jessicastones@lucentialab.es',
        title: 'Report',
        message: 'I finished the report, please check it out',
        timestamp: 'Mar 13, 11:30 AM',
        img: '../../../assets/profile-picture3.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        readed: false,
        starred: false,
        important: false,
        tags: ['Promotions'],
        spam: true,
      },
      {
        sender: 'John Doe',
        email: 'johndoe@lucentialab.es',
        title: 'Party',
        message:
          'Dude, I heard you are going to the party tonight, is that true?',
        timestamp: 'Mar 13, 10:00 AM',
        img: '../../../assets/profile-picture2.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        receiver2: 'Maria Elena',
        receiverEmail2: 'mariaelena@lucentialab.es',
        readed: false,
        starred: true,
        important: false,
        tags: ['Forums'],
        spam: true,
      },
    ];
  }
  getTrashMailsData() {
    return [
      {
        sender: 'Pedro López',
        email: 'pedrolopez@lucentialab.es',
        title: 'Meeting',
        message: 'We should meet at 7pm',
        timestamp: 'Mar 13, 12:50 PM',
        img: '../../../assets/profile-picture4.webp',
        receiver: 'me',
        receiverEmail: 'javiermartine@lucentialab.es',
        receiver2: 'Natalia Sánchez',
        receiverEmail2: 'nataliasanchez@lucentialab.es',
        receiver3: 'Maria Elena',
        receiverEmail3: 'mariaelena@lucentialab.es',
        readed: false,
        starred: true,
        important: true,
        tags: ['Social', 'Personal'],
        spam: false,
        trash: true,
      },
    ];
  }
  getUnreadMailsCount() {
    return this.mails.filter((mail) => !mail.readed).length;
  }
  markAsRead(mail: any) {
    mail.readed = true;
    this.unreadedCount = this.getUnreadMailsCount();
  }
  markAsUnread(mail: any) {
    mail.readed = false;
    this.unreadedCount = this.getUnreadMailsCount();
  }
  markAllAsReaded() {
    this.mails.forEach((mail) => (mail.readed = true));
    this.unreadedCount = this.getUnreadMailsCount();
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-message-menu',
  templateUrl: './message-menu.component.html',
  styleUrl: './message-menu.component.css'
})
export class MessageMenuComponent {
  readedCount: number = 3;
  // Declare Notifications
  notifications = [
    {
      sender: 'Pedro López',
      message: 'We should meet at 7pm',
      timestamp: 'Mar 13, 12:50 PM',
      img: '../../../assets/profile-picture4.webp',
      readed: false,
    },
    {
      sender: 'Jessica Stones',
      message: 'I finished the report, please check it out',
      timestamp: 'Mar 13, 11:30 AM',
      img: '../../../assets/profile-picture3.webp',
      readed: false,
    },
    {
      sender: 'John Doe',
      message: 'Dude, I heard you are going to the party tonight, is that true?',
      timestamp: 'Mar 13, 10:00 AM',
      img: '../../../assets/profile-picture2.webp',
      readed: false,
    },
    {
      sender: 'Jane Doe',
      message: 'I need your help with the project',
      timestamp: 'Mon 12, 10:00 AM',
      img: '../../../assets/profile-picture5.webp',
      readed: true,
    },
    {
      sender: 'Maria Elena',
      message: "Don't forget to bring the documents for the meeting",
      timestamp: 'Mon 12, 9:00 AM',
      img: '../../../assets/profile-picture6.webp',
      readed: true,
    }
  ];

  removeNotification(notification: any) {
    const index = this.notifications.indexOf(notification);
    if (index >= -1) {
      this.notifications.splice(index, 1);
    }
    this.readedCount = this.getUnreadNotificationsCount();
  }

  getUnreadNotificationsCount() {
    return this.notifications.filter((notification) => !notification.readed).length;
  }
  markAsRead(notification: any) {
    notification.readed = true;
    this.readedCount = this.getUnreadNotificationsCount();
  }
  markAsUnread(notification: any) {
    notification.readed = false;
    this.readedCount = this.getUnreadNotificationsCount();
  }
  markAllAsReaded() {
    this.notifications.forEach((notification) => (notification.readed = true));
    this.readedCount = this.getUnreadNotificationsCount();
  }
}

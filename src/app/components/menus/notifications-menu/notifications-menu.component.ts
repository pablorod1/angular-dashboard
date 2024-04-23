import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrl: './notifications-menu.component.css',
})
export class NotificationsMenuComponent {
  readedCount: number = 3;
  // Declare Notifications
  notifications = [
    {
      sender: 'Pedro López',
      message: 'accepted your friend request',
      timestamp: 'Mar 13, 12:50 PM',
      img: '../../../assets/profile-pictures/profile-picture2.webp',
      readed: false,
    },
    {
      title: 'Mailbox',
      message: 'You have 92 unread messages',
      timestamp: 'Mar 13, 10:40 AM',
      icon: 'bi bi-envelope-fill',
      readed: true,
    },
    {
      sender: 'Jessica Stones',
      message: 'sent you a message',
      timestamp: 'Mar 13, 11:30 AM',
      img: '../../../assets/profile-pictures/profile-picture3.webp',
      readed: false,
    },
    {
      title: 'Daily Challenges',
      message: 'Your project has been approved!',
      timestamp: 'Mar 13, 10:00 AM',
      icon: 'bi bi-star-fill',
      readed: false,
    },
    {
      title: 'Cron Jobs',
      message: 'Your server is down!',
      timestamp: 'Mar 13, 9:50 AM',
      icon: 'bi bi-exclamation-triangle-fill',
      readed: true,
    },
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

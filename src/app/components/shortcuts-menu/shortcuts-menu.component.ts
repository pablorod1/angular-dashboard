import { Component } from '@angular/core';

@Component({
  selector: 'app-shortcuts-menu',
  templateUrl: './shortcuts-menu.component.html',
  styleUrl: './shortcuts-menu.component.css'
})
export class ShortcutsMenuComponent {
  editMode = false;
  shortcuts = [
    {
      title: 'Mailbox',
      description: '5 new e-mails',
      icon: 'bi-envelope',
      url: '/mailbox'
    },
    {
      title: 'Tasks',
      description: '7 pending tasks',
      icon: 'bi-journal-check',
      url: ''
    },
    {
      title: 'Settings',
      icon: 'bi-gear',
      url: ''
    },
    {
      title: 'Contacts',
      description: 'List of all contacts',
      icon: 'bi-people',
      url: ''
    },
    {
      title: 'Log Out',
      icon: 'bi-box-arrow-right',
      url: ''
    }
  ]
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  deleteShortcut(index: number) {
    this.shortcuts.splice(index, 1);
  }
}

import { Component } from '@angular/core';
export interface Shortcut {
  id: number;
  title: string;
  description?: string;
  icon: string;
  url: string;
}

@Component({
  selector: 'app-shortcuts-menu',
  templateUrl: './shortcuts-menu.component.html',
  styleUrl: './shortcuts-menu.component.css'
})
export class ShortcutsMenuComponent {
  editMode = false;
  editingShortcutToggle = false;
  addingShortcutToggle = false;
  editingShortcut: Shortcut = {} as Shortcut;
  newShortcut: Shortcut = {} as Shortcut;
  shortcuts = [
    {
      id: 1,
      title: 'Mailbox',
      description: '5 new e-mails',
      icon: 'bi-envelope',
      url: '/mailbox'
    },
    {
      id: 2,
      title: 'Tasks',
      description: '7 pending tasks',
      icon: 'bi-journal-check',
      url: ''
    },
    {
      id: 3,
      title: 'Settings',
      icon: 'bi-gear',
      url: ''
    },
    {
      id: 4,
      title: 'Contacts',
      description: 'List of all contacts',
      icon: 'bi-people',
      url: ''
    },
    {
      id: 5,
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
  editShortcut(index: number) {
    this.editingShortcutToggle = true;
    this.editingShortcut = {...this.shortcuts[index]};
  }
  saveShortcut() {
    const index = this.shortcuts.findIndex(shortcut => shortcut.id === this.editingShortcut.id);
    this.shortcuts[index] = this.editingShortcut;
    this.editingShortcutToggle = false;
  }
  addShortcut(){
    this.shortcuts.push(this.newShortcut);
    this.newShortcut = {} as Shortcut;
    this.addingShortcutToggle = false;
  }
  toggleAddingShortcut() {
    this.addingShortcutToggle = !this.addingShortcutToggle;
  }
}

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
      title: 'Help Center',
      description: 'FAQs, Guides, etc.',
      icon: 'bi-question-circle',
      url: '/help-home'
    },
    {
      id: 3,
      title: 'Landing Page',
      icon: 'bi-rocket-takeoff',
      url: '/landing'
    },
    {
      id: 4,
      title: 'Profile',
      icon: 'bi-person-circle',
      url: '/profile'
    },
    {
      id: 5,
      title: 'Settings',
      icon: 'bi-gear',
      url: '/acc-settings'
    },
    {
      id: 6,
      title: 'Log Out',
      icon: 'bi-box-arrow-right',
      url: '/signout-fullscreen'
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

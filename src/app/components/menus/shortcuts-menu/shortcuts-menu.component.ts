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
      title: 'File Manager',
      description: 'Manage your files',
      icon: 'bi-folder2-open',
      url: '/file-manager'
    },
    {
      id: 3,
      title: 'Notes',
      description: 'Create and manage notes',
      icon: 'bi-sticky',
      url: '/notes'
    },
    {
      id: 4,
      title: 'Scrumboard',
      description: 'Check your pending tasks',
      icon: 'bi-kanban',
      url: '/scrumboard-home'
    },
    {
      id: 5,
      title: 'Settings',
      description: 'Update your account settings',
      icon: 'bi-gear',
      url: '/acc-settings'
    },
    {
      id: 6,
      title: 'Log Out',
      icon: 'bi-box-arrow-right',
      url: '/signout-fullscreen'
    }
  ];
  icons = [
    'bi-alarm',
    'bi-basket',
    'bi-bell',
    'bi-book',
    'bi-briefcase',
    'bi-building',
    'bi-calendar',
    'bi-camera',
    'bi-chat',
    'bi-check-circle',
    'bi-cloud',
    'bi-code-slash',
    'bi-collection',
    'bi-compass',
    'bi-cpu',
    'bi-cup',
    'bi-diagram-3',
    'bi-envelope',
    'bi-flag',
    'bi-folder',
    'bi-gear',
    'bi-globe',
    'bi-graph-up',
    'bi-heart',
    'bi-house',
    'bi-image',
    'bi-inbox',
    'bi-key',
    'bi-laptop',
    'bi-lightbulb',
    'bi-list-task',
    'bi-lock',
    'bi-map',
    'bi-music-note',
    'bi-palette',
    'bi-pencil',
    'bi-phone',
    'bi-pin',
    'bi-printer',
    'bi-receipt',
    'bi-save',
    'bi-scissors',
    'bi-search',
    'bi-shield',
    'bi-shop',
    'bi-star',
    'bi-stickies',
    'bi-sun',
    'bi-table',
    'bi-tags',
    'bi-terminal',
    'bi-tools',
    'bi-trash',
    'bi-trophy',
    'bi-truck',
    'bi-upload',
    'bi-wallet',
    'bi-watch',
    'bi-wifi',
    'bi-wrench'
  ];
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

import { Injectable } from '@angular/core';

export interface FileManagerItem {
  id: number;
  name: string;
  type: string;
  ext: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileManagerDataService {
  private items: FileManagerItem[] = [
    { id: 1, name: 'Documents', type: 'folder', ext: ''},
    { id: 2, name: 'Drafts', type: 'folder', ext: ''},
    { id: 3, name: '120340.psd', type: 'file', ext: 'psd'},
    { id: 4, name: '120350.html', type: 'file', ext: 'html'},
    { id: 5, name: '120360.pdf', type: 'file', ext: 'pdf'},
    { id: 6, name: '120370.css', type: 'file', ext: 'css'},
    { id: 7, name: '120380.html', type: 'file', ext: 'html'},
    { id: 8, name: '120390.js', type: 'file', ext: 'js'},
    { id: 9, name: '120400.ai', type: 'file', ext: 'ai'}
  ];

  getItems() {
    return this.items;
  }

  getFolders() {
    return this.items.filter((item) => item.type === 'folder');
  }

  getFiles() {
    return this.items.filter((item) => item.type === 'file');
  }

  getPSDFiles() {
    return this.items.filter((item) => item.ext === 'psd' || item.ext === 'ai' || item.ext === 'pdf');
  }

  getWebFiles(){
    return this.items.filter((item) => item.ext === 'html' || item.ext === 'css' || item.ext === 'js');
  }
}

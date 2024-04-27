import { Injectable } from '@angular/core';

export interface FileManagerItem {
  id: number;
  name: string;
  type: string;
  ext: string;
  modifiedOn: string;
  size: string;
  file: File;
  folderName: string;
}
export interface FileManagerFolder {
  id: number;
  name: string;
  files: FileManagerItem[];
  size: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileManagerDataService {
  private files: FileManagerItem[] = [
    {
      id: 1,
      name: '120340.psd',
      type: 'Photoshop',
      ext: 'psd',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Drafts',
    },
    {
      id: 2,
      name: '120350.html',
      type: 'HTML',
      ext: 'html',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Documents',
    },
    {
      id: 3,
      name: '120360.pdf',
      type: 'PDF',
      ext: 'pdf',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Documents',
    },
    {
      id: 4,
      name: '120370.css',
      type: 'CSS',
      ext: 'css',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Documents',
    },
    {
      id: 5,
      name: '120380.html',
      type: 'HTML',
      ext: 'html',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Documents',
    },
    {
      id: 6,
      name: '120390.js',
      type: 'JavaScript',
      ext: 'js',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Documents',
    },
    {
      id: 7,
      name: '120400.ai',
      type: 'Illustrator',
      ext: 'ai',
      modifiedOn: this.formatDate(new Date().toISOString()),
      size: '0B',
      file: {} as File,
      folderName: 'Drafts',
    },
  ];

  private folders: FileManagerFolder[] = [
    {
      id: 1,
      name: 'Documents',
      size: '0B',
      files: [

      ]
    },
    {
      id: 2,
      name: 'Drafts',
      size: '0B',
      files: []
    },
    {
      id: 3,
      name: 'Downloads',
      size: '0B',
      files: []
    },
    {
      id: 4,
      name: 'Trash',
      size: '0B',
      files: []
    },
    {
      id: 5,
      name: 'Favorites',
      size: '0B',
      files: []
    },
    {
      id: 6,
      name: 'Shared',
      size: '0B',
      files: []
    }
  ]

  formatDate(date: string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = months[d.getMonth()];
    const day = d.getDate();
    const hour = ('0' + d.getHours()).slice(-2);
    const minute = ('0' + d.getMinutes()).slice(-2);
    const second = ('0' + d.getSeconds()).slice(-2);

    return `${day} ${month} ${year} ${hour}:${minute}:${second}`;
  }

  autoAddFilesToFolders() {
    this.files.forEach(file => {
      if (file.folderName) {
        // Busca y guarda la carpeta a la que pertenece el archivo
        const folder = this.folders.find(f => f.name === file.folderName);

        // Si la carpeta existe, agrega el archivo a los files de la carpeta
        if (folder) {
          if (!folder.files) {
            folder.files = [];
          }
          folder.files.push(file);
        }
      }
    });
  }

  getItems() {
    return this.files;
  }

  getFolders() {
    return this.folders;
  }

  getFiles() {
    return this.files.filter((item) => item.type === 'file');
  }

  getPSDFiles() {
    return this.files.filter(
      (item) => item.ext === 'psd' || item.ext === 'ai' || item.ext === 'pdf'
    );
  }

  getWebFiles() {
    return this.files.filter(
      (item) => item.ext === 'html' || item.ext === 'css' || item.ext === 'js'
    );
  }

  getOtherFiles() {
    return this.files.filter(
      (item) =>
        item.ext !== 'psd' &&
        item.ext !== 'ai' &&
        item.ext !== 'pdf' &&
        item.ext !== 'html' &&
        item.ext !== 'css' &&
        item.ext !== 'js' &&
        item.ext !== ''
    );
  }

  getDocumentFolderFiles() {
    return this.folders.filter((item) => item.name === 'Documents')[0].files;
  }
  getDraftsFolderFiles() {
    return this.folders.filter((item) => item.name === 'Drafts')[0].files;
  }
  getTrashFolderFiles() {
    return this.folders.filter((item) => item.name === 'Trash')[0].files;
  }
  getDownloadsFolderFiles() {
    return this.folders.filter((item) => item.name === 'Downloads')[0].files;
  }
  getTotalSize() {
    return this.files.reduce((acc, item) => acc + parseInt(item.size), 0);
  }
  getFileType(ext: string) {
    switch (ext) {
      case 'psd':
        return 'Photoshop';
      case 'html':
        return 'HTML';
      case 'pdf':
        return 'PDF';
      case 'css':
        return 'CSS';
      case 'js':
        return 'JavaScript';
      case 'ai':
        return 'Illustrator';
      case 'txt':
        return 'Text';
      default:
        return 'File';
    }
  }

}

import { Injectable } from '@angular/core';

export interface FileManagerItem {
  id: number;
  name: string;
  type: string;
  ext: string;
  modifiedOn: string;
  size: number;
  file: File;
  imageUrl: string;
  folderName: string[];
}
export interface FileManagerFolder {
  id: number;
  name: string;
  files: FileManagerItem[];
  size: number;
  icon: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileManagerDataService {
  private files: FileManagerItem[] = [];

  private folders: FileManagerFolder[] = [];

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
    this.files.forEach((file) => {
      if (file.folderName) {
        // Busca y almacena la carpeta a la que pertenece el archivo
        const folder = this.folders.find(
          (item) => item.name === file.folderName[file.folderName.length - 1]
        );

        // Si la carpeta existe, agrega el archivo a los files de la carpeta
        if (folder) {
          if (!folder.files) {
            folder.files = [];
          }
          folder.files.push(file);
        }
      }
    });
    localStorage.setItem('folders', JSON.stringify(this.folders));
  }

  getFiles() {
    localStorage.setItem('files', JSON.stringify(this.files));
    return this.files;
  }

  getFolders() {
    localStorage.setItem('folders', JSON.stringify(this.folders));
  }

  getAdobeFiles() {
    let files = JSON.parse(localStorage.getItem('adobeFiles') as string);
    if (!files) {
      files = this.files.filter(
        (item) => item.ext === 'psd' || item.ext === 'ai' || item.ext === 'pdf'
      );
      localStorage.setItem('adobeFiles', JSON.stringify(files));
    }
    return files;
  }

  getWebFiles() {
    let files = JSON.parse(localStorage.getItem('webFiles') as string);
    if (!files) {
      files = this.files.filter(
        (item) => item.ext === 'html' || item.ext === 'css' || item.ext === 'js'
      );
      localStorage.setItem('webFiles', JSON.stringify(files));
    }
    return files;
  }

  getOfficeFiles() {
    let files = JSON.parse(localStorage.getItem('officeFiles') as string);
    if (!files) {
      files = this.files.filter(
        (item) =>
          item.ext === 'doc' ||
          item.ext === 'docx' ||
          item.ext === 'xls' ||
          item.ext === 'xlsx' ||
          item.ext === 'ppt' ||
          item.ext === 'pptx'
      );
      localStorage.setItem('officeFiles', JSON.stringify(files));
    }
    return files;
  }

  getOtherFiles() {
    let files = JSON.parse(localStorage.getItem('otherFiles') as string);
    if (!files) {
      files = this.files.filter(
        (item) =>
          item.ext !== 'psd' &&
          item.ext !== 'ai' &&
          item.ext !== 'pdf' &&
          item.ext !== 'html' &&
          item.ext !== 'css' &&
          item.ext !== 'js' &&
          item.ext !== 'doc' &&
          item.ext !== 'docx' &&
          item.ext !== 'xls' &&
          item.ext !== 'xlsx' &&
          item.ext !== 'ppt' &&
          item.ext !== 'pptx'
      );
      localStorage.setItem('otherFiles', JSON.stringify(files));
    }
    return files;
  }

  getDocumentFolderFiles() {
    let files = JSON.parse(
      localStorage.getItem('documentFolderFiles') as string
    );
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Documents')[0].files;
      localStorage.setItem('documentFolderFiles', JSON.stringify(files));
    }
    return files;
  }
  getDraftsFolderFiles() {
    let files = JSON.parse(localStorage.getItem('draftsFolderFiles') as string);
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Drafts')[0].files;
      localStorage.setItem('draftsFolderFiles', JSON.stringify(files));
    }
    return files;
  }

  getImagesFolderFiles() {
    let files = JSON.parse(localStorage.getItem('imagesFolderFiles') as string);
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Images')[0].files;
      localStorage.setItem('imagesFolderFiles', JSON.stringify(files));
    }
    return files;
  }

  getTrashFolderFiles() {
    let files = JSON.parse(localStorage.getItem('trashFolderFiles') as string);
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Trash')[0].files;
      localStorage.setItem('trashFolderFiles', JSON.stringify(files));
    }
    return files;
  }
  getDownloadsFolderFiles() {
    let files = JSON.parse(
      localStorage.getItem('downloadsFolderFiles') as string
    );
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Downloads')[0].files;
      localStorage.setItem('downloadsFolderFiles', JSON.stringify(files));
    }
    return files;
  }
  getFavoritesFolderFiles() {
    let files = JSON.parse(
      localStorage.getItem('favoritesFolderFiles') as string
    );
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Favorites')[0].files;
      localStorage.setItem('favoritesFolderFiles', JSON.stringify(files));
    }
    return files;
  }
  getSharedFolderFiles() {
    let files = JSON.parse(localStorage.getItem('sharedFolderFiles') as string);
    if (!files) {
      files = this.folders.filter((item) => item.name === 'Shared')[0].files;
      localStorage.setItem('sharedFolderFiles', JSON.stringify(files));
    }
    return files;
  }
  getTotalSize() {
    let size = JSON.parse(localStorage.getItem('totalSize') as string);
    if (!size) {
      size = 0;
    }
    this.files.forEach((file) => {
      size += file.size;
    });
    localStorage.setItem('totalSize', JSON.stringify(size));
    return size;
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

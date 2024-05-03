import { Component, OnInit } from '@angular/core';
import {
  FileManagerDataService,
  FileManagerItem,
  FileManagerFolder,
} from '../../services/file-manager-data.service';
import { MenuItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { replace } from 'lodash';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.css',
  providers: [ConfirmationService, MessageService],
  animations: [
    trigger('detailsAnimation', [
      state(
        'inactive',
        style({
          transform: 'translateX(100%)',
          visibility: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
          visibility: 'visible',
        })
      ),
      transition('inactive => active', animate('400ms ease-in')),
      transition('active => inactive', animate('400ms ease-out')),
    ]),
  ],
})
export class FileManagerComponent implements OnInit {
  folders!: FileManagerFolder[];
  files!: FileManagerItem[];
  adobeFiles!: FileManagerItem[];
  webFiles!: FileManagerItem[];
  officeFiles!: FileManagerItem[];
  otherFiles!: FileManagerItem[];
  filteredFiles: FileManagerItem[] = [];
  uploadedFiles: any[] = [];

  filesMenu!: MenuItem[];
  folderMenu!: MenuItem[];
  createFolderMenu!: MenuItem[];
  trashMenu!: MenuItem[];

  selectedFile!: FileManagerItem | null;
  renamingFile!: FileManagerItem;
  oldName!: string;
  detailsActive: boolean = false;
  totalSize!: number;

  showAllFiles: boolean = true;
  showFolders: boolean = true;
  showSelectedFolder: boolean = false;

  showUploadDialog: boolean = false;

  documentFolder!: FileManagerItem[];
  draftFolder!: FileManagerItem[];
  imageFolder!: FileManagerItem[];
  trashFolder!: FileManagerItem[];
  downloadsFolder!: FileManagerItem[];
  favoritesFolder!: FileManagerItem[];
  sharedFolder!: FileManagerItem[];
  oldFolder!: string;

  createFolderDialog: boolean = false;
  newFolderName: string = '';
  selectedFolder!: FileManagerFolder | null;

  fileTypes!: string[];
  selectedTypes: string[] = [];
  fileFolders!: string[];
  selectedFolders!: string[];

  searchQuery: string = '';

  totalSizeMeter = [{ label: 'Space used', value: 0, color: '#4b4bdf' }];

  constructor(
    private fileManagerDataService: FileManagerDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    //localStorage.clear();

    // Files
    this.files = JSON.parse(localStorage.getItem('files') || '[]');
    // All Folders
    const totalSize = JSON.parse(localStorage.getItem('totalSize') || '0');
    if (totalSize === 0) {
      this.folders = [
        {
          id: 1,
          name: 'Documents',
          size: 0,
          files: [],
          icon: 'bi-file-earmark-text',
        },
        {
          id: 2,
          name: 'Drafts',
          size: 0,
          files: [],
          icon: 'bi-pencil-square',
        },
        {
          id: 3,
          name: 'Downloads',
          size: 0,
          files: [],
          icon: 'bi-download',
        },
        {
          id: 4,
          name: 'Images',
          size: 0,
          files: [],
          icon: 'bi-image',
        },
        {
          id: 5,
          name: 'Trash',
          size: 0,
          files: [],
          icon: 'bi-trash3',
        },
        {
          id: 6,
          name: 'Favorites',
          size: 0,
          files: [],
          icon: 'bi-star',
        },
        {
          id: 7,
          name: 'Shared',
          size: 0,
          files: [],
          icon: 'bi-share',
        },
      ];
    } else {
      this.folders = JSON.parse(localStorage.getItem('folders') || '[]');
    }

    // Total Size
    this.totalSize = this.fileManagerDataService.getTotalSize();
    this.totalSizeMeter = [
      { label: 'Space used', value: this.totalSize, color: '#4b4bdf' },
    ];

    // MultiSelect Items
    this.fileTypes = [
      'psd',
      'html',
      'pdf',
      'css',
      'js',
      'ai',
      'txt',
      'docx',
      'doc',
      'xlsx',
      'xls',
      'ppt',
      'pptx',
      'jpg',
      'jpeg',
      'png',
      'svg',
      'webp',
    ];
    this.fileFolders = this.folders.map((folder) => folder.name);

    // Context Menus
    this.filesMenu = [
      {
        label: 'Download',
        icon: 'bi bi-download',
        command: () => {
          if (this.selectedFile) {
            this.downloadFile(this.selectedFile);
          }
        },
      },
      {
        label: 'Move To',
        icon: 'bi bi-arrow-right',
        items: [
          {
            label: 'Documents',
            icon: 'bi bi-file-earmark-text',
            command: () => {
              if (this.selectedFile)
                this.moveFile(this.selectedFile, 'Documents');
            },
          },
          {
            label: 'Drafts',
            icon: 'bi bi-pencil-square',
            command: () => {
              if (this.selectedFile) this.moveFile(this.selectedFile, 'Drafts');
            },
          },
          {
            label: 'Downloads',
            icon: 'bi bi-download',
            command: () => {
              if (this.selectedFile)
                this.moveFile(this.selectedFile, 'Downloads');
            },
          },
          {
            label: 'Favorites',
            icon: 'bi bi-star',
            command: () => {
              if (this.selectedFile)
                this.moveFile(this.selectedFile, 'Favorites');
            },
          },
        ],
      },
      {
        label: 'Rename',
        icon: 'bi bi-pencil',
        command: () => {
          if (this.selectedFile) this.renameFile(this.selectedFile);
        },
      },
      {
        label: 'Trash',
        icon: 'bi bi-trash3',
        command: () => {
          if (this.selectedFile) this.deleteToTrash(this.selectedFile);
        },
      },
    ];
    this.folderMenu = [
      {
        label: 'Create Folder',
        icon: 'bi bi-folder-plus',
        command: () => (this.createFolderDialog = true),
      },
      {
        label: 'Delete',
        icon: 'bi bi-trash3',
        items: this.folders.map((folder) => {
          return {
            label: folder.name,
            icon: 'bi bi-folder',
          };
        }),
      },
    ];
    this.trashMenu = [
      {
        label: 'Delete Permanently',
        icon: 'bi bi-trash3',
        command: () => {
          if (this.selectedFile) this.deleteFile(this.selectedFile);
        },
      },
    ];
  }

  // Get the icon based on the file extension
  getFileIcon(ext: string) {
    switch (ext) {
      // Adobe Icons
      case 'psd':
        return 'bi-filetype-psd text-psd';
      case 'ai':
        return 'bi-filetype-ai text-ai';
      case 'pdf':
        return 'bi-filetype-pdf text-danger';
      // Web Icons
      case 'html':
        return 'bi-filetype-html text-html';
      case 'css':
        return 'bi-filetype-css text-css';
      case 'js':
        return 'bi-filetype-js text-js';
      case 'json':
        return 'bi-filetype-json text-json';
      // Txt Icon
      case 'txt':
        return 'bi-file-earmark-text';
      // Office Icons
      case 'docx':
        return 'bi-filetype-docx text-primary';
      case 'xlsx':
        return 'bi-filetype-xlsx text-success';
      case 'doc':
        return 'bi-filetype-doc text-primary';
      case 'xls':
        return 'bi-filetype-xls text-success';
      case 'ppt':
        return 'bi-filetype-ppt text-html';
      case 'pptx':
        return 'bi-filetype-pptx text-html';
      // Image Icons
      case 'jpg':
      case 'jpeg':
        return 'bi-filetype-jpg';
      case 'png':
        return 'bi-filetype-png';
      case 'bi-filtype-svg':
        return 'bi-filetype-svg';
      case 'gif':
        return 'bi-filetype-gif';
      case 'webp':
        return 'bi-image';
      default:
        return 'bi-file-earmark';
    }
  }

  // Get the type of file based on the file extension
  getFileType(ext: string) {
    switch (ext) {
      // Adobe Types
      case 'psd':
        return 'Photoshop';
      case 'ai':
        return 'Illustrator';
      case 'pdf':
        return 'PDF';
      // Web Types
      case 'html':
        return 'HTML';
      case 'css':
        return 'CSS';
      case 'js':
        return 'JavaScript';
      // Text Type
      case 'txt':
        return 'Text';
      // Office Types
      case 'docx':
      case 'doc':
        return 'Word';
      case 'xls':
      case 'xlsx':
        return 'Excel';
      case 'ppt':
      case 'pptx':
        return 'PowerPoint';
      // Image Types
      case 'jpg':
      case 'jpeg':
        return 'JPEG Image';
      case 'png':
        return 'PNG Image';
      case 'svg':
        return 'SVG Image';
      case 'webp':
        return 'WebP Image';
      default:
        return 'File';
    }
  }

  deleteToTrash(file: FileManagerItem) {
    this.folders = this.folders.map((f) => {
      if (f.name === 'Trash') {
        file.folderName = ['Trash'];
        f.files.push(file);
        f.size += file.size;
        localStorage.setItem('files', JSON.stringify(this.files));
        localStorage.setItem('folders', JSON.stringify(this.folders));
      } else {
        f.files = f.files.filter((f) => f.name !== file.name);
        f.size -= file.size;
        localStorage.setItem('files', JSON.stringify(this.files));
        localStorage.setItem('folders', JSON.stringify(this.folders));
      }
      return f;
    });
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: file.name + ' moved to Trash',
      life: 3000,
    });
    this.selectedFile = null;
    location.reload();
  }

  // Delete File from all folders

  deleteFile(file: FileManagerItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + file.name + ' permanently?',
      header: 'Delete Confirmation',
      icon: 'bi bi-trash3',
      accept: () => {
        this.selectedFile = null;
        this.totalSize -= file.size;
        localStorage.setItem('totalSize', JSON.stringify(this.totalSize));

        this.selectedFile = null;

        this.files = this.files.filter((f) => f.name !== file.name);
        localStorage.setItem('files', JSON.stringify(this.files));

        this.downloadsFolder = this.downloadsFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });

        localStorage.setItem(
          'downloadsFolderFiles',
          JSON.stringify(this.downloadsFolder)
        );

        this.favoritesFolder = this.favoritesFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });
        localStorage.setItem(
          'favoritesFolderFiles',
          JSON.stringify(this.favoritesFolder)
        );

        this.trashFolder = this.trashFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });
        localStorage.setItem(
          'trashFolderFiles',
          JSON.stringify(this.trashFolder)
        );

        this.documentFolder = this.documentFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });

        localStorage.setItem(
          'documentFolderFiles',
          JSON.stringify(this.documentFolder)
        );

        this.draftFolder = this.draftFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });
        localStorage.setItem(
          'draftFolderFiles',
          JSON.stringify(this.draftFolder)
        );

        this.sharedFolder = this.sharedFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });
        localStorage.setItem(
          'sharedFolderFiles',
          JSON.stringify(this.sharedFolder)
        );

        this.otherFiles = this.otherFiles.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });
        localStorage.setItem('otherFiles', JSON.stringify(this.otherFiles));

        this.imageFolder = this.imageFolder.filter((f) => {
          f.name !== file.name;
          f.size -= file.size;
        });
        localStorage.setItem(
          'imagesFolderFiles',
          JSON.stringify(this.imageFolder)
        );

        switch (file.ext) {
          case 'psd':
          case 'ai':
          case 'pdf':
            this.adobeFiles = this.adobeFiles.filter(
              (f) => f.name !== file.name
            );
            localStorage.setItem('adobeFiles', JSON.stringify(this.adobeFiles));
            break;
          case 'html':
          case 'css':
          case 'js':
            this.webFiles = this.webFiles.filter((f) => f.name !== file.name);
            localStorage.setItem('webFiles', JSON.stringify(this.webFiles));
            break;
          case 'docx':
          case 'xls':
            this.officeFiles = this.officeFiles.filter(
              (f) => f.name !== file.name
            );
            localStorage.setItem(
              'officeFiles',
              JSON.stringify(this.officeFiles)
            );
            break;
          default:
            this.otherFiles = this.otherFiles.filter(
              (f) => f.name !== file.name
            );
            break;
        }
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: file.name + ' deleted successfully',
          life: 3000,
        });
        location.reload();
      },
    });
  }

  renameFile(file: FileManagerItem) {
    this.oldName = file.name;
    this.renamingFile = file;
  }
  saveRenameFile(file: FileManagerItem) {
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: 'File renamed to ' + file.name + ' successfully.',
      life: 3000,
    });
    this.renamingFile = {} as FileManagerItem;
  }
  cancelRenameFile() {
    this.renamingFile.name = this.oldName;
    this.messageService.add({
      severity: 'info',
      summary: 'Canceled',
      detail: 'Operation Canceled',
      life: 3000,
    });
    this.renamingFile = {} as FileManagerItem;
  }

  previewUploadedFile(event: any) {
    this.showUploadDialog = true;
    this.uploadedFiles = event.files;
  }

  // File Upload
  uploadFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const existsFile = this.files.find((f) => f.name === file.name);
      if (existsFile) {
        this.messageService.add({
          severity: 'error',
          summary: 'File Upload Error',
          detail: 'File already exists',
          life: 3000,
        });
      } else {
        // Tamaño máximo del archivo
        const maxFileSize = 1073741824; // 1 GB
        if (file.size > maxFileSize) {
          this.messageService.add({
            severity: 'error',
            summary: 'File Upload Error',
            detail: 'Maximum file size allowed is 10MB',
            life: 3000,
          });
        } else {
          let newFile: FileManagerItem = {
            id: this.files.length + 1,
            name: file.name,
            type: this.getFileType(file.name.split('.').pop() || ''),
            ext: file.name.split('.').pop() || '',
            modifiedOn: this.formatDate(
              new Date(file.lastModified).toISOString()
            ),
            size: file.size,
            folderName: [''],
            imageUrl: URL.createObjectURL(file),
            file: file,
          };

          // Si el archivo es una imagen se guarda en Images
          if (
            newFile.ext === 'jpg' ||
            newFile.ext === 'jpeg' ||
            newFile.ext === 'png' ||
            newFile.ext === 'svg' ||
            newFile.ext === 'webp'
          ) {
            this.folders = this.folders.map((f) => {
              if (f.name === 'Images') {
                newFile.folderName = ['Images'];
                f.files.push(newFile);
                f.size += newFile.size;
                localStorage.setItem('folders', JSON.stringify(this.folders));
              }
              return f;
            });
          }
          this.files.push(newFile);
          localStorage.setItem('files', JSON.stringify(this.files));
          this.selectedFile = newFile;
          this.selectedFolder = null;
          this.totalSize += file.size;
          localStorage.setItem('totalSize', JSON.stringify(this.totalSize));
          this.messageService.add({
            severity: 'success',
            summary: 'File Uploaded',
            detail: file.name + ' uploaded successfully',
            life: 3000,
          });
          location.reload();
        }
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'File Upload Error',
        detail: 'No file selected',
        life: 3000,
      });
    }
  }

  dropFile(folder: string) {
    if (this.selectedFile) {
      this.moveFile(this.selectedFile, folder);
    }
  }

  selectFile(file: FileManagerItem) {
    this.selectedFile = file;
    this.selectedFolder = null;
    this.detailsActive = true;
  }
  selectFolder(folder: FileManagerFolder) {
    this.selectedFolder = folder;
    this.detailsActive = true;
    this.selectedFile = null;
  }
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

  formatFileSize(size: number) {
    if (size === 0 || size === null) return '0 Bytes';
    const k = 1024;
    const dm = 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(size) / Math.log(k));
    return parseFloat((size / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  unformatFileSize(size: string) {
    return Number(size.split(' ')[0]);
  }

  downloadFile(fileManagerItem: FileManagerItem) {
    // Retrieve the File object from the FileManagerItem object
    const file: File = fileManagerItem.file;
    this.downloadsFolder.push(fileManagerItem);
    localStorage.setItem(
      'downloadsFolder',
      JSON.stringify(this.downloadsFolder)
    );

    // Create an object URL for the file
    const url = window.URL.createObjectURL(file);

    // Create a hidden `a` tag
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = file.name;

    // Append the `a` tag to the body and click on it
    document.body.appendChild(a);
    a.click();

    // Clean up by removing the `a` tag and revoking the object URL
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  moveFile(file: FileManagerItem, folder: string) {
    this.oldFolder = file.folderName[0];
    // Actualizar el folderName[] del archivo en files[] del localstorage si no existe en la carpeta
    const isFileInFolder = this.folders.some((f) =>
      f.files.some((f) => f.name === file.name)
    );
    switch (folder) {
      case 'Documents':
        if (isFileInFolder) {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        } else {
          this.files = this.files.map((f) => {
            if (f.id === file.id) {
              if (f.folderName[0] !== '') {
                f.folderName.push(folder);
              } else {
                f.folderName = [folder];
              }
              localStorage.setItem('files', JSON.stringify(this.files));
            }
            return f;
          });
          this.folders = this.folders.map((f) => {
            if (f.name === 'Documents') {
              f.files.push(file);
              f.size += file.size;
              localStorage.setItem('folders', JSON.stringify(this.folders));
            }
            return f;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' moved to ' + folder,
          });
        }
        break;
      case 'Drafts':
        if (isFileInFolder) {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        } else {
          this.files = this.files.map((f) => {
            if (f.id === file.id) {
              if (f.folderName[0] !== '') {
                f.folderName.push(folder);
              } else {
                f.folderName = [folder];
              }
              localStorage.setItem('files', JSON.stringify(this.files));
            }
            return f;
          });
          this.folders = this.folders.map((f) => {
            if (f.name === 'Drafts') {
              f.files.push(file);
              f.size += file.size;
              localStorage.setItem('folders', JSON.stringify(this.folders));
            }
            return f;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' moved to ' + folder,
          });
        }
        break;
      case 'Downloads':
        if (isFileInFolder) {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        } else {
          this.files = this.files.map((f) => {
            if (f.id === file.id) {
              if (f.folderName[0] !== '') {
                f.folderName.push(folder);
              } else {
                f.folderName = [folder];
              }
              localStorage.setItem('files', JSON.stringify(this.files));
            }
            return f;
          });
          this.folders = this.folders.map((f) => {
            if (f.name === 'Downloads') {
              f.files.push(file);
              f.size += file.size;
              localStorage.setItem('folders', JSON.stringify(this.folders));
            }
            return f;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' moved to ' + folder,
          });
        }
        break;
      case 'Favorites':
        if (isFileInFolder) {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        } else {
          this.files = this.files.map((f) => {
            if (f.id === file.id) {
              if (f.folderName[0] !== '') {
                f.folderName.push(folder);
              } else {
                f.folderName = [folder];
              }
              localStorage.setItem('files', JSON.stringify(this.files));
            }
            return f;
          });
          this.folders = this.folders.map((f) => {
            if (f.name === 'Favorites') {
              f.files.push(file);
              f.size += file.size;
              localStorage.setItem('folders', JSON.stringify(this.folders));
            }
            return f;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' moved to ' + folder,
          });
        }
        break;
      case 'Images':
        if (isFileInFolder) {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        } else {
          this.files = this.files.map((f) => {
            if (f.id === file.id) {
              if (f.folderName[0] !== '') {
                f.folderName.push(folder);
              } else {
                f.folderName = [folder];
              }
              localStorage.setItem('files', JSON.stringify(this.files));
            }
            return f;
          });
          this.folders = this.folders.map((f) => {
            if (f.name === 'Images') {
              f.files.push(file);
              f.size += file.size;
              localStorage.setItem('folders', JSON.stringify(this.folders));
            }
            return f;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' moved to ' + folder,
          });
        }
        break;
      case 'Shared':
        if (isFileInFolder) {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        } else {
          this.files = this.files.map((f) => {
            if (f.id === file.id) {
              if (f.folderName[0] !== '') {
                f.folderName.push(folder);
              } else {
                f.folderName = [folder];
              }
              localStorage.setItem('files', JSON.stringify(this.files));
            }
            return f;
          });
          this.folders = this.folders.map((f) => {
            if (f.name === 'Shared') {
              f.files.push(file);
              f.size += file.size;
              localStorage.setItem('folders', JSON.stringify(this.folders));
            }
            return f;
          });
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' moved to ' + folder,
          });
        }
        break;
      default:
        break;
    }
  }

  openFolder(folder: string) {
    this.showSelectedFolder = true;
    switch (folder) {
      case 'Documents':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Documents');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Documents') || null;
        break;
      case 'Drafts':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Drafts');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Drafts') || null;
        break;
      case 'Downloads':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Downloads');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Downloads') || null;
        break;
      case 'Images':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Images');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Images') || null;
        break;
      case 'Trash':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Trash');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Trash') || null;
        break;
      case 'Favorites':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Favorites');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Favorites') || null;
        break;
      case 'Shared':
        this.selectedFile = null;
        this.files = this.files.filter((f) => {
          return f.folderName.includes('Shared');
        });
        this.selectedFolder =
          this.folders.find((f) => f.name === 'Shared') || null;
        break;
      default:
        break;
    }
  }

  cancelCreateFolder() {
    this.createFolderDialog = false;
    this.newFolderName = '';
    this.messageService.add({
      severity: 'info',
      summary: 'Canceled',
      detail: 'Operation Canceled',
      life: 3000,
    });
  }

  createFolder() {
    if (this.newFolderName) {
      const newFolder: FileManagerFolder = {
        id: this.folders.length + 1,
        name: this.newFolderName,
        files: [],
        size: 0,
        icon: '',
      };
      this.folders.push(newFolder);
      this.messageService.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Folder created successfully',
        life: 3000,
      });
      this.createFolderDialog = false;
      this.newFolderName = '';
    }
  }

  backToAllFiles() {
    this.files = JSON.parse(localStorage.getItem('files') || '[]');
    this.showAllFiles = true;
    this.selectedFile = null;
    this.showSelectedFolder = false;
  }

  onSelectedTypesChange(types: string[]) {
    this.selectedTypes = types;
    this.updateFilteredFiles();
  }
  updateFilteredFiles() {
    this.filteredFiles = this.files.filter((file) => {
      return this.selectedTypes.includes(file.ext);
    });
  }

  searchFile() {
    this.filteredFiles = this.files.filter((file) => {
      return file.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}

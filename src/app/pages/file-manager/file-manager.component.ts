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
          transform: 'translateX(100%)', // 'translateX(-100%)',
          display: 'none',
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
          display: 'block',
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
  showDocumentFolder: boolean = false;
  showDraftFolder: boolean = false;
  showTrashFolder: boolean = false;
  showDownloadsFolder: boolean = false;
  showFavoritesFolder: boolean = false;
  showSharedFolder: boolean = false;
  showImageFolder: boolean = false;

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
    private messageService: MessageService,
  ) {}

  ngOnInit() {
    // localStorage.clear();
    // Folders
    this.fileManagerDataService.autoAddFilesToFolders();
    this.folders = this.fileManagerDataService.getFolders();

    // Files
    this.files = JSON.parse(localStorage.getItem('files') || '[]');
    this.adobeFiles = JSON.parse(localStorage.getItem('adobeFiles') || '[]');
    this.webFiles = JSON.parse(localStorage.getItem('webFiles') || '[]');
    this.officeFiles = JSON.parse(localStorage.getItem('officeFiles') || '[]');
    this.otherFiles = JSON.parse(localStorage.getItem('otherFiles') || '[]');

    // Total Size
    this.totalSize = this.fileManagerDataService.getTotalSize();
    this.totalSizeMeter = [{ label: 'Space used', value: this.totalSize, color: '#4b4bdf' }];

    // Folders
    this.documentFolder = this.fileManagerDataService.getDocumentFolderFiles();
    this.draftFolder = this.fileManagerDataService.getDraftsFolderFiles();
    this.imageFolder = this.fileManagerDataService.getImagesFolderFiles();
    this.trashFolder = this.fileManagerDataService.getTrashFolderFiles();
    this.downloadsFolder =
      this.fileManagerDataService.getDownloadsFolderFiles();
    this.favoritesFolder =
      this.fileManagerDataService.getFavoritesFolderFiles();
    this.sharedFolder = this.fileManagerDataService.getSharedFolderFiles();

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
        label: 'Move to',
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
        label: 'Delete',
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
    this.trashFolder.push(file);
    localStorage.setItem('trashFolderFiles', JSON.stringify(this.trashFolder));
    this.files = this.files.filter((f) => f.name !== file.name);
    localStorage.setItem('files', JSON.stringify(this.files));

    this.downloadsFolder = this.downloadsFolder.filter(
      (f) => f.name !== file.name
    );
    localStorage.setItem(
      'downloadsFolder',
      JSON.stringify(this.downloadsFolder)
    );

    this.favoritesFolder = this.favoritesFolder.filter(
      (f) => f.name !== file.name
    );
    localStorage.setItem(
      'favoritesFolder',
      JSON.stringify(this.favoritesFolder)
    );

    this.documentFolder = this.documentFolder.filter(
      (f) => f.name !== file.name
    );
    localStorage.setItem('documentFolder', JSON.stringify(this.documentFolder));

    this.draftFolder = this.draftFolder.filter((f) => f.name !== file.name);
    localStorage.setItem('draftFolder', JSON.stringify(this.draftFolder));

    this.sharedFolder = this.sharedFolder.filter((f) => f.name !== file.name);
    localStorage.setItem('sharedFolder', JSON.stringify(this.sharedFolder));

    this.otherFiles = this.otherFiles.filter((f) => f.name !== file.name);
    localStorage.setItem('otherFiles', JSON.stringify(this.otherFiles));

    this.imageFolder = this.imageFolder.filter((f) => f.name !== file.name);
    localStorage.setItem('imagesFolderFiles', JSON.stringify(this.imageFolder));

    switch (file.ext) {
      case 'psd':
      case 'ai':
      case 'pdf':
        this.adobeFiles = this.adobeFiles.filter((f) => f.name !== file.name);
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
        this.officeFiles = this.officeFiles.filter((f) => f.name !== file.name);
        localStorage.setItem('officeFiles', JSON.stringify(this.officeFiles));
        break;
      default:
        this.otherFiles = this.otherFiles.filter((f) => f.name !== file.name);
        break;
    }
    this.messageService.add({
      severity: 'success',
      summary: 'Successful',
      detail: file.name + ' moved to Trash',
      life: 3000,
    });
  }

  // Delete File from all folders

  deleteFile(file: FileManagerItem) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + file.name + ' permanently?',
      header: 'Delete Confirmation',
      icon: 'bi bi-trash3',
      accept: () => {
        this.totalSize -= file.size;
        localStorage.setItem('totalSize', JSON.stringify(this.totalSize));
        this.totalSizeMeter[0].value = this.totalSize;

        this.selectedFile = null;

        this.files = this.files.filter((f) => f.name !== file.name);
        localStorage.setItem('files', JSON.stringify(this.files));

        this.downloadsFolder = this.downloadsFolder.filter(
          (f) => f.name !== file.name
        );
        localStorage.setItem(
          'downloadsFolderFiles',
          JSON.stringify(this.downloadsFolder)
        );

        this.favoritesFolder = this.favoritesFolder.filter(
          (f) => f.name !== file.name
        );
        localStorage.setItem(
          'favoritesFolderFiles',
          JSON.stringify(this.favoritesFolder)
        );

        this.trashFolder = this.trashFolder.filter((f) => f.name !== file.name);
        localStorage.setItem(
          'trashFolderFiles',
          JSON.stringify(this.trashFolder)
        );

        this.documentFolder = this.documentFolder.filter(
          (f) => f.name !== file.name
        );
        localStorage.setItem(
          'documentFolder',
          JSON.stringify(this.documentFolder)
        );

        this.draftFolder = this.draftFolder.filter((f) => f.name !== file.name);
        localStorage.setItem(
          'draftFolderFiles',
          JSON.stringify(this.draftFolder)
        );

        this.sharedFolder = this.sharedFolder.filter(
          (f) => f.name !== file.name
        );
        localStorage.setItem(
          'sharedFolderFiles',
          JSON.stringify(this.sharedFolder)
        );

        this.otherFiles = this.otherFiles.filter((f) => f.name !== file.name);
        localStorage.setItem('otherFiles', JSON.stringify(this.otherFiles));

        this.imageFolder = this.imageFolder.filter((f) => f.name !== file.name);
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

  // File Upload
  uploadFile(fileEvent: any) {
    const file: File = fileEvent.target.files[0];

    if (file) {
      let allFiles = JSON.parse(localStorage.getItem('files') || '[]');
      if (
        allFiles.some(
          (existingFile: FileManagerItem) => existingFile.name === file.name
        )
      ) {
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
            imageUrl: '',
            file: file,
          };
          this.files.push(newFile);
          localStorage.setItem('files', JSON.stringify(this.files));
          this.selectedFile = newFile;
          this.selectedFolder = null;
          this.totalSize += file.size;
          localStorage.setItem('totalSize', JSON.stringify(this.totalSize));
          this.totalSizeMeter[0].value = this.totalSize;
          this.messageService.add({
            severity: 'success',
            summary: 'File Uploaded',
            detail: file.name + ' uploaded successfully',
            life: 3000,
          });

          switch (newFile.ext) {
            case 'psd':
            case 'ai':
            case 'pdf':
              this.adobeFiles.push(newFile);
              localStorage.setItem(
                'adobeFiles',
                JSON.stringify(this.adobeFiles)
              );
              break;
            case 'html':
            case 'css':
            case 'js':
              this.webFiles.push(newFile);
              localStorage.setItem('webFiles', JSON.stringify(this.webFiles));
              break;
            case 'docx':
            case 'doc':
            case 'xlsx':
            case 'xls':
              this.officeFiles.push(newFile);
              localStorage.setItem(
                'officeFiles',
                JSON.stringify(this.officeFiles)
              );
              break;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'svg':
            case 'webp':
              const imageUrl = URL.createObjectURL(file);
              newFile.imageUrl = imageUrl;
              this.imageFolder.push(newFile);
              localStorage.setItem(
                'imagesFolderFiles',
                JSON.stringify(this.imageFolder)
              );
              break;
            default:
              this.otherFiles.push(newFile);
              localStorage.setItem(
                'otherFiles',
                JSON.stringify(this.otherFiles)
              );
              break;
          }
          location.reload();
        }
      }
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
    file.folderName = [folder];
    switch (folder) {
      case 'Documents':
        this.draftFolder = this.draftFolder.filter((f) => f !== file);
        const isFileInDocumentFolder = this.documentFolder.some(
          (f) => f.id === file.id
        );
        if (!isFileInDocumentFolder) {
          this.documentFolder.push(file);
          if (this.oldFolder !== '') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail:
                file.name + ' moved from ' + this.oldFolder + ' to ' + folder,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: file.name + ' moved to ' + folder,
              life: 3000,
            });
          }
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        }
        break;
      case 'Drafts':
        this.documentFolder = this.documentFolder.filter((f) => f !== file);
        const isFileInDraftFolder = this.draftFolder.some(
          (f) => f.id === file.id
        );
        if (!isFileInDraftFolder) {
          this.draftFolder.push(file);
          if (this.oldFolder !== '') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail:
                file.name + ' moved from ' + this.oldFolder + ' to ' + folder,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: file.name + ' moved to ' + folder,
              life: 3000,
            });
          }
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        }
        break;
      case 'Trash':
        this.documentFolder = this.documentFolder.filter((f) => f !== file);
        this.draftFolder = this.draftFolder.filter((f) => f !== file);
        const isFileInTrashFolder = this.trashFolder.some(
          (f) => f.id === file.id
        );
        if (!isFileInTrashFolder) {
          this.trashFolder.push(file);
          if (this.oldFolder !== '') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail:
                file.name + ' moved from ' + this.oldFolder + ' to ' + folder,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: file.name + ' moved to ' + folder,
              life: 3000,
            });
          }
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        }
        break;
      case 'Downloads':
        this.documentFolder = this.documentFolder.filter((f) => f !== file);
        this.draftFolder = this.draftFolder.filter((f) => f !== file);
        const isFileInDownloadsFolder = this.downloadsFolder.some(
          (f) => f.id === file.id
        );
        if (!isFileInDownloadsFolder) {
          this.trashFolder.push(file);
          if (this.oldFolder !== '') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail:
                file.name + ' moved from ' + this.oldFolder + ' to ' + folder,
              life: 3000,
            });
          } else {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: file.name + ' moved to ' + folder,
              life: 3000,
            });
          }
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        }
        break;
      case 'Favorites':
        const isFileInFavoritesFolder = this.favoritesFolder.some(
          (f) => f.id === file.id
        );
        if (!isFileInFavoritesFolder) {
          this.favoritesFolder.push(file);
          if (this.oldFolder !== '') {
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: file.name + ' added to ' + folder,
              life: 3000,
            });
          }
        } else {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'File already in ' + folder,
            life: 3000,
          });
        }
        break;
      default:
        break;
    }
  }

  openFolder(folder: string) {
    if (this.selectedFolder) {
      switch (folder) {
        case 'Documents':
          this.selectedFolder.name = 'Documents';
          this.showDocumentFolder = true;
          this.showAllFiles = false;
          this.showDraftFolder = false;
          this.showTrashFolder = false;
          this.showDownloadsFolder = false;
          this.showFavoritesFolder = false;
          this.showSharedFolder = false;
          break;
        case 'Drafts':
          this.selectedFolder.name = 'Drafts';
          this.showDocumentFolder = false;
          this.showAllFiles = false;
          this.showDraftFolder = true;
          this.showTrashFolder = false;
          this.showDownloadsFolder = false;
          this.showFavoritesFolder = false;
          this.showSharedFolder = false;
          break;
        case 'Downloads':
          this.selectedFolder.name = 'Downloads';
          this.showDocumentFolder = false;
          this.showAllFiles = false;
          this.showDraftFolder = false;
          this.showTrashFolder = false;
          this.showDownloadsFolder = true;
          this.showFavoritesFolder = false;
          this.showSharedFolder = false;
          break;
        case 'Images':
          this.selectedFolder.name = 'Images';
          this.showDocumentFolder = false;
          this.showAllFiles = false;
          this.showDraftFolder = false;
          this.showTrashFolder = false;
          this.showDownloadsFolder = false;
          this.showFavoritesFolder = false;
          this.showSharedFolder = false;
          this.showImageFolder = true;
          break;
        default:
          break;
      }
    }
  }

  openFavoritesFolder() {
    this.showDocumentFolder = false;
    this.showAllFiles = false;
    this.showDraftFolder = false;
    this.showTrashFolder = false;
    this.showDownloadsFolder = false;
    this.showFavoritesFolder = true;
    this.showImageFolder = false;
    this.showSharedFolder = false;
  }
  openSharedFolder() {
    this.showDocumentFolder = false;
    this.showAllFiles = false;
    this.showDraftFolder = false;
    this.showTrashFolder = false;
    this.showDownloadsFolder = false;
    this.showFavoritesFolder = false;
    this.showImageFolder = false;
    this.showSharedFolder = true;
  }
  openTrashFolder() {
    this.showDocumentFolder = false;
    this.showAllFiles = false;
    this.showDraftFolder = false;
    this.showTrashFolder = true;
    this.showDownloadsFolder = false;
    this.showFavoritesFolder = false;
    this.showSharedFolder = false;
    this.showImageFolder = false;
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
    this.showAllFiles = true;
    this.showDocumentFolder = false;
    this.showDraftFolder = false;
    this.showTrashFolder = false;
    this.showDownloadsFolder = false;
    this.showFavoritesFolder = false;
    this.showSharedFolder = false;
    this.showImageFolder = false;
  }

  onSelectedTypesChange(types: string[]) {
    this.selectedTypes = types;
    this.updateFilteredFiles();
  }
  updateFilteredFiles() {
    this.filteredFiles = this.files.filter((file) => {
      return this.selectedTypes.includes(file.ext);
    });
    this.filteredFiles = this.filteredFiles.filter((file) => {
      return this.selectedFolders.includes(file.folderName[0]);
    });
  }
  onSelectedFoldersChange(folders: string[]) {
    this.selectedFolders = folders;
    this.updateFilteredFiles();
  }

  searchFile() {
    this.filteredFiles = this.files.filter((file) => {
      return file.name.toLowerCase().includes(this.searchQuery.toLowerCase());
    });
  }
}

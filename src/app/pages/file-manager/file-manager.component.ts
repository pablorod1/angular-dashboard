import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
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
  providers: [ConfirmationService, MessageService, DatePipe],
  animations: [
    trigger('detailsAnimation', [
      state(
        'inactive',
        style({
          transform: 'translateX(100%)', // 'translateX(-100%)',
          display: 'none',
          opacity: 0,
        })
      ),
      state(
        'active',
        style({
          transform: 'translateX(0)',
          opacity: 1,
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
  psdFiles!: FileManagerItem[];
  webFiles!: FileManagerItem[];
  otherFiles!: FileManagerItem[];
  filesMenu!: MenuItem[];
  folderMenu!: MenuItem[];
  createFolderMenu!: MenuItem[];
  selectedFile!: FileManagerItem | null;
  renamingFile!: FileManagerItem;
  oldName!: string;
  detailsActive: boolean = false;
  totalSize!: number;
  allFiles: boolean = true;
  showDocumentFolder: boolean = false;
  showDraftFolder: boolean = false;
  showTrashFolder: boolean = false;
  showDownloadsFolder: boolean = false;
  documentFolder!: FileManagerItem[];
  draftFolder!: FileManagerItem[];
  trashFolder!: FileManagerItem[];
  downloadsFolder!: FileManagerItem[];
  oldFolder!: string;
  createFolderDialog: boolean = false;
  newFolderName: string = '';
  selectedFolder!: FileManagerFolder | null;

  constructor(
    private fileManagerDataService: FileManagerDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.fileManagerDataService.autoAddFilesToFolders();
    this.folders = this.fileManagerDataService.getFolders();

    // Files
    this.files = this.fileManagerDataService.getFiles();
    this.psdFiles = this.fileManagerDataService.getPSDFiles();
    this.webFiles = this.fileManagerDataService.getWebFiles();
    this.otherFiles = this.fileManagerDataService.getOtherFiles();

    // Total Size
    this.totalSize = this.fileManagerDataService.getTotalSize();

    // Folders
    this.documentFolder = this.fileManagerDataService.getDocumentFolderFiles();
    this.draftFolder = this.fileManagerDataService.getDraftsFolderFiles();
    this.trashFolder = this.fileManagerDataService.getTrashFolderFiles();
    this.downloadsFolder = this.fileManagerDataService.getDownloadsFolderFiles();

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
            icon: 'bi bi-folder',
            command: () => {
              if (this.selectedFile)
                this.moveFile(this.selectedFile, 'Documents');
            },
          },
          {
            label: 'Drafts',
            icon: 'bi bi-folder',
            command: () => {
              if (this.selectedFile) this.moveFile(this.selectedFile, 'Drafts');
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
          if (this.selectedFile) this.deleteFile(this.selectedFile);
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
  }

  // Get the icon based on the file extension
  getFileIcon(ext: string) {
    switch (ext) {
      case 'psd':
        return 'bi-filetype-psd text-psd';
      case 'html':
        return 'bi-filetype-html text-html';
      case 'pdf':
        return 'bi-filetype-pdf text-danger';
      case 'css':
        return 'bi-filetype-css text-css';
      case 'js':
        return 'bi-filetype-js text-js';
      case 'ai':
        return 'bi-filetype-ai text-ai';
      case 'txt':
        return 'bi-file-earmark-text';
      default:
        return 'bi-file-earmark';
    }
  }

  // Get the type of file based on the file extension
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

  // Delete File from all folders
  deleteFile(file: FileManagerItem) {
    if (this.selectedFile) {
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete ' + file.name + '?',
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.psdFiles = this.psdFiles.filter(
            (file) => file !== this.selectedFile
          );
          this.webFiles = this.webFiles.filter(
            (file) => file !== this.selectedFile
          );
          this.otherFiles = this.otherFiles.filter(
            (file) => file !== this.selectedFile
          );
          this.documentFolder = this.documentFolder.filter(
            (file) => file !== this.selectedFile
          );
          this.draftFolder = this.draftFolder.filter(
            (file) => file !== this.selectedFile
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: file.name + ' deleted',
            life: 3000,
          });
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Canceled',
            detail: 'Operation Canceled',
            life: 3000,
          });
        },
      });
    }
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
  onFileSelected(fileEvent: any) {
    const file: File = fileEvent.target.files[0];

    if (file) {
      // Validate file size
      const maxFileSize = 10485760; // 10 MB
      if (file.size > maxFileSize) {
        this.messageService.add({
          severity: 'error',
          summary: 'File Upload Error',
          detail: 'Maximum file size allowed is 10MB',
          life: 3000,
        });
      } else {
        const newFile: FileManagerItem = {
          id: this.files.length + 1,
          name: file.name,
          type: this.getFileType(file.name.split('.').pop() || ''),
          ext: file.name.split('.').pop() || '',
          modifiedOn: this.formatDate(
            new Date(file.lastModified).toISOString()
          ),
          size: this.formatFileSize(file.size).toString(),
          folderName: '',
          file: file,
        };
        if (
          newFile.ext === 'psd' ||
          newFile.ext === 'ai' ||
          newFile.ext === 'pdf'
        ) {
          this.psdFiles.push(newFile);
        } else if (
          newFile.ext === 'html' ||
          newFile.ext === 'css' ||
          newFile.ext === 'js'
        ) {
          this.webFiles.push(newFile);
        } else {
          this.otherFiles.push(newFile);
        }
        this.messageService.add({
          severity: 'success',
          summary: 'File Uploaded',
          detail: file.name + ' uploaded successfully',
          life: 3000,
        });
        this.selectedFile = newFile;
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

  formatFileSize(size: number): string {
    const i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
    return (
      +(size / Math.pow(1024, i)).toFixed(2) +
      ' ' +
      ['B', 'KB', 'MB', 'GB', 'TB'][i]
    );
  }

  downloadFile(fileManagerItem: FileManagerItem) {
    // Retrieve the File object from the FileManagerItem object
    const file: File = fileManagerItem.file;

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
    this.oldFolder = file.folderName;
    file.folderName = folder;
    switch (folder) {
      case this.oldFolder:
        this.messageService.add({
          severity: 'info',
          summary: 'Canceled',
          detail: 'File already in ' + folder,
          life: 3000,
        });
        break;
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
          this.showDraftFolder = false;
          this.showTrashFolder = false;
          this.showDownloadsFolder = false;
          break;
        case 'Drafts':
          this.selectedFolder.name = 'Drafts';
          this.showDocumentFolder = false;
          this.showDraftFolder = true;
          this.showTrashFolder = false;
          this.showDownloadsFolder = false;
          break;
        case 'Trash':
          this.selectedFolder.name = 'Trash';
          this.showDocumentFolder = false;
          this.showDraftFolder = false;
          this.showTrashFolder = true;
          this.showDownloadsFolder = false;
          break;
        case 'Downloads':
          this.selectedFolder.name = 'Downloads';
          this.showDocumentFolder = false;
          this.showDraftFolder = false;
          this.showTrashFolder = false;
          this.showDownloadsFolder = true;
          break;
        default:
          break;
      }
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
        size: '0B',
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
}

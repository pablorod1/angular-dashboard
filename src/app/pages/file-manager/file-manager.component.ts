import { Component, OnInit } from '@angular/core';
import { FileManagerDataService, FileManagerItem } from '../../services/file-manager-data.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrl: './file-manager.component.css'
})
export class FileManagerComponent implements OnInit{
  folders!: FileManagerItem[];
  files!: FileManagerItem[];
  psdFiles!: FileManagerItem[];
  webFiles!: FileManagerItem[];

  constructor (private fileManagerDataService: FileManagerDataService) {  }

  ngOnInit() {
    this.folders = this.fileManagerDataService.getFolders();
    this.files = this.fileManagerDataService.getFiles();
    this.psdFiles = this.fileManagerDataService.getPSDFiles();
    this.webFiles = this.fileManagerDataService.getWebFiles();
  }

  getFileIcon( ext: string ) {
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
      default:
        return 'bi-file-earmark';
    }
  }
}

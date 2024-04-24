import { Component } from '@angular/core';

export interface Page {
  name: string;
  link: string;
}

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.css',
})
export class SearchbarComponent {
  visible: boolean = false;
  searchQuery: string = '';
  filteredPages: Page[] = [];
  listActive: boolean = false;


  showDialog() {
    this.visible = !this.visible;
    this.searchQuery = '';
    this.filterPages();
  }



  filterPages() {
    if (this.searchQuery === '') {
      this.filteredPages = [];
      this.listActive = false;
    } else {
      this.filteredPages = this.pages.filter(page =>
        page.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.listActive = true;
    }
  }

  onSearchChange() {
    this.filterPages();
  }

  pages: Page[] = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Analytics', link: '/analytics' },
    { name: 'Points of Interest', link: '/poi' },
    { name: 'Ecommerce', link: '/ecommerce' },
    { name: 'File Manager', link: '/file-manager' },
    { name: 'Mailbox', link: '/mailbox' },
    { name: 'Notes', link: '/notes' },
    { name: 'Scrumboard', link: '/scrumboard' },
    { name: 'Tasks', link: '/tasks' },
    { name: 'Help Center', link: '/help-home' },
    { name: 'FAQs', link: '/faqs' },
    { name: 'Guides', link: '/guides' },
    { name: 'Support', link: '/support' },
    { name: 'About Us', link: '/about' },
    { name: 'Landing', link: '/landing' },
    { name: 'Blog Posts', link: '/blog' },
    { name: 'Coming Soon', link: '/coming-soon' },
    { name: 'Profile', link: '/profile' },
    { name: 'Settings', link: '/acc-settings' },
    { name: 'Error 404', link: '/error-404' },
    { name: 'Error 500', link: '/error-500' },
    { name: 'Maintenance', link: '/maintenance' },
    { name: 'Pricing Classic', link: '/pricing-classic' },
    { name: 'Pricing Table', link: '/pricing-table' },
    { name: 'Invoice', link: '/invoice-classic' },
    { name: 'Invoices table', link: '/invoice-table' },
  ];
}

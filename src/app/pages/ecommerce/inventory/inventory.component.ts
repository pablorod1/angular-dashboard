import { Component, OnInit } from '@angular/core';
import { EcommerceService, Product } from '../../../services/ecommerce.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
  providers: [MessageService, ConfirmationService],
  animations: [
    trigger('filtersAnimation', [
      state(
        'inactive',
        style({
          height: 0,
          opacity: 0,
          display: 'none',
        })
      ),
      state(
        'active',
        style({
          transform: 'scaleY(100%)',
          opacity: 1,
          display: 'block',
        })
      ),
      transition('inactive => active', animate('800ms ease-in-out')),
      transition('active => inactive', animate('800ms ease-in-out')),
    ]),
  ],
})
export class InventoryComponent implements OnInit {
  products!: Product[];

  selectedProduct!: Product;
  newProduct!: Product;
  editingProduct!: Product;
  categories: string[] = ['Bedroom', 'Living Room', 'Kitchen', 'Workspace'];
  statuses: string[] = ['INSTOCK', 'LOWSTOCK', 'OUTOFSTOCK'];
  searchQuery: string = '';

  showFilters: boolean = false;

  selectedStatuses: string[] = [];
  selectedCategories: string[] = [];
  selectedRating: number = 0;
  selectedPrices: number[] = [0, 2000];

  showNewProductDialog: boolean = false;
  showEditProductDialog: boolean = false;

  constructor(
    private ecommerceService: EcommerceService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.products = this.ecommerceService.getProducts();
    this.newProduct = {
      id: 0,
      name: '',
      details: '',
      description: '',
      price: 0,
      imageUrl: '',
      rating: 0,
      category: '',
      favorite: false,
      status: '',
    };
    this.editingProduct = {
      id: 0,
      name: '',
      details: '',
      description: '',
      price: 0,
      imageUrl: '',
      rating: 0,
      category: '',
      favorite: false,
      status: '',
    };

  }

  getSeverity(status: string) {
    if (status === 'INSTOCK') {
      return 'bg-success text-success';
    } else if (status === 'LOWSTOCK') {
      return 'bg-warning text-warning';
    } else if (status === 'OUTOFSTOCK') {
      return 'bg-danger text-danger';
    } else {
      return 'bg-primary';
    }
  }

  formatCategory(category: string) {
    return category.replace(/-/g, ' ');
  }

  showProductDetails(product: Product) {
    this.selectedProduct = product;
  }

  onFileChange(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    const reader = new FileReader();
    reader.onload = () => {
      if (this.showNewProductDialog)
        this.newProduct.imageUrl = reader.result as string;
      else if (this.showEditProductDialog)
        this.editingProduct.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  createNewProduct() {
    this.showNewProductDialog = true;
    this.newProduct.id = this.products.length + 1;
  }

  cancelNewProduct() {
    this.showNewProductDialog = false;
    this.newProduct = {} as Product;
  }

  saveNewProduct() {
    this.ecommerceService.addProduct(this.newProduct);
    this.products = this.ecommerceService.getProducts();
    this.showNewProductDialog = false;
    this.newProduct = {} as Product;
  }

  showProducts(): Product[] {
    if (this.searchQuery !== '') return this.searchProduct(this.searchQuery);
    else if (this.selectedStatuses.length > 0){
      return this.searchProductByStatus(this.selectedStatuses);
    }
    else if (this.selectedCategories.length > 0) {
      return this.searchProductsByCategory(this.selectedCategories);
    } else if (this.selectedRating > 0) {
      return this.searchProductsByRating(this.selectedRating);
    } else if (this.selectedPrices[0] >= 0 && this.selectedPrices[1] <= 2000){
      return this.searchProductsByPriceRange(this.selectedPrices);
    } else {
      return this.products;
    }
  }

  searchProduct(searchQuery: string): Product[] {
    return this.products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  searchProductByStatus(statuses: string[]): Product[] {
    return this.products.filter((product) => statuses.includes(product.status));
  }
  searchProductsByCategory(categories: string[]): Product[] {
    return this.products.filter((product) =>
      categories.includes(product.category)
    );
  }
  searchProductsByRating(rating: number): Product[] {
    return this.products.filter((product) => product.rating === rating);
  }
  searchProductsByPriceRange(prices: number[]): Product[] {
    return this.products.filter(
      (product) => product.price >= prices[0] && product.price <= prices[1]
    );
  }

  // Guarda los status en selectedStatuses
  onStatusChange(event: Event, status: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedStatuses.push(status);
    } else {
      const index = this.selectedStatuses.indexOf(status);
      if (index > -1) {
        this.selectedStatuses.splice(index, 1);
      }
    }
  }

  // Guarda las categorias en selectedCategories
  onCategoryChange(event: Event, category: string) {
    if ((event.target as HTMLInputElement).checked) {
      this.selectedCategories.push(category.toLowerCase().replace(/\s+/g, '-'));
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index > -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'bi bi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          key: 'product',
          severity: 'error',
          summary: 'Operation completed',
          detail: product.name + ' Deleted',
          icon: product.imageUrl,
          life: 3000,
        });
        this.ecommerceService.deleteProduct(product);
        this.products = this.ecommerceService.getProducts();
      },
    });
  }

  editProduct(product: Product) {
    this.editingProduct = product;
    this.showEditProductDialog = true;
  }

  cancelEditProduct() {
    this.showEditProductDialog = false;
    this.editingProduct = {} as Product;
  }

  updateProduct() {
    // Save product on products array with its new changes
    this.products = this.products.map((product) =>
      product.id === this.editingProduct.id ? this.editingProduct : product
    );
    this.showEditProductDialog = false;
    this.editingProduct = {} as Product;
  }
}

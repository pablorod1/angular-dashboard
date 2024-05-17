import { Component, OnInit } from '@angular/core';
import { EcommerceService, Product } from '../../services/ecommerce.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.css',
  providers: [ConfirmationService, MessageService],

})
export class EcommerceComponent implements OnInit {
  products!: Product[];

  // Active Filter
  activeFilter = 'all';

  responsiveOptions: any[] | undefined;

  showDetailsDialog: boolean = false;
  selectedProduct!: Product;
  quantity: number = 1;

  favoriteProducts!: Product[];

  constructor(
    private ecommerceService: EcommerceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    //localStorage.clear();
    this.products = this.ecommerceService.getProducts();
    this.favoriteProducts = JSON.parse(
      localStorage.getItem('favoriteProducts') || '[]'
    );
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '425px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
    console.log(this.favoriteProducts)
  }

  showAllProducts() {
    this.products = this.ecommerceService.getProducts();
  }
  filterProductsByCategory(category: string) {
    this.products = this.ecommerceService
      .getProducts()
      .filter((product) => product.category === category);
    this.activeFilter = category;
  }

  selectProduct(product: Product) {
    this.selectedProduct = product;
    this.showDetailsDialog = true;
  }

  hideDetailsDialog() {
    this.showDetailsDialog = false;
    this.selectedProduct = {} as Product;
    this.quantity = 1;
  }
  addQuantity() {
    this.quantity += 1;
  }
  reduceQuantity() {
    this.quantity -= 1;
  }

  markProductAsFavorite(product: Product) {
    if (!product.favorite) {
      product.favorite = true;
      this.favoriteProducts.push(product);
      this.messageService.add({
        key: 'favorite',
        severity: 'success',
        summary: 'Favorite',
        detail: product.name + ' added to favorites',
        icon: 'bi bi-heart-fill',
      });
    } else {
      product.favorite = false;
      this.favoriteProducts = this.favoriteProducts.filter(
        (favoriteProduct) => favoriteProduct.id !== product.id
      );
      this.messageService.add({
        key: 'favorite',
        severity: 'warn',
        summary: 'Favorite',
        detail: 'Product removed from favorites',
        icon: 'bi bi-heartbreak-fill'
      });
    }
    localStorage.setItem(
      'favoriteProducts',
      JSON.stringify(this.favoriteProducts)
    );
  }

  addToCart(){
    this.messageService.add({
      key: 'cart',
      severity: 'success',
      summary: 'Cart',
      detail: 'Product added succesfully to cart',
      icon: 'bi bi-bag-plus',
    })
  }
}

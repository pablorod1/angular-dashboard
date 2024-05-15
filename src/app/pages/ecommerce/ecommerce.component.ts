import { Component, OnInit } from '@angular/core';
import { EcommerceService, Product } from '../../ecommerce.service';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrl: './ecommerce.component.css'
})
export class EcommerceComponent implements OnInit {
  products!: Product[];

  // Active Filter
  activeFilter = 'all';

  responsiveOptions: any[] | undefined;

  showDetailsDialog: boolean = false;
  selectedProduct!: Product;
  quantity: number = 1;


  constructor(
    private ecommerceService: EcommerceService
  ){ }

  ngOnInit() {
    this.products = this.ecommerceService.getProducts();
    this.responsiveOptions = [
      {
          breakpoint: '1024px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '768px',
          numVisible: 1,
          numScroll: 1
      },
  ];
  }

  showAllProducts(){
    this.products = this.ecommerceService.getProducts();
  }
  filterProductsByCategory(category: string){
    this.products = this.ecommerceService.getProducts().filter(product => product.category === category);
    this.activeFilter = category;
  }

  selectProduct(product: Product){
    this.selectedProduct = product;
    this.showDetailsDialog = true;
  }

  hideDetailsDialog(){
    this.showDetailsDialog = false;
    this.selectedProduct = {} as Product;
    this.quantity = 1;
  }
  addQuantity(){
    this.quantity += 1;
  }
  reduceQuantity(){
    this.quantity -= 1;
  }


}
